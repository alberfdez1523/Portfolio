const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\alber\\Downloads\\alberfdez15.vercel.app_2026-02-27_13-09-28.html', 'utf8');
const match = content.match(/window\.__LIGHTHOUSE_JSON__\s*=\s*(\{.+?\});\s*<\/script>/s);
const data = JSON.parse(match[1]);

const ids = [
  'button-name','color-contrast','label-content-name-mismatch','link-name',
  'image-delivery-insight','network-dependency-tree-insight',
  'first-contentful-paint','render-blocking-insight','largest-contentful-paint',
  'interactive','speed-index',
  // Extra audits to check
  'modern-image-formats','uses-optimized-images','offscreen-images','properly-sized-images',
  'largest-contentful-paint-element','lcp-lazy-loaded','uses-text-compression',
  'uses-responsive-images','font-display','unused-css-rules','unused-javascript',
  'heading-order','image-alt','meta-description','document-title','hreflang',
  'render-blocking-resources','total-byte-weight','dom-size',
  'third-party-summary','viewport','html-has-lang'
];

let out = '';
for (const id of ids) {
  const a = data.audits[id];
  if (!a) continue;
  out += '\n====== ' + id + ' (score: ' + a.score + ') ======\n';
  out += 'Title: ' + a.title + '\n';
  if (a.displayValue) out += 'Display: ' + a.displayValue + '\n';
  if (a.description) out += 'Desc: ' + a.description.substring(0,300) + '\n';
  if (a.details) {
    const d = a.details;
    if (d.items && d.items.length > 0) {
      out += 'Items (' + d.items.length + '):\n';
      for (const item of d.items.slice(0, 10)) {
        out += '  ' + JSON.stringify(item).substring(0, 500) + '\n';
      }
    }
    if (d.type === 'opportunity' || d.type === 'table') {
      out += 'Type: ' + d.type + '\n';
    }
  }
}

// Also check LCP element
const lcp = data.audits['largest-contentful-paint-element'];
if (lcp) {
  out += '\n====== LCP ELEMENT DETAIL ======\n';
  out += JSON.stringify(lcp.details, null, 2).substring(0, 2000) + '\n';
}

fs.writeFileSync('c:\\Users\\alber\\Downloads\\Portfolio\\lighthouse_details.txt', out);
console.log('Done - details written');
