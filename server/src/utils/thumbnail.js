// Generates beautiful self-contained SVG thumbnails so the app never depends on external image hosts.
const palettes = {
  'nova-landing': ['#6366f1', '#a855f7', '#ec4899'],
  'pulse-analytics': ['#06b6d4', '#3b82f6', '#8b5cf6'],
  'cart-studio': ['#f59e0b', '#f97316', '#ef4444'],
  'folio-minimal': ['#10b981', '#14b8a6', '#06b6d4'],
  'inkwell-blog': ['#f43f5e', '#d946ef', '#8b5cf6'],
  'orbit-admin': ['#3b82f6', '#6366f1', '#7c3aed'],
  'launchpad-waitlist': ['#22c55e', '#84cc16', '#eab308'],
  'bazaar-market': ['#fb7185', '#f97316', '#facc15'],
  'lens-gallery': ['#38bdf8', '#818cf8', '#c084fc'],
  'chronicle-magazine': ['#f472b6', '#fb923c', '#fbbf24'],
};

const layouts = {
  'nova-landing': (c) => `
    <rect x="60" y="84" width="170" height="14" rx="7" fill="#fff" fill-opacity=".9"/>
    <rect x="60" y="108" width="240" height="14" rx="7" fill="#fff" fill-opacity=".9"/>
    <rect x="60" y="136" width="200" height="8" rx="4" fill="#fff" fill-opacity=".45"/>
    <rect x="60" y="154" width="170" height="8" rx="4" fill="#fff" fill-opacity=".45"/>
    <rect x="60" y="180" width="86" height="28" rx="14" fill="#fff"/>
    <rect x="154" y="180" width="86" height="28" rx="14" fill="#fff" fill-opacity=".25"/>
    <rect x="330" y="84" width="150" height="150" rx="18" fill="#fff" fill-opacity=".18"/>
    <circle cx="405" cy="159" r="42" fill="#fff" fill-opacity=".35"/>`,
  'pulse-analytics': () => `
    <rect x="60" y="84" width="100" height="52" rx="12" fill="#fff" fill-opacity=".22"/>
    <rect x="172" y="84" width="100" height="52" rx="12" fill="#fff" fill-opacity=".22"/>
    <rect x="284" y="84" width="100" height="52" rx="12" fill="#fff" fill-opacity=".22"/>
    <rect x="396" y="84" width="84" height="52" rx="12" fill="#fff" fill-opacity=".22"/>
    <rect x="60" y="148" width="420" height="92" rx="14" fill="#fff" fill-opacity=".15"/>
    <polyline points="76,222 130,196 180,208 240,172 300,190 360,160 420,176 466,158" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
  'cart-studio': () => `
    ${[0, 1, 2, 3]
      .map(
        (i) => `<rect x="${60 + i * 106}" y="84" width="94" height="108" rx="14" fill="#fff" fill-opacity="${0.2 + i * 0.05}"/>
    <rect x="${68 + i * 106}" y="202" width="62" height="8" rx="4" fill="#fff" fill-opacity=".8"/>
    <rect x="${68 + i * 106}" y="218" width="38" height="8" rx="4" fill="#fff" fill-opacity=".45"/>`
      )
      .join('')}`,
  'folio-minimal': () => `
    <circle cx="96" cy="118" r="34" fill="#fff" fill-opacity=".85"/>
    <rect x="148" y="98" width="180" height="14" rx="7" fill="#fff" fill-opacity=".9"/>
    <rect x="148" y="122" width="130" height="9" rx="4.5" fill="#fff" fill-opacity=".5"/>
    <rect x="60" y="176" width="130" height="64" rx="12" fill="#fff" fill-opacity=".2"/>
    <rect x="202" y="176" width="130" height="64" rx="12" fill="#fff" fill-opacity=".2"/>
    <rect x="344" y="176" width="136" height="64" rx="12" fill="#fff" fill-opacity=".2"/>`,
  'inkwell-blog': () => `
    <rect x="60" y="86" width="260" height="16" rx="8" fill="#fff" fill-opacity=".92"/>
    <rect x="60" y="112" width="200" height="16" rx="8" fill="#fff" fill-opacity=".92"/>
    ${[0, 1, 2, 3, 4]
      .map((i) => `<rect x="60" y="${148 + i * 16}" width="${260 - (i % 2) * 40}" height="7" rx="3.5" fill="#fff" fill-opacity=".42"/>`)
      .join('')}
    <rect x="350" y="86" width="130" height="150" rx="16" fill="#fff" fill-opacity=".2"/>`,
  'orbit-admin': () => `
    <rect x="60" y="84" width="76" height="156" rx="14" fill="#fff" fill-opacity=".2"/>
    ${[0, 1, 2, 3, 4]
      .map((i) => `<rect x="74" y="${100 + i * 26}" width="48" height="9" rx="4.5" fill="#fff" fill-opacity="${i === 0 ? 0.95 : 0.45}"/>`)
      .join('')}
    <rect x="148" y="84" width="332" height="156" rx="14" fill="#fff" fill-opacity=".16"/>
    ${[0, 1, 2, 3, 4]
      .map((i) => `<rect x="164" y="${100 + i * 28}" width="300" height="16" rx="8" fill="#fff" fill-opacity="${i === 0 ? 0.4 : 0.2}"/>`)
      .join('')}`,
  'launchpad-waitlist': () => `
    <rect x="150" y="86" width="240" height="16" rx="8" fill="#fff" fill-opacity=".92"/>
    <rect x="180" y="112" width="180" height="9" rx="4.5" fill="#fff" fill-opacity=".5"/>
    ${[0, 1, 2, 3]
      .map((i) => `<rect x="${130 + i * 70}" y="140" width="58" height="46" rx="12" fill="#fff" fill-opacity=".24"/>`)
      .join('')}
    <rect x="150" y="208" width="170" height="30" rx="15" fill="#fff" fill-opacity=".28"/>
    <rect x="328" y="208" width="62" height="30" rx="15" fill="#fff"/>`,
  'bazaar-market': () => `
    <rect x="60" y="84" width="420" height="30" rx="15" fill="#fff" fill-opacity=".25"/>
    ${[0, 1, 2, 3, 4, 5]
      .map(
        (i) => `<rect x="${60 + (i % 3) * 144}" y="${128 + Math.floor(i / 3) * 62}" width="132" height="52" rx="12" fill="#fff" fill-opacity="${0.16 + (i % 3) * 0.06}"/>`
      )
      .join('')}`,
  'lens-gallery': () => `
    <rect x="60" y="84" width="130" height="100" rx="12" fill="#fff" fill-opacity=".28"/>
    <rect x="202" y="84" width="130" height="64" rx="12" fill="#fff" fill-opacity=".2"/>
    <rect x="344" y="84" width="136" height="156" rx="12" fill="#fff" fill-opacity=".24"/>
    <rect x="60" y="196" width="130" height="44" rx="12" fill="#fff" fill-opacity=".18"/>
    <rect x="202" y="160" width="130" height="80" rx="12" fill="#fff" fill-opacity=".3"/>`,
  'chronicle-magazine': () => `
    <rect x="60" y="84" width="250" height="156" rx="14" fill="#fff" fill-opacity=".26"/>
    <rect x="76" y="188" width="170" height="14" rx="7" fill="#fff" fill-opacity=".95"/>
    <rect x="76" y="210" width="120" height="8" rx="4" fill="#fff" fill-opacity=".55"/>
    <rect x="324" y="84" width="156" height="72" rx="12" fill="#fff" fill-opacity=".2"/>
    <rect x="324" y="168" width="156" height="72" rx="12" fill="#fff" fill-opacity=".2"/>`,
};

function buildThumbnail(slug) {
  const colors = palettes[slug];
  if (!colors) return null;
  const [c1, c2, c3] = colors;
  const body = layouts[slug](colors);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 320" width="540" height="320" role="img" aria-label="${slug} preview">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/><stop offset=".55" stop-color="${c2}"/><stop offset="1" stop-color="${c3}"/>
    </linearGradient>
    <radialGradient id="glow" cx=".85" cy=".1" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="540" height="320" fill="url(#bg)"/>
  <rect width="540" height="320" fill="url(#glow)"/>
  <rect x="24" y="24" width="492" height="272" rx="22" fill="#0b1020" fill-opacity=".28" stroke="#fff" stroke-opacity=".25"/>
  <circle cx="48" cy="48" r="5" fill="#fff" fill-opacity=".8"/><circle cx="66" cy="48" r="5" fill="#fff" fill-opacity=".5"/><circle cx="84" cy="48" r="5" fill="#fff" fill-opacity=".3"/>
  <rect x="190" y="40" width="160" height="16" rx="8" fill="#fff" fill-opacity=".18"/>
  ${body}
</svg>`;
}

module.exports = { buildThumbnail };
