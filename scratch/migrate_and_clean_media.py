import os
import shutil
from pathlib import Path

root = Path(".").resolve()
assets_dir = root / "assets"
optimized_dir = assets_dir / "optimized_media" / "assets"
source_media_dir = assets_dir / "source_media"

# 1. Copy optimized files to their target locations in assets/
if optimized_dir.exists():
    print(f"Copying optimized files from {optimized_dir} to {assets_dir}...")
    for src_root, dirs, files in os.walk(optimized_dir):
        rel_path = Path(src_root).relative_to(optimized_dir)
        dest_root = assets_dir / rel_path
        dest_root.mkdir(parents=True, exist_ok=True)
        
        for file in files:
            src_file = Path(src_root) / file
            dest_file = dest_root / file
            shutil.copy2(src_file, dest_file)
            # print(f"Copied: {rel_path / file}")

# 2. Identify original files and move them to source_media/
# We look for .jpg, .png, .jpeg, etc. that now have a .webp version
IMAGE_EXTS = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff'}
VIDEO_EXTS = {'.mp4', '.mov', '.avi', '.mkv'}

print(f"Moving original media to {source_media_dir}...")
for folder in ['img', 'certs', 'expletters', 'favicon_io']:
    folder_path = assets_dir / folder
    if not folder_path.exists(): continue
    
    for src_root, dirs, files in os.walk(folder_path):
        if 'source_media' in src_root: continue
        
        rel_root = Path(src_root).relative_to(assets_dir)
        
        for file in files:
            file_path = Path(src_root) / file
            ext = file_path.suffix.lower()
            
            if ext in IMAGE_EXTS or ext in VIDEO_EXTS:
                # Check if an optimized version exists
                # Optimized versions are usually .webp or have _opt suffix
                has_webp = (file_path.with_suffix('.webp')).exists()
                has_opt_mp4 = (file_path.parent / (file_path.stem + "_opt.mp4")).exists()
                
                if has_webp or has_opt_mp4:
                    dest_path = source_media_dir / rel_root / file
                    dest_path.parent.mkdir(parents=True, exist_ok=True)
                    shutil.move(file_path, dest_path)
                    print(f"Moved original to source_media: {rel_root / file}")

# 3. Global Code Update (One final pass)
# Ensure all references in HTML, CSS, JS use optimized extensions
def update_codebase():
    CODE_EXTS = {'.html', '.css', '.js'}
    # Mapping of extensions to optimized counterparts
    REPLACEMENTS = [
        (r'\.png(?=["\'])', '.webp'),
        (r'\.jpg(?=["\'])', '.webp'),
        (r'\.jpeg(?=["\'])', '.webp'),
        # For videos, my script named them _opt.mp4
        # (r'\.mp4(?=["\'])', '_opt.mp4'), 
    ]
    
    print("Performing final codebase update for media extensions...")
    for file_path in root.rglob("*"):
        if file_path.suffix.lower() in CODE_EXTS:
            if 'assets/vendor' in str(file_path) or 'backups' in str(file_path) or 'assets/source_media' in str(file_path):
                continue
                
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                new_content = content
                # This is a broad replacement, but safe since we filtered for code files and use quotes/suffix boundary
                # We target images specifically to avoid breaking other types
                for old_ext, new_ext in [('.png', '.webp'), ('.jpg', '.webp'), ('.jpeg', '.webp')]:
                    # Find instances like "image.png" or 'image.png'
                    new_content = re.sub(re.escape(old_ext) + r'(?=["\'])', new_ext, new_content)

                if new_content != content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated references in: {file_path.relative_to(root)}")
            except Exception as e:
                print(f"Error updating {file_path}: {e}")

import re
update_codebase()
print("Migration and cleanup complete.")
