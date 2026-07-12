export interface Scene {
  id: string;
  kind: "hook" | "point" | "outro";
  headline: string;
  /** Also doubles as the on-screen caption/narration line. */
  subtext?: string;
  /** Prominent call-to-action shown only on the outro (e.g. a URL). */
  cta?: string;
  durationInFrames: number;
}

export const fps = 30;

export const scenes: Scene[] = [
  {
    id: "hook",
    kind: "hook",
    headline: "World Bank Sends Ukraine $1.64B",
    subtext: "The World Bank just wired Ukraine $1.64 billion.",
    durationInFrames: 96,
  },
  {
    id: "conditions",
    kind: "point",
    headline: "14 Reform Conditions Met",
    subtext: "Kyiv met all 14 anti-corruption and transparency conditions to unlock it.",
    durationInFrames: 132,
  },
  {
    id: "kyiv-corridor",
    kind: "point",
    headline: "Kyiv Corridor: First Priority",
    subtext: "$740 million goes straight into Kyiv's roads, rail, and utilities.",
    durationInFrames: 120,
  },
  {
    id: "budget-support",
    kind: "point",
    headline: "$900M for National Budget Support",
    subtext: "Another $900 million backs energy and healthcare nationwide.",
    durationInFrames: 96,
  },
  {
    id: "private-capital",
    kind: "point",
    headline: "Private Capital Follows",
    subtext: "That's pulling in private capital — MIGA-backed insurance and major European builders.",
    durationInFrames: 132,
  },
  {
    id: "program-total",
    kind: "point",
    headline: "$4.5B Program, One Tranche Left",
    subtext: "One tranche remains: nearly a billion dollars, expected by late 2026.",
    durationInFrames: 132,
  },
  {
    id: "outro",
    kind: "outro",
    headline: "Business Intel Group",
    cta: "www.BusinessIntel.Group",
    durationInFrames: 150,
  },
];

export const totalDurationInFrames = scenes.reduce(
  (sum, s) => sum + s.durationInFrames,
  0,
);
