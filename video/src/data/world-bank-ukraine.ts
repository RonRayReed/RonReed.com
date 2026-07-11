export interface Scene {
  id: string;
  kind: "hook" | "point" | "outro";
  headline: string;
  subtext?: string;
  durationInFrames: number;
}

export const fps = 30;

export const scenes: Scene[] = [
  {
    id: "hook",
    kind: "hook",
    headline: "World Bank Sends Ukraine $1.64B",
    subtext: "Third tranche, Rapid Recovery Program",
    durationInFrames: 90,
  },
  {
    id: "conditions",
    kind: "point",
    headline: "14 Reform Conditions Met",
    subtext: "Procurement transparency, anti-corruption, judicial reform",
    durationInFrames: 150,
  },
  {
    id: "kyiv-corridor",
    kind: "point",
    headline: "Kyiv Corridor: First Priority",
    subtext: "$740M for roads, rail, and utilities",
    durationInFrames: 150,
  },
  {
    id: "budget-support",
    kind: "point",
    headline: "$900M for National Budget Support",
    subtext: "Energy and healthcare systems",
    durationInFrames: 120,
  },
  {
    id: "private-capital",
    kind: "point",
    headline: "Private Capital Follows",
    subtext: "MIGA backs $1.2B; Strabag, Porr, Hochtief interested",
    durationInFrames: 150,
  },
  {
    id: "program-total",
    kind: "point",
    headline: "$4.5B Program, One Tranche Left",
    subtext: "Final ~$960M expected late 2026",
    durationInFrames: 150,
  },
  {
    id: "outro",
    kind: "outro",
    headline: "Reed Intelligence Group",
    subtext: "World Bank & Ukraine reconstruction coverage",
    durationInFrames: 90,
  },
];

export const totalDurationInFrames = scenes.reduce(
  (sum, s) => sum + s.durationInFrames,
  0,
);
