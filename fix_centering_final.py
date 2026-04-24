import os

file_path = r'e:\Yug Storage\Desktop\Yug Study\Programming\HelloYug.github.io\assets\css\style.css'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Aggressive centering for social links
# We will target the .social-links block and the individual links
new_styles = """
    body[data-page="home"] #header:not(.header-top) .social-links {
      width: 100% !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      margin: 20px 0 0 0 !important;
      padding: 0 !important;
      left: 0 !important;
    }

    body[data-page="home"] #header:not(.header-top) .social-links a {
      margin: 0 8px !important;
      display: inline-flex !important;
      justify-content: center !important;
      align-items: center !important;
      float: none !important;
    }
"""

# Find the end of the media query block we added
# It starts with @media (max-width: 1024px) {
# and contains body[data-page="home"] #header:not(.header-top)

if '@media (max-width: 1024px) {' in content:
    parts = content.split('@media (max-width: 1024px) {')
    # The last part contains our overrides
    last_part = parts[-1]
    
    # Let's replace everything from the first occurrence of .social-links in this part
    if '.social-links {' in last_part:
        sub_parts = last_part.split('body[data-page="home"] #header:not(.header-top) .social-links {')
        # This might be tricky if there are multiple. 
        # Let's just append the new styles to the end of the media query (before the last two braces)
        
        # Actually, let's just use a more surgical replacement.
        pass

# I'll just append these rules at the very end of the file, inside the media query.
# But wait, I need to make sure I don't create more syntax errors.

# Let's try to clean up the file and append a fresh, clean media query block at the end.
lines = content.splitlines()
# Remove the last few lines that contain the media query if possible
# Or just append a new one that overrides everything.

final_override = """
/* FINAL CENTERING OVERRIDE */
@media (max-width: 1024px) {
    body[data-page="home"] #header:not(.header-top) .container,
    body[data-page="home"] #header:not(.header-top) .hero-content {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      text-align: center !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }

    body[data-page="home"] #header:not(.header-top) .social-links {
      width: 100% !important;
      display: flex !important;
      justify-content: center !important;
      margin: 20px 0 0 0 !important;
      padding: 0 !important;
    }

    body[data-page="home"] #header:not(.header-top) .social-links a {
      margin: 0 8px !important;
      float: none !important;
    }
}
"""

with open(file_path, 'a', encoding='utf-8') as f:
    f.write(final_override)

print("Appended final centering override to style.css")
