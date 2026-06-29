const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;
const birthDate = new Date("1993-11-02T13:10:00Z");
const remainingMs = 4.5 * MS_PER_YEAR; // Example
const endDate = new Date(birthDate.getTime() + remainingMs);

let yDiff = endDate.getUTCFullYear() - birthDate.getUTCFullYear();
let mDiff = endDate.getUTCMonth() - birthDate.getUTCMonth();
let dDiff = endDate.getUTCDate() - birthDate.getUTCDate();

if (dDiff < 0) {
    const prevMonth = new Date(endDate.getUTCFullYear(), endDate.getUTCMonth(), 0);
    dDiff += prevMonth.getUTCDate();
    mDiff--;
}
if (mDiff < 0) {
    mDiff += 12;
    yDiff--;
}

console.log(yDiff, mDiff, dDiff);
