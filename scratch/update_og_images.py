import os
import re

projects_dir = "projects"
# Regex to find <meta property="og:image" content="...">
og_image_pattern = re.compile(r'(<meta property="og:image" content=")([^"]+)\.(?:png|jpg|jpeg)(")', re.IGNORECASE)

for filename in os.listdir(projects_dir):
    if filename.endswith(".html"):
        filepath = os.path.join(projects_dir, filename)
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        new_content = og_image_pattern.sub(r'\1\2.webp\3', content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated og:image in {filename}")
