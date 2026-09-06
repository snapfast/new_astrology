const fs = require('fs');
let code = fs.readFileSync('src/lib/astrology.ts', 'utf8');

code = code.replace("LUNAR_MONTHS[(lunarMonthIdx + 1) % 12].name", "LUNAR_MONTHS[((monthIdx + 1) % 12 + 1) % 12].name");

fs.writeFileSync('src/lib/astrology.ts', code);
