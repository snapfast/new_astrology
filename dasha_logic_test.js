const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;
const endDate = new Date('1994-01-01T00:00:00Z').getTime();
const birthDate = new Date('1990-01-01T00:00:00Z').getTime();
const remainingMs = endDate - birthDate;

const yDiff = remainingMs / MS_PER_YEAR;
const years = Math.floor(yDiff);
const mDiff = (yDiff - years) * 12;
const months = Math.floor(mDiff);
const days = Math.floor((mDiff - months) * 30.4375);
console.log(`${years} years, ${months} months, ${days} days`);
