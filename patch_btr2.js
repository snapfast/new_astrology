const fs = require('fs');
let code = fs.readFileSync('src/app/btr/BtrClientPage.tsx', 'utf8');

code = code.replace(/const \[suggestions, setSuggestions\] = useState<Suggestion\[\]>\(\[\]\);\n  const \[isLoading, setIsLoading\] = useState\(false\);/, "const { suggestions, isSearching: isLoading, fetchSuggestions, setSuggestions } = useNominatim();");

fs.writeFileSync('src/app/btr/BtrClientPage.tsx', code);
