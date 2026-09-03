import os
import re

filepath = "src/app/transits/TransitsClientPage.tsx"
if os.path.exists(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    content = re.sub(r'heroDesc: "Track the past and future movements \(Gochara\) of all nine Vedic planets\."', r'heroDesc: "Track the movements of all nine Vedic planets."', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath}")
