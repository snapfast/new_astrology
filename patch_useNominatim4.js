const fs = require('fs');
let code = fs.readFileSync('src/hooks/useNominatim.ts', 'utf8');

code = code.replace("import { useState, useRef, useEffect, useCallback } from 'react';", "import { useState, useRef, useEffect } from 'react';");
code = code.replace("} catch (error: any) {", "} catch (error: unknown) {");
code = code.replace("if (error.name !== 'AbortError') {", "if (error instanceof Error && error.name !== 'AbortError') {");

fs.writeFileSync('src/hooks/useNominatim.ts', code);
