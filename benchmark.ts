import { performance } from 'perf_hooks';

// Simulate the data
const intermediateList = [
    { planet: 'Sun', ratio: 1.2, rank: 0 },
    { planet: 'Moon', ratio: 0.9, rank: 0 },
    { planet: 'Mars', ratio: 1.5, rank: 0 },
    { planet: 'Mercury', ratio: 1.1, rank: 0 },
    { planet: 'Jupiter', ratio: 1.8, rank: 0 },
    { planet: 'Venus', ratio: 1.3, rank: 0 },
    { planet: 'Saturn', ratio: 0.8, rank: 0 },
];

function oldWay() {
    const sortedForRank = [...intermediateList].sort((a, b) => b.ratio - a.ratio);
    for (const item of intermediateList) {
        item.rank = sortedForRank.findIndex(s => s.planet === item.planet) + 1;
    }
}

function newWay() {
    const sortedForRank = [...intermediateList].sort((a, b) => b.ratio - a.ratio);
    for (let i = 0; i < sortedForRank.length; i++) {
        sortedForRank[i].rank = i + 1;
    }
}

// Warm up
for (let i = 0; i < 10000; i++) {
    oldWay();
    newWay();
}

let start = performance.now();
for (let i = 0; i < 100000; i++) {
    oldWay();
}
let end = performance.now();
console.log('Old way:', end - start, 'ms');

start = performance.now();
for (let i = 0; i < 100000; i++) {
    newWay();
}
end = performance.now();
console.log('New way:', end - start, 'ms');
