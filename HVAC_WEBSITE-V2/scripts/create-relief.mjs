// Builds the terrain data for a map: src/data/<market>-contours.json (vector contour lines).
//
// It reads ground height from the public Terrarium terrain tiles
// (https://registry.opendata.aws/terrain-tiles/), then draws a hill-shade with soft,
// muted colours. The image covers the map viewBox exactly.
// This runs by hand. The website itself never calls the tile server.
//
// Usage: node scripts/create-relief.mjs <cz|uk|de> [tile-cache-folder]
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

// Each entry must match map.viewBox and map.projection for that market in src/data/markets.js.
// first, step and max are contour heights in metres.
const MARKETS = {
  cz: { view: { x: 6, y: 22, w: 624, h: 356 }, toLonLat: (x, y) => [(x - 20) / 87 + 12, 51.2 - (y - 15) / 135], zoom: 9, first: 300, step: 150, max: 1600 },
  uk: { view: { x: 0, y: 0, w: 470, h: 655 }, toLonLat: (x, y) => [(x - 30) / 39 - 8.8, 59.7 - (y - 15) / 65], zoom: 8, first: 200, step: 100, max: 1300 },
  de: { view: { x: 0, y: 0, w: 490, h: 655 }, toLonLat: (x, y) => [(x - 15) / 48 + 5.5, 55.3 - (y - 15) / 78], zoom: 8, first: 500, step: 250, max: 2800 },
};
const marketId = process.argv[2] || "cz";
const config = MARKETS[marketId];
if (!config) throw new Error("Unknown market. Use cz, uk or de.");
const cacheDir = process.argv[3];
const VIEW = config.view;
const toLonLat = config.toLonLat;
const SCALE = 2;
const OUT_W = VIEW.w * SCALE;
const OUT_H = VIEW.h * SCALE;
const ZOOM = config.zoom;

// ---------- PNG decode (8-bit RGB or RGBA, no interlace) ----------
function decodePng(buffer) {
  let offset = 8, width = 0, height = 0, colorType = 0;
  const data = [];
  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const body = buffer.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") { width = body.readUInt32BE(0); height = body.readUInt32BE(4); colorType = body[9]; }
    if (type === "IDAT") data.push(body);
    offset += length + 12;
  }
  const bpp = colorType === 6 ? 4 : 3;
  const raw = zlib.inflateSync(Buffer.concat(data));
  const stride = width * bpp;
  const out = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    for (let i = 0; i < stride; i++) {
      const x = raw[y * (stride + 1) + 1 + i];
      const a = i >= bpp ? out[y * stride + i - bpp] : 0;
      const b = y > 0 ? out[(y - 1) * stride + i] : 0;
      const c = i >= bpp && y > 0 ? out[(y - 1) * stride + i - bpp] : 0;
      let value;
      if (filter === 0) value = x;
      else if (filter === 1) value = x + a;
      else if (filter === 2) value = x + b;
      else if (filter === 3) value = x + ((a + b) >> 1);
      else {
        const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        value = x + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
      }
      out[y * stride + i] = value & 255;
    }
  }
  return { width, height, bpp, pixels: out };
}

// ---------- Tiles ----------
const n = 2 ** ZOOM;
const mercatorX = (lon) => ((lon + 180) / 360) * n * 256;
const mercatorY = (lat) => {
  const r = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n * 256;
};
const corners = [toLonLat(VIEW.x, VIEW.y), toLonLat(VIEW.x + VIEW.w, VIEW.y + VIEW.h)];
const x0 = Math.floor(mercatorX(corners[0][0]) / 256) - 1, x1 = Math.floor(mercatorX(corners[1][0]) / 256) + 1;
const y0 = Math.floor(mercatorY(corners[0][1]) / 256) - 1, y1 = Math.floor(mercatorY(corners[1][1]) / 256) + 1;

const tiles = new Map();
for (let ty = y0; ty <= y1; ty++) {
  for (let tx = x0; tx <= x1; tx++) {
    const file = cacheDir ? path.join(cacheDir, `${ZOOM}-${tx}-${ty}.png`) : null;
    let buffer;
    if (file && fs.existsSync(file)) buffer = fs.readFileSync(file);
    else {
      const response = await fetch(`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${ZOOM}/${tx}/${ty}.png`);
      if (!response.ok) throw new Error(`Tile ${tx}/${ty} failed: ${response.status}`);
      buffer = Buffer.from(await response.arrayBuffer());
      if (file) { fs.mkdirSync(cacheDir, { recursive: true }); fs.writeFileSync(file, buffer); }
    }
    tiles.set(`${tx}/${ty}`, decodePng(buffer));
  }
  process.stdout.write(`row ${ty - y0 + 1}/${y1 - y0 + 1}\n`);
}
// Terrarium encoding: height in metres = R * 256 + G + B / 256 - 32768
const pixelHeight = (px, py) => {
  const tile = tiles.get(`${Math.floor(px / 256)}/${Math.floor(py / 256)}`);
  if (!tile) return 0;
  const o = ((py % 256) * 256 + (px % 256)) * tile.bpp;
  return tile.pixels[o] * 256 + tile.pixels[o + 1] + tile.pixels[o + 2] / 256 - 32768;
};
const heightAt = (lon, lat) => {
  const fx = mercatorX(lon) - 0.5, fy = mercatorY(lat) - 0.5;
  const ix = Math.floor(fx), iy = Math.floor(fy), tx = fx - ix, ty = fy - iy;
  const a = pixelHeight(ix, iy), b = pixelHeight(ix + 1, iy), c = pixelHeight(ix, iy + 1), d = pixelHeight(ix + 1, iy + 1);
  return a * (1 - tx) * (1 - ty) + b * tx * (1 - ty) + c * (1 - tx) * ty + d * tx * ty;
};

