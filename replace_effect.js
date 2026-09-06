const fs = require('fs');

const files = [
    'src/components/ChartGeneration.tsx',
    'src/components/KPHoraryGeneration.tsx',
    'src/app/btr/BtrClientPage.tsx'
];

for (const file of files) {
    let code = fs.readFileSync(file, 'utf8');

    // Remove old useEffect for pob
    let regex = /useEffect\(\(\) => \{\n    const query = pob\.trim\(\);[\s\S]*?controller\.abort\(\); \/\/ Cancel pending request if component re-renders or unmounts\n    \};\n  \}, \[pob\]\);\n/;
    code = code.replace(regex, "useEffect(() => {\n    fetchSuggestions(pob);\n  }, [pob, fetchSuggestions]);\n");

    // Check for another variation
    let regex2 = /useEffect\(\(\) => \{\n    if \(!pob\) \{[\s\S]*?controller\.abort\(\); \/\/ Cancel pending request if component re-renders or unmounts\n    \};\n  \}, \[pob\]\);\n/;
    code = code.replace(regex2, "useEffect(() => {\n    fetchSuggestions(pob);\n  }, [pob, fetchSuggestions]);\n");

    // Specifically for BTR which might use different format
    let regex3 = /useEffect\(\(\) => \{\n    const query = pob\.trim\(\);[\s\S]*?controller\.abort\(\);\n    \};\n  \}, \[pob\]\);\n/;
    code = code.replace(regex3, "useEffect(() => {\n    fetchSuggestions(pob);\n  }, [pob, fetchSuggestions]);\n");

    fs.writeFileSync(file, code);
}
