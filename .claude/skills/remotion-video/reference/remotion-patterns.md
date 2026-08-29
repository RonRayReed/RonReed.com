# Remotion Code Patterns

Assumes a scene script already exists (see [article-to-script.md](article-to-script.md)). This covers wiring it up as an actual Remotion project.

## Root.tsx — register the composition from the script

```tsx
// video/src/Root.tsx
import { Composition } from "remotion";
import { ArticleVideo } from "./ArticleVideo";
import { scenes, fps, totalDurationInFrames } from "./data/my-article-slug";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MyArticleSlug"
      component={ArticleVideo}
      durationInFrames={totalDurationInFrames}
      fps={fps}
      width={1080}
      height={1920}
      defaultProps={{ scenes }}
    />
  );
};
```

## Top-level composition — sequence the scenes

Use `Sequence` (not manual frame math scattered everywhere) so each scene's internal animations start at frame 0 locally.

```tsx
// video/src/ArticleVideo.tsx
import { AbsoluteFill, Sequence } from "remotion";
import type { Scene } from "./data/my-article-slug";
import { HookScene } from "./scenes/HookScene";
import { PointScene } from "./scenes/PointScene";
import { OutroScene } from "./scenes/OutroScene";

const sceneComponent = { hook: HookScene, point: PointScene, outro: OutroScene };

export const ArticleVideo: React.FC<{ scenes: Scene[] }> = ({ scenes }) => {
  let startFrame = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0b0f" }}>
      {scenes.map((scene) => {
        const from = startFrame;
        startFrame += scene.durationInFrames;
        const Component = sceneComponent[scene.kind];
        return (
          <Sequence key={scene.id} from={from} durationInFrames={scene.durationInFrames}>
            <Component scene={scene} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
```

## Individual scene — animate with useCurrentFrame + spring

Every scene component reads `useCurrentFrame()`, which is relative to its own `Sequence` (starts at 0 regardless of where it sits in the timeline).

```tsx
// video/src/scenes/PointScene.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import type { Scene } from "../data/my-article-slug";

export const PointScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const translateY = interpolate(enter, [0, 1], [40, 0]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div style={{ opacity, transform: `translateY(${translateY}px)`, textAlign: "center" }}>
        <h1 style={{ fontSize: 72, color: "white", fontWeight: 800 }}>{scene.headline}</h1>
        {scene.subtext && (
          <p style={{ fontSize: 36, color: "#a0a0b0", marginTop: 16 }}>{scene.subtext}</p>
        )}
      </div>
    </AbsoluteFill>
  );
};
```

Fade scenes out near their own end using `scene.durationInFrames` and `useVideoConfig()` inside the same component — interpolate opacity down over the last ~10 frames so cuts aren't jarring.

## Voiceover audio (only if the user supplied/wants a voice track)

Drop audio files in `video/public/audio/` and reference by scene:

```tsx
import { Audio, staticFile } from "remotion";

{scene.audioFile && <Audio src={staticFile(scene.audioFile)} />}
```

Remotion does not generate speech itself — TTS has to come from an external source (a file the user provides, or a TTS API they have credentials for). Never fabricate an audio file path that doesn't exist in `public/`.

## Captions-only mode (no audio)

If there's no voiceover, lean on the text animations above and give each scene enough `durationInFrames` to be read comfortably (see pacing rule in article-to-script.md). Optionally add a subtle background — a gradient, a blurred image, or `@remotion/noise` — so scenes aren't flat black/white for 30+ seconds.

## Transitions between scenes (optional polish)

For crossfades/slides between scenes instead of hard cuts, use `@remotion/transitions`:

```bash
npm install @remotion/transitions --workspace=video
```

```tsx
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={90}><HookScene scene={scenes[0]} /></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
  <TransitionSeries.Sequence durationInFrames={150}><PointScene scene={scenes[1]} /></TransitionSeries.Sequence>
</TransitionSeries>
```

Only reach for this once the hard-cut version already works — don't add it speculatively.

## Preview

```bash
npm run dev --workspace=video
```

Opens Remotion Studio; scrub the timeline, check every scene, not just the first frame.

## Render

```bash
npx remotion render video/src/index.ts MyArticleSlug video/out/my-article-slug.mp4
```

(or via the workspace script if `video/package.json` defines one: `npm run render --workspace=video -- MyArticleSlug out/my-article-slug.mp4`)

After rendering, verify the output isn't a near-empty file (`ls -la video/out/`) — a silently failed render still sometimes writes a tiny/corrupt mp4.
