import { AbsoluteFill, interpolate, spring, useCurrentFrame } from "remotion";
import type { Scene } from "../data/world-bank-ukraine";

const FADE_FRAMES = 12;

const accentByKind: Record<Scene["kind"], string> = {
  hook: "#4ea8ff",
  point: "#4ea8ff",
  outro: "#7effa0",
};

export const TextScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const translateY = interpolate(enter, [0, 1], [30, 0]);

  const opacity = interpolate(
    frame,
    [
      0,
      FADE_FRAMES,
      scene.durationInFrames - FADE_FRAMES,
      scene.durationInFrames,
    ],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const isHook = scene.kind === "hook";
  const accent = accentByKind[scene.kind];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0b0b0f",
        justifyContent: "center",
        alignItems: "center",
        padding: 96,
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          textAlign: "center",
          maxWidth: 880,
        }}
      >
        <div
          style={{
            width: 64,
            height: 6,
            borderRadius: 3,
            backgroundColor: accent,
            margin: "0 auto 40px",
          }}
        />
        <h1
          style={{
            fontFamily: "sans-serif",
            fontSize: isHook ? 84 : 68,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          {scene.headline}
        </h1>
        {scene.subtext && (
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: 38,
              color: "#a0a0b0",
              marginTop: 28,
              lineHeight: 1.4,
            }}
          >
            {scene.subtext}
          </p>
        )}
      </div>
    </AbsoluteFill>
  );
};
