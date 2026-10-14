// Live contour lines for the founder plate: marching squares on a slowly changing noise field.
// This file runs in a worker (OffscreenCanvas) when the browser allows it, and on the main thread otherwise.

type Ctx = OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;

const GRID = 60;
const LEVELS = Array.from({ length: 16 }, (_, i) => 0.3 + i * 0.045);

// Smooth 3D value noise. Two inputs move over the plate. The third input is time.
const hash = (x: number, y: number, z: number) => {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(z, 1440662683);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};
const fade = (t: number) => t * t * (3 - 2 * t);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const noise = (x: number, y: number, z: number) => {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = fade(x - xi), yf = fade(y - yi), zf = fade(z - zi);
  const plane = (k: number) =>
    mix(mix(hash(xi, yi, zi + k), hash(xi + 1, yi, zi + k), xf), mix(hash(xi, yi + 1, zi + k), hash(xi + 1, yi + 1, zi + k), xf), yf);
  return mix(plane(0), plane(1), zf);
};

export function createPlate(ctx: Ctx) {
  const field = new Float32Array((GRID + 1) * (GRID + 1));
  const us = new Float32Array(GRID + 1);
  for (let i = 0; i <= GRID; i++) us[i] = (i / GRID) * 2 - 1;
  let size = 0, ratio = 1;

  const sample = (t: number) => {
    const breathe = 0.4 + 0.14 * Math.sin(t * 0.55);
    const t1 = t * 0.1, t2 = t * 0.14 + 5, t3 = t * 0.2 + 9;
    for (let j = 0; j <= GRID; j++) {
      const v = us[j];
      for (let i = 0; i <= GRID; i++) {
        const u = us[i];
        const terrain = noise(u * 1.5 + 3.1, v * 1.5 + 7.4, t1) * 0.55 + noise(u * 3 + 11, v * 3 + 2, t2) * 0.3 + noise(u * 6 + 4, v * 6 + 9, t3) * 0.15;
        field[j * (GRID + 1) + i] = terrain * 0.78 + Math.exp(-(u * u + v * v) / 0.3) * breathe;
      }
    }
  };

  const trace = (level: number, path: Path2D, cell: number) => {
    const row = GRID + 1;
    for (let j = 0; j < GRID; j++) {
      for (let i = 0; i < GRID; i++) {
        const o = j * row + i;
        const a = field[o], b = field[o + 1], c = field[o + row + 1], d = field[o + row];
        const index = (a > level ? 1 : 0) | (b > level ? 2 : 0) | (c > level ? 4 : 0) | (d > level ? 8 : 0);
        if (index === 0 || index === 15) continue;
        // Crossing points on the four sides of the cell, in cell units.
        const topX = i + (level - a) / (b - a), rightY = j + (level - b) / (c - b);
        const bottomX = i + (level - d) / (c - d), leftY = j + (level - a) / (d - a);
        const line = (x1: number, y1: number, x2: number, y2: number) => { path.moveTo(x1 * cell, y1 * cell); path.lineTo(x2 * cell, y2 * cell); };
        const tl = () => line(i, leftY, topX, j), tr = () => line(topX, j, i + 1, rightY), br = () => line(i + 1, rightY, bottomX, j + 1), bl = () => line(i, leftY, bottomX, j + 1);
        switch (index) {
          case 1: case 14: tl(); break;
          case 2: case 13: tr(); break;
          case 3: case 12: line(i, leftY, i + 1, rightY); break;
          case 4: case 11: br(); break;
          case 6: case 9: line(topX, j, bottomX, j + 1); break;
          case 7: case 8: bl(); break;
          default: {
            const centre = (a + b + c + d) / 4 > level;
            if (index === 5) { if (centre) { tr(); bl(); } else { tl(); br(); } }
            else if (centre) { tl(); br(); } else { tr(); bl(); }
          }
        }
      }
    }
  };

  return {
    resize(nextSize: number, nextRatio: number) { size = nextSize; ratio = nextRatio; },
    draw(t: number) {
      if (!size) return;
      sample(t);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, size, size);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const cell = size / GRID;
      LEVELS.forEach((level, index) => {
        const path = new Path2D();
        trace(level, path, cell);
        const major = index % 5 === 0;
        ctx.lineWidth = major ? 1.2 : 0.9;
        ctx.strokeStyle = major ? "rgba(23, 33, 43, 0.5)" : "rgba(23, 33, 43, 0.22)";
        ctx.stroke(path);
      });
    },
  };
}
