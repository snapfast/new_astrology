const fs = require('fs');
let code = fs.readFileSync('src/components/ChartGeneration.tsx', 'utf8');

let effectRegex = /useEffect\(\(\) => \{\n    fetchSuggestions\(pob\);\n  \}, \[pob\]\);\n/;
code = code.replace(effectRegex, "useEffect(() => {\n    fetchSuggestions(pob);\n  }, [pob, fetchSuggestions]);\n");

fs.writeFileSync('src/components/ChartGeneration.tsx', code);
