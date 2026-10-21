---
name: realto-portrait-animation
description: Add the ReAlto "head turn and blink" portrait animation to an image on the ReAlto Partners website (realto-partners/). Use whenever a photo or poster of Dan or Allison Gomer is added or changed and should come alive on hover (desktop) or scroll into view (mobile), or when asked to animate a portrait, banner or video poster on this site.
---

# ReAlto portrait animation (hover / scroll head turn)

The house style for people on the ReAlto site: a still image that, on hover (desktop) or when it
scrolls into view (touch), plays one short, natural moment, then returns to the still. It is an
animated WebP, never a video player. Reference: the "Latest episodes" banner
(`images/latest-episodes.jpg` + `images/latest-episodes-turn.webp`).

## The look we want
- Dan: a quick playful wink, then a small, warm turn of the head toward the camera, then back.
- Allison: leans slightly toward the camera, tilts her head to one side, smiles, then eases back.
- When Dan and Allison appear together (side by side or in two halves of one graphic), they turn
  toward each other: he looks at her, she looks at him. Alone, each turns toward the camera.
- No excessive blinking: Dan gets one wink and otherwise keeps his eyes open; Allison does not
  blink. Say this in every prompt ("Only one wink, no other blinking" / "No blinking, eyes stay open").
- Natural and gentle, clearly visible. Camera locked. Background, clothing and the green-tinted
  black and white grade unchanged.
- Starts and ends on the exact still, so the loop and the still/animation swap are invisible.

## Steps

1. **Start from the final still.** Finish the poster or portrait first (same green grade as the
   rest of the site). Save a full-quality PNG/JPG of exactly what will be on the page.
2. **Kling image to video** (Kling MCP: `who_am_i`, `file_upload`, `image_to_video`, `query_tasks`).
   - Model `kling-video-v4_0` (handles wide frames up to 5:2). 5 seconds, 1080p, 1 result.
     Cost is about 75 credits per run: check `query_membership_and_credits` first and tell the
     user the cost before submitting. Never resubmit without the user's go-ahead.
   - Upload the still and pass it as BOTH `first_image` and `tail_image`.
   - Prompt template (edit names/positions to match the frame):
     > Locked-off static camera, no camera movement, no zoom. Natural, gentle, clearly visible
     > motion. The man [position], looking [direction], gives a quick playful wink, then turns his
     > head toward the camera by about 20 degrees with a warm smile, holds for a moment, then
     > slowly turns back. [The woman ... leans slightly closer toward the camera, tilts her head to
     > one side and smiles warmly, then eases back.] Only one wink, no other blinking. No talking, no hand movement, background
     > completely still. Faces, hair, clothing and the green-tinted black and white grade stay the
     > same. The last frame matches the first frame.
   - Download `urlWithoutWatermark` (never the watermarked url).
3. **Review before using.** Pull frames (`ffmpeg -i clip.mp4 -vf fps=2 f_%02d.png`) and check up
   close: faces still look like Dan and Allison (compare against `images/dan-*.jpg`,
   `images/allison*.jpg`), no warped text, no AI label in the corners. If a face drifts, report
   it to the user with a side-by-side; do not ship it silently.
4. **Composite and encode** with the helper in this folder:
   ```
   python3 .claude/skills/realto-portrait-animation/animate.py clip.mp4 still.png NAME --keep-left 0.45
   ```
   `--keep-left` keeps the left part of the frame as the untouched still (use it whenever the
   image has baked-in text or graphics, like the video posters; 0 for photo-only banners).
   Use `--width 1024 --fps 12 --quality 60` for cards and portraits (about 1.5 to 2 MB) and keep
   wide banners at the 1600 default. It writes `images/NAME.jpg` (the still, from the first composited frame) and
   `images/NAME-turn.webp` (1600px, 15 fps, about 1 to 1.5 MB), and prints `data-anim-ms`.
4b. **Phone version (always).** Run the helper again with `--small` to write `NAME-turn-sm.webp`
   (keeps the still): `--width 420 --fps 8 --quality 40` for portraits, `560` for cards, `720` for wide
   banners, `260`-`340` for half-width art. Aim for 200 to 600 KB. Phones and screens under 760px use
   it automatically. Without it a phone scroll of the homepage reached about 30 MB.
5. **Markup.** On the `<img>` (in the generator, then rebuild):
   ```html
   <img src="images/NAME.jpg" data-anim="images/NAME-turn.webp" data-anim-ms="5000" alt="" ...>
   ```
   `assets/js/main.js` handles every `img[data-anim]`: hover or keyboard focus on the nearest
   `[data-anim-host]` or `.yt` (or the image itself; add `data-anim-host` to a wrapper when text or
   overlays sit on top of the image, or when several images should play together) on hover-capable devices, IntersectionObserver at 60% visibility on
   touch devices, nothing for `prefers-reduced-motion`. Each play gets a fresh blob URL so it
   restarts from frame one, then swaps back to the still after `data-anim-ms`. On desktop the
   animation file is fetched only when the image comes within 300px of the screen. Each file downloads
   once per page even if several images share it. The generator (`finish_images` in build.py) adds
   `data-anim-sm` when a `-turn-sm.webp` exists, adds 480/960 `srcset` to stills, leaves the scrolling
   carousel thumbnails (`data-thumb`) and images 160px wide or smaller (avatars, host chips) still, and
   swaps every page use of the portraits listed in `ANIMATED_PORTRAITS` to their animated versions.
6. **Verify** in Chromium (Playwright, `executable_path="/opt/pw-browsers/chromium"`) over a local
   http server (blob fetch does not work from file://): src becomes `blob:` on hover, returns to
   the still after the duration, plays on scroll with a mobile/touch context, stays still with
   `reduced_motion="reduce"`, and clicking a `.yt` still opens the player.
7. Note the new files in `realto-partners/README.md` (photo table) and remind the user that Dan and
   Allison should approve AI-animated faces before launch.
