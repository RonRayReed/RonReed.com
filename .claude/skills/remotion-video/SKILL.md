---
name: remotion-video
description: Use this skill when turning a written article, blog post, or resume/portfolio content into a video — or any other request to create, edit, or render a video with Remotion (React-based video framework). Trigger on phrases like "make a video from this article," "turn this post into a video," "create a Remotion video," "add a scene/animation to the video," or "render the video." Covers scaffolding a Remotion project in this repo, converting article text into a timed scene script, building the React compositions, and rendering the final mp4.
---

# Remotion Video Skill

Turns written content (articles, blog posts, resume highlights) into short narrated/animated videos using [Remotion](https://www.remotion.dev) — video compositions written as React components, rendered to mp4.

## Quick Reference

| Task | Guide |
|------|-------|
| First time in this repo — no video project yet | [Setup](#setup-first-run-only) below |
| Convert an article into a scene-by-scene script | [reference/article-to-script.md](reference/article-to-script.md) |
| Write/edit the actual Remotion components | [reference/remotion-patterns.md](reference/remotion-patterns.md) |
| Preview while working | `npm run dev --workspace=video` → opens Remotion Studio |
| Render final video | `npm run render --workspace=video -- <CompositionId> out/<name>.mp4` |

## Setup (first run only)

Check for a `video/` workspace before doing this — if it already exists, skip straight to the workflow below.

```bash
npx --yes create-video@latest video --template=blank-typescript
```

Then wire it into the repo's npm workspaces (this repo is a workspace monorepo — see root `package.json`):

1. Add `"video"` to the `workspaces` array in the root `package.json`.
2. In `video/package.json`, rename the scripts to be workspace-friendly if needed (`dev`, `render`, `upgrade` are the defaults Remotion scaffolds — keep them).
3. `npm install` at the repo root to link the new workspace.
4. Add `video/out/` and `video/.remotion/` to `.gitignore` (rendered mp4s and cache — don't commit large binaries).

Project layout Remotion expects:

```
video/
├── src/
│   ├── Root.tsx          # registers every <Composition>
│   ├── scenes/           # one component per scene/beat
│   └── data/             # per-video scene scripts (JSON/TS), see article-to-script.md
├── public/                # audio, images, fonts referenced by compositions
└── out/                   # rendered output (gitignored)
```

## Workflow: article → video

1. **Get the article.** Read it from wherever the user points (a markdown file, a Strapi entry via `backend/`, pasted text, or a URL they give you).
2. **Convert to a scene script.** Follow [reference/article-to-script.md](reference/article-to-script.md) to break the article into timed scenes (hook, one scene per section, outro/CTA), each with on-screen text, duration in frames, and a voiceover line. Save it as `video/src/data/<slug>.ts`.
3. **Build/reuse scene components.** Follow [reference/remotion-patterns.md](reference/remotion-patterns.md) for the actual React/Remotion code — `Sequence` timing, text-in animations, captions, audio sync, transitions.
4. **Register the composition** in `video/src/Root.tsx` with a duration computed from the scene script (don't hardcode frame counts twice).
5. **Preview** with Remotion Studio and scrub through every scene before rendering.
6. **Render** to `video/out/<slug>.mp4` and confirm the file plays (check duration/size — a near-zero-byte file usually means a render error was swallowed).

## Ground rules

- Default to **1080x1920 (vertical, 30fps)** for social/short-form unless the user says otherwise — that's almost always the target for "turn my article into a video."
- Don't invent a narration voice track with fake TTS calls. If the user wants voiceover, ask whether they'll supply an audio file, want you to generate one via a TTS service they have API access to, or want captions-only (text-driven, no audio) — silent/captions-only is a fine default when unspecified.
- Keep each scene's on-screen text short (one idea per screen, ~5-8 words for headlines) — this is a video, not the article restated verbatim.
- Never commit rendered video files or large media assets to git unless the user explicitly asks; keep `video/out/` gitignored.
