// scripts/import-from-csv.mjs
// No external deps. Parses RFC4180-ish CSV with quotes/commas/newlines.
import fs from 'node:fs';
import path from 'node:path';

const INPUT = process.argv[2] || 'data/products.csv';
const OUTDIR = path.join(process.cwd(), 'content', 'products');

if (!fs.existsSync(INPUT)) {
  console.error(`CSV not found: ${INPUT}`);
  process.exit(1);
}
fs.mkdirSync(OUTDIR, { recursive: true });

function parseCSV(text) {
  const rows = [];
  let cur = [], field = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else { inQ = false; }
      } else field += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ',') { cur.push(field); field = ''; }
      else if (c === '\n') { cur.push(field); rows.push(cur); cur = []; field = ''; }
      else if (c === '\r') { /* ignore */ }
      else field += c;
    }
  }
  if (field.length || cur.length) { cur.push(field); rows.push(cur); }
  return rows;
}

const toArr = (v) => (Array.isArray(v) ? v : String(v ?? '')
  .split(',').map((s) => s.trim()).filter(Boolean));

const slugify = (s) => String(s).toLowerCase().trim()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const asInt = (v) => {
  if (v === '' || v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : null;
};

const asBool = (v) => {
  if (typeof v === 'boolean') return v;
  const s = String(v || '').trim().toLowerCase();
  if (s === '') return undefined;
  return ['1', 'true', 'yes', 'y'].includes(s);
};

// Read + parse with normalized newlines
const raw = fs.readFileSync(INPUT, 'utf8').replace(/\r\n?/g, '\n');
const rows = parseCSV(raw);
if (rows.length === 0) { console.error('CSV is empty'); process.exit(1); }

// Headers (by name, case-sensitive)
const headers = rows[0].map((h) => h.trim());
const idx = Object.fromEntries(headers.map((h, i) => [h, i]));
for (const req of ['name','priceZAR','category','size','images']) {
  if (!(req in idx)) { console.error(`Missing required header: ${req}`); process.exit(1); }
}

const seen = new Set();
for (let r = 1; r < rows.length; r++) {
  const row = rows[r];
  if (!row || row.every((c) => String(c ?? '').trim() === '')) continue;

  const get = (k) => row[idx[k]] ?? '';
  const name = String(get('name')).trim();
  if (!name) { console.error(`Row ${r+1} missing "name"`); process.exit(1); }

  const slug = (String(get('slug')).trim()) || slugify(name);
  if (seen.has(slug)) { console.error(`Duplicate slug: ${slug} (row ${r+1})`); process.exit(1); }
  seen.add(slug);

  const product = {
    id: String(get('id') || slug),
    name,
    slug,
    priceZAR: Number(get('priceZAR') ?? 0),
    category: String(get('category')) === 'bath-salt' ? 'bath-salt' : 'bath-bomb',
    size: String(get('size') ?? ''),
    scentNotes: toArr(get('scentNotes')),
    tags: toArr(get('tags')),
    images: toArr(get('images')),
    description: String(get('description') ?? ''),
    whatsappSku: String(get('whatsappSku') || slug),
    stock: asInt(get('stock')),        // null if blank
    active: asBool(get('active')),     // undefined if blank => treated as active in loader
  };

  const out = path.join(OUTDIR, `${slug}.json`);
  fs.writeFileSync(out, JSON.stringify(product, null, 2), 'utf8');
  console.log('Wrote', out);
}

console.log(`Done. Processed ${rows.length - 1} product(s).`);
