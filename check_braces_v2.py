import re

file_path = 'assets/css/style.css'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

stack = []
for i, line in enumerate(lines):
    # Remove comments to avoid false positives
    clean_line = re.sub(r'/\*.*?\*/', '', line)
    
    # Handle multi-line comments partially (this is a simple checker)
    if '/*' in clean_line and '*/' not in clean_line:
        # Skip until end of comment (not implemented here, but good enough for braces)
        pass

    for j, char in enumerate(clean_line):
        if char == '{':
            stack.append((i + 1, line.strip()))
        elif char == '}':
            if stack:
                stack.pop()
            else:
                print(f"ERROR: Extra closing brace at L{i + 1}: {line.strip()}")

if stack:
    for line_num, content in stack:
        print(f"ERROR: Unclosed block starting at L{line_num}: {content}")
else:
    print("SUCCESS: Braces are balanced.")