// ---------- Height field at output size, lightly smoothed ----------
const field = new Float32Array(OUT_W * OUT_H);
for (let y = 0; y < OUT_H; y++) {
  for (let x = 0; x < OUT_W; x++) {
    const [lon, lat] = toLonLat(VIEW.x + (x + 0.5) / SCALE, VIEW.y + (y + 0.5) / SCALE);
    field[y * OUT_W + x] = Math.max(heightAt(lon, lat), 0);
  }
}
const blur = (source, passes) => {
  let current = source;
  for (let pass = 0; pass < passes; pass++) {
    const next = new Float32Array(current.length);
    for (let y = 0; y < OUT_H; y++) for (let x = 0; x < OUT_W; x++) {
      let sum = 0, count = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const xx = x + dx, yy = y + dy;
        if (xx < 0 || yy < 0 || xx >= OUT_W || yy >= OUT_H) continue;
        sum += current[yy * OUT_W + xx]; count++;
      }
      next[y * OUT_W + x] = sum / count;
    }
    current = next;
  }
  return current;
};

// ---------- Colour ----------
// Brand colours only: near-white paper in the valleys, cool slate on the high ground,
// and shadows that lean toward the Atlas navy (#17212b).
const smooth = (t) => { const c = Math.min(Math.max(t, 0), 1); return c * c * (3 - 2 * c); };
const NAVY = [38, 52, 68];
const lerpColour = (from, to, t) => from.map((v, i) => v + (to[i] - v) * t);

const metresPerPixelX = (111320 * Math.cos((49.8 * Math.PI) / 180)) / 87 / SCALE;
const metresPerPixelY = 111320 / 135 / SCALE;

// "detail": sharp ridges, shown inside the magnifier only.
// The map on the page uses calm vector contour lines instead (src/data/<market>-contours.json).
const styles = {
  detail: {
    file: "public/cz-relief-detail.png",
    blurPasses: 3,
    exaggeration: 3,
    low: [250, 251, 251], high: [228, 233, 238], lowAt: 200, highAt: 1600,
    shadowStrength: 0.7, shadowMax: 0.3, litSpread: 0.9, minShade: 0.76, maxShade: 1.08,
  },
};

const lights = [
  { vector: [-0.62, -0.62, 0.48], weight: 0.75 }, // main light, from the north-west
  { vector: [0.7, -0.2, 0.69], weight: 0.25 }, // faint fill from the east
];

