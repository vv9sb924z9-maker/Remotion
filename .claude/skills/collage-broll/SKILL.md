---
name: collage-broll
description: يحوّل جملة كلام قصيرة (~5 ثواني) إلى B-roll كولاج ورق بأسلوب الطباعة النقطية (halftone paper-collage) — الشاشة تبدأ فاضية والقطع تدخل وتركب وحدة وحدة، 9:16 بدون صوت، يتولّد عبر Runway. Use when the user says "كولاج B-roll"، "سوّ كولاج لهالجملة"، "B-roll ورق"، "بي رول كولاج"، "collage b-roll"، "gbro-collage-broll"، or wants a sentence turned into a paper-collage visual metaphor. Not for full edits of a talking video (use video-ad-editor) or motion graphics (use motion-video).
---

# Collage B-roll (Runway)

Adapted from [pyang5166/gbro-collage-broll](https://github.com/pyang5166/gbro-collage-broll) (MIT, commit `a1a4ee2`,
see `LICENSE`). The original ran on Codex `image_gen` + Gemini Omni Flash; this version uses the **Runway** MCP
tools for both the still and the video. Talk to the user in Arabic.

The result: a strong flat colour paper field, black-and-white halftone photo cut-outs plus a few coloured
cardstock accents, assembled piece by piece from an empty frame with stop-motion timing.
Default delivery: 9:16, 5 s, 720×1280, no audio, MP4 — to sit under the voiceover.

## Three gates (mandatory)

Generations cost Runway credits. Never skip a gate, and never generate before the user approves the gate before it.

1. **Gate 1 — metaphor (free).** Text only, no tool calls that generate anything.
2. **Gate 2 — still frame.** Generate the finished collage still(s); show them and stop.
3. **Gate 3 — video.** Animate from an empty colour field to the approved still; QA; deliver.

In a batch, only items the user approved move to the next gate; the rest are revised and re-shown.
Approval words: «تمام»، «موافق»، «كمّل»، «كلها تمام»، or per-item numbers.

## Before the first generation

Call `mcp__Runway__whoami` once: confirm the workspace has credits and a paid plan for video, and check
`availableImageModels` / `availableVideoModels` and `modelDeprecations`. If video needs a plan the user
lacks, say so at Gate 1 — before they spend time approving metaphors.

## Project folder

`out/collage-broll/YYYY-MM-DD-<slug>/` inside the repo (`out/` is git-ignored):

```text
<project>/
├── brief.md                 # the lines + approved metaphors
├── visual-spec.json
├── still-contact-sheet.jpg  # v2, v3… on regenerations; never overwrite
├── gate2-qa.md / gate3-qa.md
└── 01-<slug>/
    ├── frames/first-frame.png  last-frame.png  last-frame-original.png
    └── run-v01/final-5s.mp4  final-5s-noaudio.mp4  contact-sheet.jpg  end-frame-comparison.jpg
```

## Phase 1 — metaphor (Gate 1)

Compress the line into one visual proposition. Never put the script's words in the frame.
One line = one metaphor, **3–6 key objects** (more weakens the meaning and destabilises the assembly).
In a batch, let the metaphors form a small narrative.

For each line give:
- المعنى الأساسي: what the viewer must understand
- الإحساس: calm, surprise, urgency, insight, absurd, ironic
- الاستعارة البصرية في جملة
- العناصر (3–6): machines, clocks, film strips, filing cabinets, consoles, rulebooks, funnels, tracks, chess pieces…
- لون الخلفية ولون/ألوان التمييز
- ترتيب الدخول: structure → people or key cards → connectors → action → result

Colour by meaning, varied across a batch with one shared design language:
- burnt orange / red: time spent, labour, urgency
- mustard yellow: tools, warnings, lost experience
- deep green: cognition, taste, resetting a system
- deep purple: standards, accumulation, long-term memory
- teal: judgement, collaboration, automation

Then **stop** and wait.

## Phase 2 — still frame (Gate 2)

Write `visual-spec.json` (meaning, metaphor, background hex, accents, 3–6 elements with role/placement/motion,
final composition, avoid list). Then call `mcp__Runway__generate_image` with `ratio` 9:16 (use the ratio
string the chosen model accepts, e.g. `9:16` or `1080:1920`), `count` 2 if the user wants options. Prompt template:

```text
A finished premium editorial paper-collage image expressing [one-line visual proposition].
Backdrop: perfectly flat [colour] paper field [hex] with subtle uncoated paper fibre.
Medium: editorial stop-motion paper collage; black-and-white halftone photographic cut-outs mixed with
selective [accent] coloured cardstock.
Composition: vertical 9:16 locked poster frame; central subject within the middle 70 percent; generous clean
colour-field negative space; 3–6 large separable paper groups.
Materials: visible printed halftone dots, crisp machine-cut edges, thin warm-cream paper keylines, soft
low-opacity physical drop shadows.
Must read at a glance: [the relationship this metaphor depends on].
No typography, no readable letters, no numerals, no logos, no watermark, no UI, no subtitles, no glossy 3D,
no photoreal environment, no clutter.
```

