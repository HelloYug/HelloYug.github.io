from PIL import Image
from pathlib import Path
import os

img_dir = Path("assets/img")
for ext in [".jpg", ".png", ".jpeg"]:
    for img_path in img_dir.glob(f"yug-agarwal-software-engineer-profile-*{ext}"):
        try:
            with Image.open(img_path) as img:
                img.save(img_path.with_suffix(".webp"), "WEBP", quality=80)
            print(f"Optimized {img_path.name} to WebP.")
        except Exception as e:
            print(f"Error optimizing {img_path.name}: {e}")
