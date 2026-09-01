sed -i 's/function createPlanet/export function createPlanet/' src/lib/astrology.ts
sed -i 's/function formatDegree/export function formatDegree/' src/lib/astrology.ts
sed -i 's/function isPlanetCombustAt/export function isPlanetCombustAt/' src/lib/astrology.ts
sed -i 's/function getRotationMatrix/export function getRotationMatrix/' src/lib/astrology.ts
sed -i 's/function getTrueMoonEclipticLongitude/export function getTrueMoonEclipticLongitude/' src/lib/astrology.ts
sed -i 's/export interface PlanetData/export interface PlanetData/' src/lib/astrology.ts