When the task finishes (poll `mcp__Runway__get_task` 60–120 s apart if no viewer rendered), download the
image with curl to `frames/last-frame-original.png`. **Keep the task ID** — Gate 3 uses it.

QA each still: metaphor obvious at a glance; subject focused; no fake letters, logos, watermark or UI;
enough clean colour field; 3–6 clear groups, not confetti; one shared look across the batch. Build a numbered
contact sheet, e.g.

```bash
ffmpeg -y -i 01-*/frames/last-frame-original.png -i 02-*/frames/last-frame-original.png \
  -filter_complex "[0]scale=360:640[a];[1]scale=360:640[b];[a][b]hstack=inputs=2" still-contact-sheet.jpg
```

Show it (Read it, send with SendUserFile), write `gate2-qa.md`, and **stop**. Fix fake text by regenerating
the still, never by patching it in the video prompt.

## Phase 3 — video (Gate 3)

### 1. Frames

```bash
ffmpeg -y -i frames/last-frame-original.png \
  -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" frames/last-frame.png
ffmpeg -y -f lavfi -i color=c=0x<HEX>:s=1080x1920 -frames:v 1 frames/first-frame.png
```

Sample `<HEX>` from the still's background (e.g. `ffmpeg -i frames/last-frame.png -vf "crop=20:20:10:10,scale=1:1" -f rawvideo -pix_fmt rgb24 - | xxd -p`)
so the empty field matches exactly. Only keep a base object in the first frame if the user asks.

Upload both PNGs to Runway: `wc -c` + `file --mime-type -b` → `mcp__Runway__init_upload` → run the returned curl
PUT, capture the ETag → `mcp__Runway__complete_upload` with `parts`. Copy the returned asset URLs verbatim.

### 2. Generate

`mcp__Runway__generate_video` with `startFrame.url` = empty first frame, `endFrame.url` = uploaded last frame,
`duration` 5, `ratio` 9:16 in the model's format, `resolution` `720p`, `generateAudio` false.
Model: one that supports start + end frames (default `seedance-2`; `kling-o3-pro`, `veo-3.1` also do).
If the user names another model, use it. Prompt template:

```text
Paper-collage stop-motion assembly. The start frame is the exact empty first frame; the end frame is the exact
completed last frame. One continuous locked-off vertical shot, opening on the empty flat [colour] paper field.
Assemble the scene piece by piece with crisp physical stop-motion timing: [3–6 elements in order: what slides
in from where, snaps into place, connects, and the final action]. End by holding the supplied completed
composition.
Preserve the exact 9:16 framing, [hex] colour field, coloured cardstock accents, paper grain, halftone dots,
cream keylines, crisp cut edges and soft shadows. Restrained tactile 2D paper craft only.
No scene cuts, no camera movement, no zoom, no morphing, no new objects, no text, no letters, no numbers, no
logos, no watermark, no UI, no sound.
```

Run a batch's items as separate calls; never re-call a generation to "retry" a running task — poll it.
Download the result to `run-v01/final-5s.mp4`, then strip audio regardless:

```bash
ffmpeg -y -i run-v01/final-5s.mp4 -map 0:v:0 -c:v copy -an run-v01/final-5s-noaudio.mp4
```

### 3. Video QA

```bash
ffmpeg -y -i run-v01/final-5s-noaudio.mp4 -vf "fps=1,scale=270:480,tile=5x1" -frames:v 1 run-v01/contact-sheet.jpg
ffmpeg -y -sseof -0.1 -i run-v01/final-5s-noaudio.mp4 -frames:v 1 -update 1 /tmp/last.png && \
  ffmpeg -y -i frames/last-frame.png -i /tmp/last.png -filter_complex "[0]scale=360:640[a];[1]scale=360:640[b];[a][b]hstack" run-v01/end-frame-comparison.jpg
ffprobe -v error -show_entries stream=codec_type,width,height,r_frame_rate:format=duration -of compact run-v01/final-5s-noaudio.mp4
```

Pass when:
- the first frame is (near) empty colour field — a paper edge peeking in early is acceptable
- the middle shows pieces entering one by one, not a global fade or slow zoom
- no cuts, zoom, 3D-ification or photoreal drift; no fake text, logos, watermark, UI
- the last frame matches the approved still; small pose or detail drift that keeps the meaning is a pass, don't re-run
- 9:16, ~5 s, no audio stream

Common fixes: weak assembly → fewer elements and explicit "slides in / snaps into place" order; end-frame drift →
strengthen "end by holding the supplied completed composition"; one failed item → re-run only that item (`run-v02`).
Write the verdicts (including passes with flaws and why) to `gate3-qa.md`.

## Delivery

Send each `final-5s-noaudio.mp4` and its contact sheet with SendUserFile, plus the end-frame comparison, and one
Arabic sentence per line explaining how it became that metaphor.

To use the clips in a Remotion video, copy them into `public/` and place them with `<OffthreadVideo>` under the
talking-head footage or captions.

## When not to use

- Precise layer control, occlusion or an editable timeline → build it in Remotion instead.
- The user only wants a prompt, not a clip → just write the prompt.
- Real people, product ads or a presenter → not this collage flow.
- Transparent per-layer assets → this flow doesn't split layers.
