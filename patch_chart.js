const fs = require('fs');
let code = fs.readFileSync('src/components/ChartGeneration.tsx', 'utf8');

// 1. Remove old Nominatim definitions
code = code.replace(/interface Suggestion \{[^}]+\}\n/g, '');
code = code.replace(/const SUGGESTIONS_CACHE = new Map<string, Suggestion\[\]>\(\);\nconst MAX_CACHE_SIZE = 100;\n\n\/\/ Initialize cache from sessionStorage for persistence across page refreshes\nif \(typeof window !== 'undefined'\) \{\n  try \{\n    const stored = sessionStorage\.getItem\('NOMINATIM_CACHE'\);\n    if \(stored\) \{\n      const parsed = JSON\.parse\(stored\);\n      Object\.entries\(parsed\)\.forEach\(\(\[key, value\]\) => \{\n        SUGGESTIONS_CACHE\.set\(key, value as Suggestion\[\]\);\n      \}\);\n    \}\n  \} catch \(error\) \{\n    console\.error\('Error loading Nominatim cache:', error\);\n  \}\n\}\n/g, '');

// 2. Add hook import
code = code.replace("import { sendGAEvent } from '@next/third-parties/google';", "import { sendGAEvent } from '@next/third-parties/google';\nimport { useNominatim, type Suggestion } from '@/hooks/useNominatim';");

// 3. Replace local state and effect with hook
code = code.replace(/const \[suggestions, setSuggestions\] = useState<\{ name: string; lat: string; lon: string \}\[\]>\(\[\]\);\n  const \[isLoading, setIsLoading\] = useState\(false\);/, "const { suggestions, isSearching: isLoading, fetchSuggestions, setSuggestions } = useNominatim();");

// 4. Remove old useEffect for pob
let effectRegex = /useEffect\(\(\) => \{\n    if \(!pob\) \{\n      setSuggestions\(\[\]\);\n      return;\n    \}\n\n    const query = pob\.trim\(\);\n    if \(query\.length < 2\) \{\n      setSuggestions\(\[\]\);\n      return;\n    \}\n\n    const cacheKey = query\.toLowerCase\(\);\n    const cached = SUGGESTIONS_CACHE\.get\(cacheKey\);[^]*?controller\.abort\(\); \/\/ Cancel pending request if component re-renders or unmounts\n    \};\n  \}, \[pob\]\);\n/;
code = code.replace(effectRegex, "useEffect(() => {\n    fetchSuggestions(pob);\n  }, [pob]);\n");

fs.writeFileSync('src/components/ChartGeneration.tsx', code);
