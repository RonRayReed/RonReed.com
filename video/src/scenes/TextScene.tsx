import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { Scene } from "../data/world-bank-ukraine";
import { BiLogo } from "./BiLogo";

const FADE_FRAMES = 12;

// Business Intel Group brand palette (Business_Intel_Group_Style_Guide),
// used for the outro/splash scene only.
const BIG = {
  mainLogoBlue: "#00338D",
  intelDarkBlue: "#51626F",
  webLightBlue: "#DAE3EA",
  neutralGray: "#E0E1DD",
  fontFamily: '"Segoe UI", Helvetica, Arial, sans-serif',
};

const accentByKind: Record<Scene["kind"], string> = {
  hook: "#4ea8ff",
  point: "#4ea8ff",
  outro: "#ffffff",
};

export const TextScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Scale typography off the shorter axis so the same scene reads
  // consistently whether the composition is vertical or 16:9.
  const unit = Math.min(width, height);

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
  const isOutro = scene.kind === "outro";
  const accent = accentByKind[scene.kind];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: isOutro ? "#000000" : "#0b0b0f",
        justifyContent: "center",
        alignItems: "center",
        padding: unit * 0.09,
      }}
    >
      {isOutro && <BiLogo unit={unit} variant="light" />}
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          textAlign: "center",
          maxWidth: width * 0.82,
        }}
      >
        <div
          style={{
            width: unit * 0.06,
            height: unit * 0.006,
            borderRadius: unit * 0.003,
            backgroundColor: accent,
            margin: `0 auto ${unit * 0.037}px`,
          }}
        />
        <h1
          style={{
            fontFamily: isOutro ? BIG.fontFamily : "sans-serif",
            fontSize: isHook ? unit * 0.08 : unit * 0.065,
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
              fontFamily: isOutro ? BIG.fontFamily : "sans-serif",
              fontSize: unit * 0.035,
              color: isOutro ? BIG.intelDarkBlue : "#a0a0b0",
              marginTop: unit * 0.026,
              lineHeight: 1.4,
            }}
          >
            {scene.subtext}
          </p>
        )}
        {isOutro && scene.cta && (
          <div
            style={{
              display: "inline-block",
              marginTop: unit * 0.045,
              padding: `${unit * 0.018}px ${unit * 0.036}px`,
              border: `2px solid ${accent}`,
              borderRadius: unit * 0.01,
              fontFamily: BIG.fontFamily,
              fontSize: unit * 0.04,
              fontWeight: 700,
              color: accent,
              letterSpacing: 0.5,
            }}
          >
            {scene.cta}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
