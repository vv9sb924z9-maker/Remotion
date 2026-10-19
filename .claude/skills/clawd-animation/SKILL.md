---
name: clawd-animation
description: أنيميشن كرتون مرسوم بالفرشاة لشخصية Clawd (أو أي شخصية جديدة) باستخدام p5.js + p5.brush — من مرجع ClaudeAnimationBase. Use when the user says "استخدم مهارة Clawd"، "أنيميشن Clawd"، "فيديو مرسوم بالفرشاة"، "ClaudeAnimationBase"، "animate Clawd", or asks for a hand-painted cartoon short. Not for Remotion/React videos or talking-head edits.
---

# Clawd animation (ClaudeAnimationBase)

A vendored copy of [JohnHeibel/ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase)
(MIT, commit `0ac8bf2`) lives in `kit/` next to this file. It is a p5.js + p5.brush engine, separate from
the Remotion project in this repo: it renders `studio.html` in headless Chromium and encodes with ffmpeg.

## Workflow

1. **Copy the kit to a working folder** (never edit `kit/` itself, it's the clean template):
   ```bash
   cp -r .claude/skills/clawd-animation/kit clawd && cd clawd && npm install
   ```
   Use another folder name if the user wants several videos side by side. `out/` is git-ignored.
2. **Read `ANIMATION_GUIDE.md` in full** and look at `docs/emotions.jpg` and `docs/views.jpg` before drawing.
   It holds the rules (handmade, alive, one piece, no text, transitions always), the workflow and the full API.
   The user decides *what* the video is about; the guide decides *how*. If the user asks for something the
   guide forbids (e.g. Arabic captions), do what the user asks.
3. **Storyboard first**, then write the scene in `src/scenes/` (see `src/scenes/demo.js`) and set length/tempo
   in `src/config.js`. The canvas is 1920×1080 (`W, H` in `src/core.js`, plus the `<canvas>` size and
   `aspect-ratio` in `studio.html`); for vertical 9:16 change all three to 1080×1920 and recompose the shots.
4. **Check your own work** with contact sheets and frame strips (`--sheet`, `--strip`, `--crop`), reading the
   images with the Read tool, before rendering the full video.
5. **Render** and deliver `out/video.mp4` (send it with SendUserFile).

## Rendering in this cloud environment

There is no GPU here, so always pass these two flags to `render.mjs`:

```bash
FLAGS="--soft-gl --chrome=/opt/pw-browsers/chromium"
node render.mjs $FLAGS --sheet=1,4,8 --cols=3 --w=480 --out=out/check/a.jpg   # quick check
node render.mjs $FLAGS --frames --workers=4                                    # all frames, parallel, resumable
node render.mjs --encode --out=out/video.mp4 [--audio=assets/song.mp3]         # frames → MP4
```

Measured here: the demo takes **~45 s per frame** with watercolour `fill` shapes in software GL (4 CPUs).
An 11 s video at 24 fps is ~264 frames, i.e. hours. So:
- Prefer `--frames --workers=4` over `--clip` (parallel and resumable), and run it with `run_in_background`.
- Unless the user wants the watercolour look regardless of time, replace large watercolour fills
  (skies, hills) with flat `wash` shapes or pre-rendered backgrounds, as the kit's README recommends for
  machines without a GPU. Tell the user about the trade-off.
- Keep previews to a few frames until the storyboard is approved.

## Combining with Remotion

If the user wants Clawd inside a Remotion video (e.g. with Arabic captions or the vertical 1080x1920
compositions in `src/`), render the Clawd clip first, copy the MP4 into `public/`, and place it with
`<OffthreadVideo>` from Remotion.
