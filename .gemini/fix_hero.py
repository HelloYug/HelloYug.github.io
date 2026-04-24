import os

file_path = r"e:\Yug Storage\Desktop\Yug Study\Programming\HelloYug.github.io\assets\css\style.css"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Target block for hero centering in mobile/tablet (max-width: 992px)
# We use the exact strings found in the previous debug output.
target = """ #header h1  {
   font-size: 36px;
}

 #header h2  {
   font-size: 20px;
   line-height: 30px;
}

 #header .social-links  {
   margin-top: 15px;
}

 #header .social-links a  {
   width: 40px;
   height: 40px;
   font-size: 20px;
}

 #header .container  {
   display: flex;
   flex-direction: column;
   align-items: center;
}"""

# Replacement block
replacement = """ #header h1  {
   font-size: 36px;
   text-align: center;
}

 #header h2  {
   font-size: 20px;
   line-height: 30px;
   text-align: center;
}

 #header .social-links  {
   margin-top: 15px;
   display: flex;
   justify-content: center;
   gap: 12px;
}

 #header .social-links a  {
   width: 40px;
   height: 40px;
   font-size: 20px;
   margin-right: 0;
}

 #header .container  {
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
}"""

if target in content:
    new_content = content.replace(target, replacement)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Replacement successful")
else:
    # Try with \r\n just in case
    target_rn = target.replace('\n', '\r\n')
    if target_rn in content:
        new_content = content.replace(target_rn, replacement.replace('\n', '\r\n'))
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Replacement successful with \r\n")
    else:
        print("Target not found")
