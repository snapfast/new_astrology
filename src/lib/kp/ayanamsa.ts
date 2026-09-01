import * as Ast from 'astronomy-engine';

export function getKpKhullarAyanamsa(time: Ast.AstroTime): number {
    const y = time.date.getUTCFullYear();
    const startOfYear = new Date(Date.UTC(y, 0, 1));
    const nextYear = new Date(Date.UTC(y + 1, 0, 1));
    const fraction = (time.date.getTime() - startOfYear.getTime()) / (nextYear.getTime() - startOfYear.getTime());
    const exactYear = y + fraction;
    const ayanamsaSeconds = (exactYear - 291.0) * 50.2388475;
    return ayanamsaSeconds / 3600.0;
}
