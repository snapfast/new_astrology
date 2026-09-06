const fs = require('fs');
let code = fs.readFileSync('src/app/btr/BtrClientPage.tsx', 'utf8');

let effectRegex = /useEffect\(\(\) => \{\n    if \(!pob\) \{\n      setSuggestions\(\[\]\);\n      return;\n    \}\n\n    const query = pob\.trim\(\);\n    if \(query\.length < 2\) \{\n      setSuggestions\(\[\]\);\n      return;\n    \}\n\n    const cacheKey = query\.toLowerCase\(\);\n    const cached = SUGGESTIONS_CACHE\.get\(cacheKey\);[^]*?controller\.abort\(\); \/\/ Cancel pending request if component re-renders or unmounts\n    \};\n  \}, \[pob\]\);\n/;
code = code.replace(effectRegex, "useEffect(() => {\n    fetchSuggestions(pob);\n  }, [pob, fetchSuggestions]);\n");

fs.writeFileSync('src/app/btr/BtrClientPage.tsx', code);
