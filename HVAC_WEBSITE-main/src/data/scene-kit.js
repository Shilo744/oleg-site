// Drawing kit for the city models in the map lens. Stylised, not to scale.
// Each city is a small diorama on a 160 x 160 canvas, drawn in layers so the lens can move them at different speeds:
//   far (distant hills), mid (the town), near (the landmarks), ground (water or street), fx (sun, clouds, birds, smoke).
// The shapes are decoration. Colours come from CSS classes in cz-visuals.css.

let seed = 11;
export const setSeed = (value) => { seed = value; };
export const rnd = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};
export const n = (value) => Math.round(value * 10) / 10;
export const attr = (cls) => (cls ? ` class="${cls}"` : "");

export const rect = (x, y, w, h, cls = "") => `<rect${attr(cls)} x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}"/>`;
export const path = (d, cls = "") => `<path${attr(cls)} d="${d}"/>`;
export const circle = (cx, cy, r, cls = "") => `<circle${attr(cls)} cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}"/>`;
export const gable = (x, y, w, h) => path(`M${n(x)} ${n(y)}L${n(x + w / 2)} ${n(y - h)}L${n(x + w)} ${n(y)}Z`);
export const spire = (cx, y, h, w) => path(`M${n(cx - w / 2)} ${n(y)}L${n(cx)} ${n(y - h)}L${n(cx + w / 2)} ${n(y)}Z`);
export const dome = (cx, y, r) => path(`M${n(cx - r)} ${n(y)}A${n(r)} ${n(r)} 0 0 1 ${n(cx + r)} ${n(y)}Z`);
// An onion dome: a bulb that narrows to a point.
export const onion = (cx, y, r, h) => path(`M${n(cx - r)} ${n(y)}C${n(cx - r * 1.5)} ${n(y - h * 0.5)} ${n(cx - r * 0.3)} ${n(y - h * 0.6)} ${n(cx)} ${n(y - h)}C${n(cx + r * 0.3)} ${n(y - h * 0.6)} ${n(cx + r * 1.5)} ${n(y - h * 0.5)} ${n(cx + r)} ${n(y)}Z`);

// Small lit windows. Each gets its own delay so they twinkle one by one.
export const wins = (x, y, cols, rows, gx, gy, w = 1.7, h = 2.4) => {
  let out = "";
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      out += `<rect class="sc-win" x="${n(x + col * gx)}" y="${n(y + row * gy)}" width="${w}" height="${h}" style="--w:${(rnd() * 4).toFixed(2)}"/>`;
    }
  }
  return out;
};

// A row of houses with roofs. The heights change from house to house.
export const houses = (x0, x1, base, hMin, hMax) => {
  let out = "";
  let x = x0;
  while (x < x1) {
    const w = 6 + rnd() * 5;
    const h = hMin + rnd() * (hMax - hMin);
    out += rect(x, base - h, w, h);
    if (rnd() > 0.25) out += gable(x - 0.6, base - h, w + 1.2, 3 + rnd() * 3.5);
    x += w + rnd() * 1.2;
  }
  return out;
};

// A bridge with round arches. The deck is on top and the water runs below the arches.
export const bridge = (x1, x2, deckY, waterY, count) => {
  const step = (x2 - x1) / count;
  let d = `M${x1} ${deckY}H${x2}V${waterY + 2}H${x1}Z`;
  for (let i = 0; i < count; i++) {
    const a = x1 + i * step + 1.4, b = x1 + (i + 1) * step - 1.4;
    const spring = waterY - 3;
    d += `M${n(a)} ${waterY + 2}V${spring}A${n((b - a) / 2)} ${n(spring - deckY - 3.5)} 0 0 1 ${n(b)} ${spring}V${waterY + 2}Z`;
  }
  let posts = "";
  for (let x = x1 + 2; x < x2 - 1; x += 5) posts += rect(x, deckY - 2.6, 1, 2.6);
  return `<path class="sc-evenodd" d="${d}"/>${posts}`;
};

export const cloud = (x, y, scale = 1, speed = 30) =>
  `<g class="sc-cloud" style="--s:${speed}s;--x:${x}px"><ellipse cx="${x}" cy="${y}" rx="${n(10 * scale)}" ry="${n(3.2 * scale)}"/><ellipse cx="${n(x + 6 * scale)}" cy="${n(y - 2 * scale)}" rx="${n(6 * scale)}" ry="${n(3.4 * scale)}"/><ellipse cx="${n(x - 6 * scale)}" cy="${n(y - 1 * scale)}" rx="${n(5 * scale)}" ry="${n(2.6 * scale)}"/></g>`;
export const bird = (x, y, delay = 0) => `<path class="sc-bird" style="--d:${delay}s" d="M${x} ${y}q2.2-2.6 4.4 0q2.2-2.6 4.4 0"/>`;
export const waves = (rows) => rows.map(([x, y, w, d], i) => `<path class="sc-wave" style="--d:${d ?? i * 0.5}s" d="M${x} ${y}h${w}"/>`).join("");
export const smoke = (x, y, delay = 0, rise = 22) => `<path class="sc-smoke" style="--d:${delay}s" d="M${x} ${y}c-3-${rise * 0.3} 3-${rise * 0.5} 0-${rise * 0.7}s3-${rise * 0.3} 0-${rise * 0.3}"/>`;
export const layer = (name, body) => `<g class="sc-${name}">${body}</g>`;
export const WATER = rect(0, 118, 160, 42);
export const STREET = rect(0, 118, 160, 42);


// Put the five layers together. The lens moves them at different speeds.
export const build = (parts) => ({ scene: layer("far", parts.far) + layer("mid", parts.mid) + layer("near", parts.near) + layer("ground", parts.ground) + layer("fx", parts.fx) });
