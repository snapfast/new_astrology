import os
import re

filepath = "src/app/horoscope/HoroscopeClientPage.tsx"
if os.path.exists(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    content = re.sub(r'heroDesc: "Generate your detailed Vedic astrology birth chart \(Kundli\) with precise planetary positions, divisional charts \(D1, D3, D9\), and Vimshottari Dasha\."', r'heroDesc: "Generate your Vedic astrology birth chart (Kundli) with planetary positions, divisional charts, and Vimshottari Dasha."', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath}")
