"""Turn a Kling image-to-video clip into the site's hover/scroll animation.

Usage:
  python3 animate.py CLIP.mp4 POSTER.png OUT_NAME [--keep-left 0.45] [--width 1600] [--fps 15] [--quality 68]

- CLIP.mp4   Kling result (generated with POSTER as both first and last frame)
- POSTER.png the exact still the clip was made from (any size; frames are fitted to it)
- OUT_NAME   writes realto-partners/images/OUT_NAME.jpg (still) and OUT_NAME-turn.webp (animation)
- --keep-left  fraction of the width, from the left, that stays the untouched POSTER
               (protects baked-in text and graphics from AI warping). 0 = use the whole frame.
               A soft 6% feather blends the seam.
"""
import argparse, os, subprocess, tempfile, glob
import numpy as np
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../realto-partners/images"))

ap = argparse.ArgumentParser()
ap.add_argument("clip"); ap.add_argument("poster"); ap.add_argument("name")
ap.add_argument("--keep-left", type=float, default=0.0)
ap.add_argument("--width", type=int, default=1600)
ap.add_argument("--fps", type=int, default=15)
ap.add_argument("--quality", type=int, default=68)
ap.add_argument("--small", action="store_true",
                help="write only the phone version, OUT_NAME-turn-sm.webp (use data-anim-sm); keeps the existing still")
a = ap.parse_args()

poster = Image.open(a.poster).convert("RGB")
W = a.width; H = round(poster.height * W / poster.width / 2) * 2
poster = poster.resize((W, H), Image.LANCZOS)
P = np.asarray(poster).astype(np.float32)

# Horizontal mask: 0 = poster, 1 = animated frame
x = np.arange(W) / W
feather = 0.06
m = np.clip((x - a.keep_left) / feather, 0, 1) if a.keep_left > 0 else np.ones(W)
M = np.broadcast_to(m[None, :, None], (H, W, 1)).astype(np.float32)

with tempfile.TemporaryDirectory() as td:
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", a.clip, "-vf",
                    f"fps={a.fps},scale={W}:{H}:flags=lanczos", f"{td}/f_%04d.png"], check=True)
    frames = sorted(glob.glob(f"{td}/f_*.png"))
    for f in frames:
        F = np.asarray(Image.open(f).convert("RGB")).astype(np.float32)
        Image.fromarray((F * M + P * (1 - M)).clip(0, 255).astype(np.uint8)).save(f)
    # Still = first composited frame, so swapping still <-> animation is invisible
    if not a.small:
        Image.open(frames[0]).save(os.path.join(ROOT, f"{a.name}.jpg"), quality=88, optimize=True, progressive=True)
    out = f"{a.name}-turn-sm.webp" if a.small else f"{a.name}-turn.webp"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", str(a.fps), "-i", f"{td}/f_%04d.png",
                    "-c:v", "libwebp", "-lossless", "0", "-q:v", str(a.quality), "-compression_level", "6",
                    "-preset", "photo", "-loop", "0", os.path.join(ROOT, out)], check=True)
    dur = round(len(frames) / a.fps * 1000)
print(f"wrote images/{out}" + ("" if a.small else f" and images/{a.name}.jpg") + f"  ({len(frames)} frames, data-anim-ms=\"{dur}\")")
