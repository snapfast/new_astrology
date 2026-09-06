import re

files_to_update = [
    'src/components/ChartGeneration.tsx',
    'src/components/KPHoraryGeneration.tsx',
    'src/app/btr/BtrClientPage.tsx'
]

def update_file(filename):
    with open(filename, 'r') as f:
        content = f.read()

    # The issue is that in the handlePobChange function, there is another fetch mechanism still present.
    # Let's see if handlePobChange is present and remove the fetching block there.

    # We need to replace the long fetch block in handlePobChange
    start_str = "    if (val.length < 2) {\n      setSuggestions([]);\n      return;\n    }\n\n    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);"
    end_str = "      }\n    }, 500);\n  };\n"

    start_str_short = "    if (val.length < 2) {\n      setSuggestions([]);\n      return;\n    }"

    if start_str_short in content:
        start_idx = content.find(start_str_short)
        # find the end of handlePobChange
        end_idx = content.find("  };\n", start_idx) + 5

        new_content = "    fetchSuggestions(val);\n  };\n"
        content = content[:start_idx] + new_content + content[end_idx:]

    with open(filename, 'w') as f:
        f.write(content)

for f in files_to_update:
    update_file(f)
