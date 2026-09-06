const fs = require('fs');
let code = fs.readFileSync('src/app/btr/BtrClientPage.tsx', 'utf8');

let regex = /useEffect\(\(\) => \{\n    if \(!pob\) \{[^]*?controller\.abort\(\);\n    \};\n  \}, \[pob\]\);\n/g;
code = code.replace(regex, "useEffect(() => {\n    fetchSuggestions(pob);\n  }, [pob, fetchSuggestions]);\n");

fs.writeFileSync('src/app/btr/BtrClientPage.tsx', code);
