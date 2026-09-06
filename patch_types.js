const fs = require('fs');

const files = [
    'src/components/ChartGeneration.tsx',
    'src/components/KPHoraryGeneration.tsx'
];

for (const file of files) {
    let code = fs.readFileSync(file, 'utf8');

    // Remove local StoredChartData definition
    code = code.replace(/export interface StoredChartData \{\n  name: string;\n  dob: string;\n  tob: string;\n  pob: string;\n  coords: \{ lat: string; lon: string \} \| null;\n\}\n\n/, '');
    code = code.replace(/interface StoredChartData \{\n  name: string;\n  dob: string;\n  tob: string;\n  pob: string;\n  coords: \{ lat: string; lon: string \} \| null;\n\}\n\n/, '');

    // Add import from types
    code = code.replace("import { useNominatim } from '@/hooks/useNominatim';", "import { useNominatim } from '@/hooks/useNominatim';\nimport { type StoredChartData } from '@/lib/types';");

    fs.writeFileSync(file, code);
}
