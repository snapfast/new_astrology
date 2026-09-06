const fs = require('fs');
let code = fs.readFileSync('src/lib/astrology.ts', 'utf8');

code = code.replace("const planetMap: Record<string, ShadBalaData> = {};", "const shadbalaPlanetMap: Record<string, ShadBalaData> = {};");
code = code.replace("planetMap[intermediateList[i].planet] = intermediateList[i];", "shadbalaPlanetMap[intermediateList[i].planet] = intermediateList[i];");
code = code.replace("const found = planetMap[orderedPlanets[i]];", "const found = shadbalaPlanetMap[orderedPlanets[i]];");

fs.writeFileSync('src/lib/astrology.ts', code);
