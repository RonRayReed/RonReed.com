import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import type { Scene } from "./data/world-bank-ukraine";
import { TextScene } from "./scenes/TextScene";

export const ArticleVideo: React.FC<{ scenes: Scene[] }> = ({ scenes }) => {
  let startFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0b0f" }}>
      <Audio src={staticFile("audio/business-intel-ambient.wav")} />
      {scenes.map((scene) => {
        const from = startFrame;
        startFrame += scene.durationInFrames;
        return (
          <Sequence
            key={scene.id}
            from={from}
            durationInFrames={scene.durationInFrames}
          >
            <TextScene scene={scene} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
