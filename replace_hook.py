import re
import os

files_to_update = [
    'src/components/ChartGeneration.tsx',
    'src/components/KPHoraryGeneration.tsx',
    'src/app/btr/BtrClientPage.tsx'
]

def update_file(filename):
    with open(filename, 'r') as f:
        content = f.read()

    # Add import
    if filename == 'src/app/btr/BtrClientPage.tsx':
        content = content.replace("import PageHeader from '@/components/PageHeader';", "import PageHeader from '@/components/PageHeader';\nimport { useNominatim, type Suggestion } from '@/hooks/useNominatim';")
    else:
        content = content.replace("import { sendGAEvent } from '@next/third-parties/google';", "import { sendGAEvent } from '@next/third-parties/google';\nimport { useNominatim, type Suggestion } from '@/hooks/useNominatim';")

    # Remove interface Suggestion
    content = re.sub(r'interface Suggestion \{\n  name: string;\n  lat: string;\n  lon: string;\n\}\n\n', '', content)
    content = re.sub(r'interface Suggestion \{\n  name: string;\n  lat: string;\n  lon: string;\n\}\n', '', content)

    # Remove Cache setup
    content = re.sub(r'const SUGGESTIONS_CACHE = new Map<string, Suggestion\[\]>\(\);\nconst MAX_CACHE_SIZE = 100;\n\n// Initialize cache from sessionStorage for persistence across page refreshes\nif \(typeof window !== \'undefined\'\) \{\n  try \{\n    const stored = sessionStorage.getItem\(\'NOMINATIM_CACHE\'\);\n    if \(stored\) \{\n      const parsed = JSON.parse\(stored\);\n      Object.entries\(parsed\).forEach\(\(\[key, value\]\) => \{\n        SUGGESTIONS_CACHE.set\(key, value as Suggestion\[\]\);\n      \}\);\n    \}\n  \} catch \(error\) \{\n    console.error\(\'Error loading Nominatim cache:\', error\);\n  \}\n\}\n\n', '', content)

    # Replace useState with hook
    content = re.sub(r'const \[suggestions, setSuggestions\] = useState<\{ name: string; lat: string; lon: string \}\[\]>\(\[\]\);\n  const \[isLoading, setIsLoading\] = useState\(false\);', 'const { suggestions, isSearching: isLoading, fetchSuggestions, setSuggestions } = useNominatim();', content)
    content = re.sub(r'const \[suggestions, setSuggestions\] = useState<Suggestion\[\]>\(\[\]\);\n  const \[isLoading, setIsLoading\] = useState\(false\);', 'const { suggestions, isSearching: isLoading, fetchSuggestions, setSuggestions } = useNominatim();', content)

    # Remove the massive useEffect
    # We find the `useEffect(() => { ... }, [pob]);`

    start_str = "  useEffect(() => {\n    if (!pob) {\n      setSuggestions([]);\n      return;\n    }"
    end_str = "    return () => {\n      clearTimeout(debounceTimer);\n      controller.abort(); // Cancel pending request if component re-renders or unmounts\n    };\n  }, [pob]);\n"

    if start_str in content and end_str in content:
        start_idx = content.find(start_str)
        end_idx = content.find(end_str) + len(end_str)

        # Replace the entire block with the new useEffect
        new_effect = "  useEffect(() => {\n    fetchSuggestions(pob);\n  }, [pob, fetchSuggestions]);\n"
        content = content[:start_idx] + new_effect + content[end_idx:]

    with open(filename, 'w') as f:
        f.write(content)

for f in files_to_update:
    update_file(f)

print("Update complete")
