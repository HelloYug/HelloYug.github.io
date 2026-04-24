import os

file_path = r"e:\Yug Storage\Desktop\Yug Study\Programming\HelloYug.github.io\assets\css\style.css"
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

start = 2631 # 0-indexed for 2632
for i in range(start, start + 30):
    if i < len(lines):
        print(f"{i+1}: {repr(lines[i])}")
