const fs = require('fs');
let code = fs.readFileSync('src/lib/astrology.ts', 'utf8');

const search = `    const amanta = lunarMonthName;
    const purnimanta = paksha.name === "Krishna"
        ? LUNAR_MONTHS[(LUNAR_MONTHS.findIndex(m => m.name === amanta) + 1) % 12].name
        : amanta;`;

const replace = `    const amanta = lunarMonthName;
    const purnimanta = paksha.name === "Krishna"
        ? LUNAR_MONTHS[(lunarMonthIdx + 1) % 12].name
        : amanta;`;

code = code.replace(search, replace);
fs.writeFileSync('src/lib/astrology.ts', code);
