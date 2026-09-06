const fs = require('fs');
let code = fs.readFileSync('src/hooks/useNominatim.ts', 'utf8');

code = code.replace("import { useState, useRef, useEffect } from 'react';", "import { useState, useRef, useEffect, useCallback } from 'react';\nimport { type Suggestion } from '@/lib/types';");
code = code.replace(/export interface Suggestion \{\n  name: string;\n  lat: string;\n  lon: string;\n\}\n\n/, "");

fs.writeFileSync('src/hooks/useNominatim.ts', code);
