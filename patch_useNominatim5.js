const fs = require('fs');
let code = fs.readFileSync('src/hooks/useNominatim.ts', 'utf8');

code = code.replace("import { useState, useRef, useEffect } from 'react';", "import { useState, useRef, useEffect, useCallback } from 'react';");
code = code.replace("const fetchSuggestions = (query: string) => {", "const fetchSuggestions = useCallback((query: string) => {");
code = code.replace("}, 500);\n  };", "}, 500);\n  }, []);");

fs.writeFileSync('src/hooks/useNominatim.ts', code);
