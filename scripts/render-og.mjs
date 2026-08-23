import sharp from "sharp";
import { fileURLToPath } from "node:url";

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FAFCFB"/><stop offset="1" stop-color="#E7F7F0"/></linearGradient>
    <radialGradient id="glow"><stop stop-color="#B9E8D3" stop-opacity=".8"/><stop offset="1" stop-color="#B9E8D3" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1030" cy="90" r="350" fill="url(#glow)"/>
  <g opacity=".48" fill="#D8E2E8">${Array.from({ length: 24 }, (_, row) => Array.from({ length: 46 }, (_, col) => `<circle cx="${34 + col * 26}" cy="${24 + row * 26}" r="1.4"/>`).join("")).join("")}</g>
  <rect x="70" y="65" width="1060" height="500" rx="34" fill="#FFFFFF" stroke="#D8E2E8" stroke-width="2"/>
  <g transform="translate(116 110)">
    <rect width="50" height="50" rx="15" fill="#064E33"/>
    <path d="M14 25h22M25 14v22" stroke="#B9E8D3" stroke-width="4" stroke-linecap="round"/>
    <text x="68" y="37" font-family="Segoe UI, Arial, sans-serif" font-size="33" font-weight="800" fill="#0A1A2B">GetHired</text>
  </g>
  <rect x="116" y="202" width="300" height="39" rx="19.5" fill="#E7F7F0" stroke="#B9E8D3"/>
  <circle cx="139" cy="221.5" r="5" fill="#0F9D63"/>
  <text x="154" y="228" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#064E33">PRIVATE EARLY ACCESS · NO CARD</text>
  <text x="116" y="304" font-family="Segoe UI, Arial, sans-serif" font-size="52" font-weight="800" fill="#0A1A2B">Practise before</text>
  <text x="116" y="366" font-family="Segoe UI, Arial, sans-serif" font-size="52" font-weight="800" fill="#064E33">the opportunity counts.</text>
  <text x="116" y="415" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#5C7086">Choose your priority and help shape practical job-search tools.</text>
  <g font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700">
    <rect x="116" y="459" width="112" height="42" rx="21" fill="#064E33"/><text x="151" y="486" fill="#FFFFFF">BUILD</text>
    <rect x="240" y="459" width="112" height="42" rx="21" fill="#F3F7F5" stroke="#D8E2E8"/><text x="276" y="486" fill="#24384C">APPLY</text>
    <rect x="364" y="459" width="120" height="42" rx="21" fill="#F3F7F5" stroke="#D8E2E8"/><text x="394" y="486" fill="#24384C">SWITCH</text>
    <rect x="496" y="459" width="148" height="42" rx="21" fill="#F3F7F5" stroke="#D8E2E8"/><text x="526" y="486" fill="#24384C">INTERVIEW</text>
  </g>
  <text x="1084" y="518" text-anchor="end" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#0A7A4C">gethired.info</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ quality: 92 }).toFile(fileURLToPath(new URL("../public/og.png", import.meta.url)));

