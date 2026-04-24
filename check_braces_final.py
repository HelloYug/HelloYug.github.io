import re

def check_braces(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove strings and comments to avoid confusion
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    content = re.sub(r'"(.*?)"', '""', content)
    content = re.sub(r"'(.*?)'", "''", content)
    
    stack = []
    lines = content.split('\n')
    
    for i, line in enumerate(lines):
        for j, char in enumerate(line):
            if char == '{':
                stack.append((i + 1, j + 1))
            elif char == '}':
                if not stack:
                    return f"Extra closing brace at Line {i + 1}, Col {j + 1}"
                stack.pop()
    
    if stack:
        line, col = stack[0]
        return f"Unclosed opening brace at Line {line}, Col {col}"
    
    return "Balanced"

print(check_braces('assets/css/style.css'))
