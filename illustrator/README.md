# Prompt Illustrator

A zero-dependency web tool that turns a short prompt into minimal, subtly
animated vector illustrations — the dashed-connector / hub-and-satellite
style used on marketing feature grids (small filled squares, outline
circles, ringed hub dots, dashed orbits, thin 1.6px strokes, black on
white).

Open `index.html` in any browser. No build step, no network access needed.

## How it works

```
prompt ──► keyword router ──► archetype ──► seeded layout ──► scene graph
                                                          ├──► animated SVG (live preview + export)
                                                          └──► Lottie JSON export
```

1. **Keyword routing.** The prompt is scored against a keyword table and
   mapped to one of seven layout archetypes. Unrecognized prompts get a
   deterministic archetype derived from the prompt hash. A dropdown can
   force a specific archetype.

   | Archetype | Feel | Example triggers |
   |-----------|------|------------------|
   | `flow` | horizontal dashed rows with ringed hubs | conversation, stream, real-time |
   | `converge` | satellites fanning into a large hub | reach, audience, followers |
   | `burst` | boxed core radiating dashed + solid rays | launch, moment, broadcast |
   | `orbit` | diamond core inside overlapping dashed orbits | attention, engage, earn |
   | `target` | concentric rings, spokes to diamonds | target, precise, keyword |
   | `cascade` | dashed lattice dropping into an intake box | business, scale, funnel |
   | `network` | loose lattice of mixed marks | network, ecosystem, platform |

2. **Seeded randomness.** Layouts are generated with a `mulberry32` RNG
   seeded from `prompt + seed`, so every illustration is reproducible.
   The grid shows six seeds per prompt; **Shuffle** advances the seed
   window, and `↻` rerolls one card.

3. **Scene graph.** Each archetype emits a flat list of primitives
   (`line`, `ring`, `path`, `circle`, `square`, `dot`) with optional
   animation tags. Outline shapes carry a background fill so they mask
   the connector lines that run beneath them, like the reference art.

4. **Animation** (deliberately quiet, 6s loop):
   - `march` — dashed strokes drift by exactly two dash periods, so the
     loop is seamless
   - `pulse` — hub cores breathe to 122% and back
   - `floaty` — satellites drift ±3.5px vertically on offset delays
   - `blink` — small ray dots fade in and out
   - staggered fade-in on generate; all motion is disabled under
     `prefers-reduced-motion`

## Exports

- **SVG** — standalone file with the animation embedded as CSS, renders
  animated in any browser and static in vector editors.
- **Copy** — same markup to the clipboard for inline embedding. Uses
  `currentColor`, so it inherits text color; set `--illo-bg` if it sits
  on a non-white surface.
- **Lottie** — minimal shape-layer JSON (v5.9.0 schema, 30 fps / 180
  frames) with the same dash-march, pulse, float, and fade-in keyframes.
  Verified against `lottie-web`; usable in After Effects–free pipelines,
  apps, and LottieFiles.

## Extending

Everything lives in `index.html`:

- Add an archetype: write a generator in `ARCHETYPES` returning
  primitives on the 400×400 canvas, then add routing words to
  `KEYWORDS`.
- Tune the look via `STROKE`, `DASH`, and the CSS in `BASE_CSS` /
  `ANIM_CSS` (SVG) and the constants at the top of the Lottie section.
- `window.Illustrator` exposes `buildScene`, `sceneToSvg`, and
  `sceneToLottie` for scripting or embedding.
