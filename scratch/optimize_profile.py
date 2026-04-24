from PIL import Image
from pathlib import Path

img_path = Path("assets/img/yug-agarwal-software-engineer-profile-1.jpg")
if img_path.exists():
    with Image.open(img_path) as img:
        img.save(img_path.with_suffix(".webp"), "WEBP", quality=80)
    print("Optimized profile image to WebP.")
else:
    print("Profile image not found.")
