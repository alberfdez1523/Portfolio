const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\alber\\Downloads\\alberfdez15.vercel.app_2026-02-27_13-09-28.html', 'utf8');
const match = content.match(/window\.__LIGHTHOUSE_JSON__\s*=\s*(\{.+?\});\s*<\/script>/s);
if (!match) { console.log('No JSON match found'); process.exit(1); }
const data = JSON.parse(match[1]);

let output = '';

// Category scores
output += '=== CATEGORY SCORES ===\n';
for (const [key, cat] of Object.entries(data.categories)) {
  output += key + ': ' + (cat.score * 100) + '\n';
}

// All failing audits
output += '\n=== FAILING/WARNING AUDITS (score < 1) ===\n';
const failing = [];
for (const [id, audit] of Object.entries(data.audits)) {
  if (audit.score !== null && audit.score < 1) {
    failing.push({ id, title: audit.title, score: audit.score, displayValue: audit.displayValue || '' });
  }
}
failing.sort((a,b) => a.score - b.score);
for (const a of failing) {
  output += a.score + ' | ' + a.id + ' | ' + a.title + (a.displayValue ? ' | ' + a.displayValue : '') + '\n';
}

fs.writeFileSync('c:\\Users\\alber\\Downloads\\Portfolio\\lighthouse_summary.txt', output);
console.log('Done - wrote lighthouse_summary.txt');
