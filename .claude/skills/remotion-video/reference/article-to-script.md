# Article → Scene Script

Goal: turn prose into a timed list of scenes Remotion can render. Do this *before* touching any React code.

## 1. Read the whole article first

Identify: the core takeaway (one sentence), the 3-6 supporting points/sections, and any concrete numbers, quotes, or examples worth putting on screen verbatim.

## 2. Break it into beats

A beat = one scene = one idea. Typical structure for an article-to-video:

1. **Hook** (1.5-3s) — the title or the single most striking claim from the article. No logo intro, no throat-clearing.
2. **One scene per major section/heading** (3-6s each) — compress each section to a short headline + optionally one supporting stat or quote. Don't try to fit every sentence; pick the line that carries the section.
3. **Outro/CTA** (2-3s) — author name, "read the full article at ronreed.com", or whatever the user wants as a close.

Rule of thumb: a video adaptation of a ~800-word article should land at 30-60 seconds, not read the whole thing.

## 3. Time each beat

- Narration pace: ~2.5 words/second spoken (150 wpm) if there's a voiceover.
- Captions-only (no audio): let the reader's eye pace it — roughly 3 words/second is comfortable minimum on-screen time, but never less than ~1.2s per scene even for a single short word.
- Convert seconds to frames using the project fps (30fps default): `frames = Math.round(seconds * fps)`.

## 4. Write it as a typed data file

Keep the script as data, separate from the components that render it — this lets you edit wording without touching animation code, and lets the same scene component render different articles.

```ts
// video/src/data/my-article-slug.ts
export interface Scene {
  id: string;
  kind: "hook" | "point" | "outro";
  headline: string;
  subtext?: string;
  durationInFrames: number;
  audioFile?: string; // path under public/, if voiceover exists
}

export const scenes: Scene[] = [
  {
    id: "hook",
    kind: "hook",
    headline: "Why most portfolios get ignored",
    durationInFrames: 90, // 3s @ 30fps
  },
  {
    id: "point-1",
    kind: "point",
    headline: "Recruiters skim for 6 seconds",
    subtext: "Lead with outcomes, not job titles",
    durationInFrames: 150,
  },
  // ...
  {
    id: "outro",
    kind: "outro",
    headline: "Read the full article",
    subtext: "ronreed.com",
    durationInFrames: 90,
  },
];

export const fps = 30;
export const totalDurationInFrames = scenes.reduce(
  (sum, s) => sum + s.durationInFrames,
  0
);
```

`totalDurationInFrames` and `fps` get imported directly into `Root.tsx` so the `<Composition>` duration is always derived from the script, never hand-typed twice.

## 5. Confirm scope with the user before building

If the article is long or the user hasn't said how long the video should be, ask (don't guess) about: target length (e.g. 30s vertical short vs. 2min explainer), voiceover or captions-only, and whether they have brand colors/fonts/logo to match their site.
