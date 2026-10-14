// Build-time helpers that make SVG path data smaller.
// compactPath turns absolute "M x,y L x,y ..." data into relative "m x y l dx dy ..." data
// and drops points that lie within a small distance of the line between their neighbours.

const num = (value) => {
  let text = (Math.round(value * 10) / 10).toString();
  if (text === "-0") text = "0";
  return text.replace(/^(-?)0\./, "$1.");
};

// Join numbers with the shortest valid separator: a minus sign or a leading "." needs no space.
const join = (values) => {
  let out = "";
  for (const value of values) {
    const text = num(value);
    if (out && !text.startsWith("-") && !(text.startsWith(".") && /\.\d*$/.test(out))) out += " ";
    out += text;
  }
  return out;
};

// Douglas-Peucker line simplification, without recursion depth problems.
function simplify(points, tolerance) {
  if (points.length < 3) return points;
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  const limit = tolerance * tolerance;
  while (stack.length) {
    const [from, to] = stack.pop();
    const [x1, y1] = points[from], [x2, y2] = points[to];
    const dx = x2 - x1, dy = y2 - y1, lengthSquared = dx * dx + dy * dy;
    let far = -1, index = -1;
    for (let i = from + 1; i < to; i++) {
      const [x, y] = points[i];
      let t = lengthSquared ? ((x - x1) * dx + (y - y1) * dy) / lengthSquared : 0;
      t = Math.max(0, Math.min(1, t));
      const ex = x - (x1 + t * dx), ey = y - (y1 + t * dy);
      const distanceSquared = ex * ex + ey * ey;
      if (distanceSquared > far) { far = distanceSquared; index = i; }
    }
    if (far > limit) { keep[index] = 1; stack.push([from, index], [index, to]); }
  }
  return points.filter((_, i) => keep[i]);
}

export function compactPath(d, tolerance = 0.08) {
  let out = "";
  for (const part of d.split("M")) {
    if (!part) continue;
    const closed = part.includes("Z");
    const numbers = part.replace("Z", "").match(/-?\d*\.?\d+/g)?.map(Number) ?? [];
    let points = [];
    for (let i = 0; i + 1 < numbers.length; i += 2) points.push([numbers[i], numbers[i + 1]]);
    if (points.length < 2) continue;
    points = simplify(points, tolerance);
    // Move to the first point, then relative line segments. Rounding is carried, so error never builds up.
    let px = Math.round(points[0][0] * 10) / 10, py = Math.round(points[0][1] * 10) / 10;
    out += "M" + join([px, py]) + "l";
    const deltas = [];
    for (let i = 1; i < points.length; i++) {
      const x = Math.round(points[i][0] * 10) / 10, y = Math.round(points[i][1] * 10) / 10;
      deltas.push(x - px, y - py);
      px = x; py = y;
    }
    out += join(deltas) + (closed ? "z" : "");
  }
  return out;
}

// Quadratic curve path with relative integer coordinates: "M x y q dx1 dy1 dx dy ...".
export function quadPath(chains) {
  let out = "";
  for (const chain of chains) {
    if (chain.length < 4) continue;
    const mid = (p, q) => [Math.round((p[0] + q[0]) / 2), Math.round((p[1] + q[1]) / 2)];
    const start = mid(chain[0], chain[1]);
    let [cx, cy] = start;
    out += `M${start[0]} ${start[1]}q`;
    const values = [];
    for (let k = 1; k < chain.length - 1; k++) {
      const control = [Math.round(chain[k][0]), Math.round(chain[k][1])];
      const end = mid(chain[k], chain[k + 1]);
      values.push(control[0] - cx, control[1] - cy, end[0] - cx, end[1] - cy);
      cx = end[0]; cy = end[1];
    }
    out += join(values.map((v) => v));
  }
  return out;
}
