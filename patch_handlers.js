const fs = require('fs');

const files = [
    'src/components/ChartGeneration.tsx',
    'src/components/KPHoraryGeneration.tsx',
    'src/app/btr/BtrClientPage.tsx'
];

for (const file of files) {
    let code = fs.readFileSync(file, 'utf8');

    // Remove fetchSuggestions(val) from handlePobChange to avoid redundant calls since useEffect handles it
    let regex = /    fetchSuggestions\(val\);\n  \};\n/g;
    code = code.replace(regex, "  };\n");

    fs.writeFileSync(file, code);
}
