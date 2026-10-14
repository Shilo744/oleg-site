// Creates public/topo.svg: a decorative contour field for the site.
// The lines come from smooth noise. They are not real terrain data.
// The site uses the file as a CSS mask on dark sections.
// Run: node scripts/create-topo.mjs
import { writeFileSync } from "node:fs";

const W = 1600;
const H = 900;
const CELL = 10; // grid cell size in SVG units
const NX = Math.ceil(W / CELL);
const NY = Math.ceil(H / CELL);
const LEVELS = 26;
const MAJOR_EVERY = 5;

// Small seeded random generator, so the output is the same on every run.
let seed = 20260;
const random = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
};
const lattice = Array.from({ length: 64 * 64 }, random);
const at = (x, y) => lattice[(((y % 64) + 64) % 64) * 64 + (((x % 64) + 64) % 64)];
const smooth = (t) => t * t * (3 - 2 * t);
const noise = (x, y) => {
  const x0 = Math.floor(x), y0 = Math.floor(y);
  const fx = smooth(x - x0), fy = smooth(y - y0);
  const top = at(x0, y0) * (1 - fx) + at(x0 + 1, y0) * fx;
  const bottom = at(x0, y0 + 1) * (1 - fx) + at(x0 + 1, y0 + 1) * fx;
  return top * (1 - fy) + bottom * fy;
};
const fbm = (x, y) => {
  let sum = 0, amplitude = 1, total = 0, frequency = 1;
  for (let octave = 0; octave < 4; octave++) {
    sum += noise(x * frequency, y * frequency) * amplitude;
    total += amplitude;
    amplitude *= 0.5;
    frequency *= 2.05;
  }
  return sum / total;
};
const peaks = [[0.2, 0.3, 0.2], [0.78, 0.62, 0.26], [0.52, 0.08, 0.15], [0.95, 0.15, 0.14]];
const field = (gx, gy) => {
  const px = gx / NX, py = gy / NY;
  const warpX = fbm(px * 2.2 + 7, py * 2.2 + 3) * 0.55;
  const warpY = fbm(px * 2.2 + 19, py * 2.2 + 11) * 0.55;
  let value = fbm(px * 2.6 + warpX, py * 2.6 * (H / W) * 1.6 + warpY);
  for (const [cx, cy, radius] of peaks) {
    const d = Math.hypot((px - cx) * (W / H), py - cy) / radius;
    value += 0.38 * Math.exp(-d * d);
  }
  return value;
};

const values = [];
let low = Infinity, high = -Infinity;
for (let j = 0; j <= NY; j++) {
  for (let i = 0; i <= NX; i++) {
    const v = field(i, j);
    values.push(v);
    if (v < low) low = v;
    if (v > high) high = v;
  }
}
const value = (i, j) => values[j * (NX + 1) + i];

// Edge ids: horizontal edge (i,j)-(i+1,j) and vertical edge (i,j)-(i,j+1).
const hEdge = (i, j) => j * NX + i;
const vEdge = (i, j) => NX * (NY + 1) + j * (NX + 1) + i;
const cases = {
  1: [["L", "T"]], 14: [["L", "T"]],
  2: [["T", "R"]], 13: [["T", "R"]],
  4: [["R", "B"]], 11: [["R", "B"]],
  7: [["L", "B"]], 8: [["L", "B"]],
  3: [["L", "R"]], 12: [["L", "R"]],
  6: [["T", "B"]], 9: [["T", "B"]],
};

function contour(level) {
  const points = new Map();
  const segments = [];
  const cross = (id, x1, y1, v1, x2, y2, v2) => {
    if (!points.has(id)) {
      const t = (level - v1) / (v2 - v1);
      points.set(id, [(x1 + (x2 - x1) * t) * CELL, (y1 + (y2 - y1) * t) * CELL]);
    }
    return id;
  };
  for (let j = 0; j < NY; j++) {
    for (let i = 0; i < NX; i++) {
      const a = value(i, j), b = value(i + 1, j), c = value(i + 1, j + 1), d = value(i, j + 1);
      const index = (a > level ? 1 : 0) | (b > level ? 2 : 0) | (c > level ? 4 : 0) | (d > level ? 8 : 0);
      if (index === 0 || index === 15) continue;
      const edge = {
        T: () => cross(hEdge(i, j), i, j, a, i + 1, j, b),
        B: () => cross(hEdge(i, j + 1), i, j + 1, d, i + 1, j + 1, c),
        L: () => cross(vEdge(i, j), i, j, a, i, j + 1, d),
        R: () => cross(vEdge(i + 1, j), i + 1, j, b, i + 1, j + 1, c),
      };
      let pairs = cases[index];
      if (index === 5 || index === 10) {
        const centre = (a + b + c + d) / 4 > level;
        const aHigh = index === 5;
        pairs = centre === aHigh ? [["T", "R"], ["L", "B"]] : [["L", "T"], ["R", "B"]];
        if (index === 10) pairs = centre ? [["L", "T"], ["R", "B"]] : [["T", "R"], ["L", "B"]];
      }
      for (const [p, q] of pairs) segments.push([edge[p](), edge[q]()]);
    }
  }
  // Join the segments into long chains.
  const byEdge = new Map();
  segments.forEach(([p, q], n) => {
    for (const id of [p, q]) {
      if (!byEdge.has(id)) byEdge.set(id, []);
      byEdge.get(id).push(n);
    }
  });
  const used = new Set();
  const chains = [];
  const walk = (start, first) => {
    const chain = [start];
    let current = start, next = first;
    while (next !== undefined && !used.has(next)) {
      used.add(next);
      const [p, q] = segments[next];
      current = p === current ? q : p;
      chain.push(current);
      next = (byEdge.get(current) || []).find((n) => !used.has(n));
    }
    return chain;
  };
  for (let n = 0; n < segments.length; n++) {
    if (used.has(n)) continue;
    used.add(n);
    const [p, q] = segments[n];
    const forward = walk(q, (byEdge.get(q) || []).find((m) => !used.has(m)));
    const backward = walk(p, (byEdge.get(p) || []).find((m) => !used.has(m)));
    chains.push([...backward.reverse(), ...forward]);
  }
  return chains.map((chain) => chain.map((id) => points.get(id)));
}

// Draw each chain with quadratic curves through the midpoints, so the lines look smooth.
function toPath(chain) {
  if (chain.length < 4) return "";
  const r = (n) => Math.round(n);
  const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const start = mid(chain[0], chain[1]);
  let d = `M${r(start[0])} ${r(start[1])}`;
  for (let k = 1; k < chain.length - 1; k++) {
    const m = mid(chain[k], chain[k + 1]);
    d += `Q${r(chain[k][0])} ${r(chain[k][1])} ${r(m[0])} ${r(m[1])}`;
  }
  return d;
}

let minor = "", major = "";
for (let n = 1; n <= LEVELS; n++) {
  const level = low + ((high - low) * n) / (LEVELS + 1);
  const d = contour(level).map(toPath).join("");
  if (n % MAJOR_EVERY === 0) major += d; else minor += d;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
<g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round">
<path d="${minor}" stroke-opacity=".5" stroke-width="1" vector-effect="non-scaling-stroke"/>
<path d="${major}" stroke-opacity="1" stroke-width="1.5" vector-effect="non-scaling-stroke"/>
</g>
</svg>
`;
writeFileSync("public/topo.svg", svg);
console.log(`Wrote public/topo.svg (${(svg.length / 1024).toFixed(0)} KB)`);
