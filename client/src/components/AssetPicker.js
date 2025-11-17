// Enhanced asset picker with distinct selection support

const ASSETS = import.meta.glob("../assets/**/*.{svg,png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
  query: "?url",
});
const ENTRIES = Object.entries(ASSETS);

export function pickAsset(keywords = [], exclude = []) {
  const ex = new Set(exclude);
  const lowers = (keywords || []).map((k) => String(k).toLowerCase());
  const scored = ENTRIES.map(([path, url]) => {
    const p = path.toLowerCase();
    const score = lowers.reduce((s, k) => s + (p.includes(k) ? 1 : 0), 0);
    return { path, url, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => (b.score - a.score) || (a.path.length - b.path.length));
  const hit = scored.find((r) => !ex.has(r.url));
  return hit?.url;
}

export function pickDistinctAssets(keywordSets = [], options = {}) {
  const { prefer = [], fallbackPool = [] } = options;
  const used = new Set();
  const out = [];
  for (const keys of keywordSets) {
    const primary = pickAsset([...prefer, ...(keys || [])], used);
    if (primary) {
      out.push(primary);
      used.add(primary);
      continue;
    }
    const secondary = pickAsset(keys || [], used);
    if (secondary) {
      out.push(secondary);
      used.add(secondary);
      continue;
    }
    const fallback = pickAsset(
      (fallbackPool.length ? fallbackPool : ["education", "guide", "infographic", "library", "class", "book"]),
      used
    );
    out.push(fallback);
    if (fallback) used.add(fallback);
  }
  return out;
}