import os

file_path = r'e:\Yug Storage\Desktop\Yug Study\Programming\HelloYug.github.io\assets\css\style.css'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Look for the social links block at the end
# We want to replace the block starting around line 3500 (1-indexed)
# and also remove any extra braces at the end.

# The user's code ends with:
#     body[data-page="home"] #header+.toggle-home {
#       position: fixed !important;
#       top: 16px !important;
#       right: 16px !important;
#       left: auto !important;
#       margin: 0 !important;
#       z-index: 9999 !important;
#     }
#   }
# }

# We want to change the .social-links block and ensure the braces are correct.

new_block = """    body[data-page="home"] #header:not(.header-top) .social-links {
      width: 100% !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      margin-top: 15px !important;
    }

    body[data-page="home"] #header:not(.header-top) .social-links a {
      margin: 0 6px !important;
    }

    body[data-page="home"] #header:not(.header-top) .toggle-inner {
      display: none !important;
    }

    body[data-page="home"] #header+.toggle-home {
      position: fixed !important;
      top: 16px !important;
      right: 16px !important;
      left: auto !important;
      margin: 0 !important;
      z-index: 9999 !important;
    }
  }
}
"""

# Find where the .social-links block starts near the end
start_index = -1
for i in range(len(lines) - 1, 0, -1):
    if '.social-links {' in lines[i] and 'body[data-page="home"]' in lines[i-1]:
        # Wait, the lines might be different. Let's look for the specific block.
        pass

# Actually, I'll just rewrite the last part of the file.
# The block starts after h2 centering.

# Let's find "body[data-page=\"home\"] #header:not(.header-top) .social-links {"
for i in range(len(lines)):
    if 'body[data-page="home"] #header:not(.header-top) .social-links {' in lines[i]:
        start_index = i
        break

if start_index != -1:
    # Replace from start_index to the end of the file
    lines = lines[:start_index] + [new_block]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Successfully updated style.css")
else:
    print("Could not find the target block")
