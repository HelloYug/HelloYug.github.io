import os
import re

mapping = {
    "billfusion-billing-system.html": "billfusion-os-unified-billing-system-project.webp",
    "billo-telegram-billing-bot.html": "billo-instant-billing-system-project.webp",
    "busy-data-synapse-backup.html": "datasynapse-enterprise-backup-automation-suite-project.webp",
    "canteen-management-system.html": "canteen-management-system-project.webp",
    "handscope-gesture-control.html": "handscope-hand-gesture-control-project.webp",
    "hubcenter-notification-hub.html": "hubcenter-serverless-notification-hub.webp",
    "invengo-inventory-management.html": "invengo-inventory-simplified-project.webp",
    "late-comer-management-desktop.html": "latecomers-management-system-desktop-app-project.webp",
    "late-comer-management-web.html": "latecomers-management-system-web-app-project.webp",
    "minipycodes-python-scripts.html": "minipycodes-micro-projects.webp",
    "mysql-backup-recovery-utility.html": "sql-backup-recovery-utility-project.webp",
    "mysql-deletion-prank-tool.html": "sql-deletion-prank-harkat-plus-plus.webp",
    "roomiq-energy-automation.html": "roomiq-intelligent-room-energy-control-2.webp",
    "sound-swap-windows-prank.html": "soundswap-prank-tool-project.webp",
    "windows-lock-screen-security.html": "os-lock-screen-security-replica-project.webp"
}

projects_dir = "projects"
og_image_pattern = re.compile(r'(<meta property="og:image" content=")([^"]+)(")', re.IGNORECASE)

for filename, img_name in mapping.items():
    filepath = os.path.join(projects_dir, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # Replace the content within the og:image tag
        # We assume the directory is ../assets/img/project/
        new_url = f"../assets/img/project/{img_name}"
        new_content = og_image_pattern.sub(fr'\1{new_url}\3', content)
        
        # Also clean up any trailing text like " building" which I saw in one file
        new_content = re.sub(r'(<meta property="og:image" content="[^"]+">)\s*building', r'\1', new_content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed og:image mapping in {filename}")
    else:
        print(f"File not found: {filename}")
