import os

file_path = r"e:\Yug Storage\Desktop\Yug Study\Programming\HelloYug.github.io\assets\css\style.css"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We want to add justify-content: center to #header itself for mobile/tablet
# And ensure everything else is centered.

target = """ #header h1  {
   font-size: 36px;
   text-align: center;
}"""

replacement = """ #header  {
   justify-content: center;
}

 #header h1  {
   font-size: 36px;
   text-align: center;
}"""

if target in content:
    new_content = content.replace(target, replacement)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Replacement successful")
else:
    print("Target not found")
