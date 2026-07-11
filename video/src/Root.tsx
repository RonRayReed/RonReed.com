import "./index.css";
import { Composition } from "remotion";
import { ArticleVideo } from "./ArticleVideo";
import { scenes, fps, totalDurationInFrames } from "./data/world-bank-ukraine";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WorldBankUkraine"
        component={ArticleVideo}
        durationInFrames={totalDurationInFrames}
        fps={fps}
        width={1080}
        height={1920}
        defaultProps={{ scenes }}
      />
    </>
  );
};