const crcTable = Array.from({ length: 256 }, (_, k) => {
  let c = k;
  for (let bit = 0; bit < 8; bit++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buffer) => {
  let c = 0xffffffff;
  for (const byte of buffer) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const body = Buffer.concat([Buffer.from(type), data]);
  const out = Buffer.alloc(body.length + 8);
  out.writeUInt32BE(data.length, 0);
  body.copy(out, 4);
  out.writeUInt32BE(crc32(body), body.length + 4);
  return out;
};
const encodePng = (raw) => {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(OUT_W, 0);
  header.writeUInt32BE(OUT_H, 4);
  header[8] = 8; // bit depth
  header[9] = 6; // RGBA
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", header),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
};

// ---------- Contour lines (vector) ----------
const LEVEL_STEP = config.step;
const MAJOR_EVERY = 3;
const smoothField = blur(field, 70);
const grid = (i, j) => smoothField[Math.min(j * SCALE, OUT_H - 1) * OUT_W + Math.min(i * SCALE, OUT_W - 1)];
const GW = VIEW.w, GH = VIEW.h;
const crossing = (level, v1, v2) => (v1 === v2 ? 0.5 : (level - v1) / (v2 - v1));
const SEGMENTS = {
  1: [["l", "b"]], 2: [["b", "r"]], 3: [["l", "r"]], 4: [["t", "r"]], 5: [["l", "t"], ["b", "r"]], 6: [["t", "b"]], 7: [["l", "t"]],
  8: [["l", "t"]], 9: [["t", "b"]], 10: [["t", "r"], ["l", "b"]], 11: [["t", "r"]], 12: [["l", "r"]], 13: [["b", "r"]], 14: [["l", "b"]],
};
function contourPaths(level) {
  const nodes = new Map(); // id -> { x, y, next: [] }
  const node = (id, x, y) => { if (!nodes.has(id)) nodes.set(id, { id, x, y, next: [] }); return nodes.get(id); };
  for (let j = 0; j < GH - 1; j++) {
    for (let i = 0; i < GW - 1; i++) {
      const tl = grid(i, j), tr = grid(i + 1, j), br = grid(i + 1, j + 1), bl = grid(i, j + 1);
      const code = (tl >= level ? 8 : 0) | (tr >= level ? 4 : 0) | (br >= level ? 2 : 0) | (bl >= level ? 1 : 0);
      for (const [from, to] of SEGMENTS[code] || []) {
        const point = (edge) => {
          if (edge === "t") return node(`h${i},${j}`, i + crossing(level, tl, tr), j);
          if (edge === "b") return node(`h${i},${j + 1}`, i + crossing(level, bl, br), j + 1);
          if (edge === "l") return node(`v${i},${j}`, i, j + crossing(level, tl, bl));
          return node(`v${i + 1},${j}`, i + 1, j + crossing(level, tr, br));
        };
        const p = point(from), q = point(to);
        p.next.push(q); q.next.push(p);
      }
    }
  }
  const seen = new Set();
  const chains = [];
  const walk = (start) => {
    const chain = [start];
    seen.add(start.id);
    let current = start;
    for (;;) {
      const next = current.next.find((n) => !seen.has(n.id));
      if (!next) break;
      seen.add(next.id); chain.push(next); current = next;
    }
    return chain;
  };
  for (const n of nodes.values()) if (n.next.length === 1 && !seen.has(n.id)) chains.push(walk(n)); // open lines first
  for (const n of nodes.values()) if (!seen.has(n.id)) chains.push(walk(n)); // then closed loops
  return chains.filter((chain) => chain.length > 60).map((chain) => chain.map((n) => [VIEW.x + n.x, VIEW.y + n.y]));
}
const chaikin = (points, passes = 2) => {
  let current = points;
  for (let pass = 0; pass < passes; pass++) {
    const next = [current[0]];
    for (let i = 0; i < current.length - 1; i++) {
      const [x1, y1] = current[i], [x2, y2] = current[i + 1];
      next.push([x1 * 0.75 + x2 * 0.25, y1 * 0.75 + y2 * 0.25], [x1 * 0.25 + x2 * 0.75, y1 * 0.25 + y2 * 0.75]);
    }
    next.push(current.at(-1));
    current = next;
  }
  return current;
};
const thin = (points) => points.filter((_, i) => i % 4 === 0 || i === points.length - 1);
const toPath = (lines) => lines.map((line) => "M" + chaikin(thin(line)).map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join("L")).join("");
const contours = { minor: "", major: "" };
for (let level = config.first; level <= config.max; level += LEVEL_STEP) {
  const key = (level / LEVEL_STEP) % MAJOR_EVERY === 0 ? "major" : "minor";
  contours[key] += toPath(contourPaths(level));
}
const outFile = `src/data/${marketId}-contours.json`;
fs.writeFileSync(outFile, JSON.stringify(contours));
console.log(`${outFile} ${((contours.minor.length + contours.major.length) / 1024).toFixed(0)} KB`);

// The sharp hill-shade image is not used on the page now. Set WRITE_IMAGES to true to make it again.
const WRITE_IMAGES = false;
for (const [name, style] of Object.entries(WRITE_IMAGES ? styles : {})) {
  const heights = blur(field, style.blurPasses);
  const at = (x, y) => heights[Math.min(Math.max(y, 0), OUT_H - 1) * OUT_W + Math.min(Math.max(x, 0), OUT_W - 1)];
  const raw = Buffer.alloc((OUT_W * 4 + 1) * OUT_H);
  for (let y = 0; y < OUT_H; y++) {
    raw[y * (OUT_W * 4 + 1)] = 0;
    for (let x = 0; x < OUT_W; x++) {
      const h = at(x, y);
      const dzdx = ((at(x + 1, y) - at(x - 1, y)) / 2 / metresPerPixelX) * style.exaggeration;
      const dzdy = ((at(x, y + 1) - at(x, y - 1)) / 2 / metresPerPixelY) * style.exaggeration;
      const normalLength = Math.hypot(dzdx, dzdy, 1);
      let lit = 0;
      for (const { vector, weight } of lights) {
        lit += weight * Math.max(0, (-dzdx * vector[0] - dzdy * vector[1] + vector[2]) / (normalLength * Math.hypot(...vector)));
      }
      const shade = Math.min(style.maxShade, Math.max(style.minShade, 1 + (lit - 0.66) * style.litSpread));
      const base = lerpColour(style.low, style.high, smooth((h - style.lowAt) / (style.highAt - style.lowAt)));
      const dark = Math.min(style.shadowMax, Math.max(0, 1 - shade) * 2.2 * style.shadowStrength);
      const o = y * (OUT_W * 4 + 1) + 1 + x * 4;
      for (let i = 0; i < 3; i++) raw[o + i] = Math.min(255, (base[i] + (NAVY[i] - base[i]) * dark) * Math.min(1.02, 0.9 + shade * 0.1));
      raw[o + 3] = 255;
    }
  }
  const png = encodePng(raw);
  fs.writeFileSync(style.file, png);
  console.log(`${style.file} ${OUT_W}x${OUT_H}, ${(png.length / 1024).toFixed(0)} KB`);
}
