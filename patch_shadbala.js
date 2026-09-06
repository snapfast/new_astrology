const fs = require('fs');
let code = fs.readFileSync('src/lib/astrology.ts', 'utf8');

// Replace O(N) array search with O(1) map lookup
const search = `    // Return in Moon, Sun, Mercury, Venus, Mars, Jupiter, Saturn order
    const orderedPlanets = ["Moon", "Sun", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"];
    for (const name of orderedPlanets) {
        const found = intermediateList.find(item => item.planet === name);
        if (found) shadbalaList.push(found);
    }

    return shadbalaList;`;

const replace = `    // Return in Moon, Sun, Mercury, Venus, Mars, Jupiter, Saturn order
    const planetMap: Record<string, ShadBalaData> = {};
    for (let i = 0; i < intermediateList.length; i++) {
        planetMap[intermediateList[i].planet] = intermediateList[i];
    }

    const orderedPlanets = ["Moon", "Sun", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"];
    for (let i = 0; i < orderedPlanets.length; i++) {
        const found = planetMap[orderedPlanets[i]];
        if (found) shadbalaList.push(found);
    }

    return shadbalaList;`;

code = code.replace(search, replace);

fs.writeFileSync('src/lib/astrology.ts', code);
