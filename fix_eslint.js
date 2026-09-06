const fs = require('fs');

const files = [
    'src/components/ChartGeneration.tsx',
    'src/components/KPHoraryGeneration.tsx',
    'src/app/btr/BtrClientPage.tsx'
];

for (const file of files) {
    let code = fs.readFileSync(file, 'utf8');

    code = code.replace("import { useNominatim, type Suggestion }", "import { useNominatim }");
    code = code.replace("const { suggestions, isSearching: isLoading, fetchSuggestions, setSuggestions }", "const { suggestions, isSearching: isLoading, fetchSuggestions }");
    code = code.replace("const MAX_CACHE_SIZE = 100;\n", "");

    fs.writeFileSync(file, code);
}
