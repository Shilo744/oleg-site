// City models for the UK map lens, part A: Inverness, Aberdeen, Dundee, Glasgow, Edinburgh, Newcastle, Carlisle, York, Leeds, Liverpool, Manchester, Sheffield.
// Stylised, not to scale. Each city is a small diorama in layers: far, mid, near, ground, fx.
import { n, setSeed, rect, path, circle, gable, spire, dome, wins, houses, bridge, cloud, bird, waves, smoke, WATER, STREET, build } from "./scene-kit.js";

// Battlement teeth along a top edge.
const crenel = (x, y, w, h = 2) => {
  let out = "";
  for (let cx = x; cx <= x + w - 2; cx += 3.6) out += rect(cx, y - h, 2, h);
  return out;
};
// A row of small pinnacles along a roof line.
const pins = (x0, x1, y, h = 5, step = 5) => {
  let out = "";
  for (let x = x0; x <= x1; x += step) out += spire(x, y, h, 2.2);
  return out;
};
// A steel arch (quadratic) with hangers down to the deck where the arch is above it.
const archSpan = (x0, x1, yBase, peak, deckY, step = 6) => {
  const yc = 2 * peak - yBase;
  let out = path(`M${x0} ${yBase}Q${n((x0 + x1) / 2)} ${n(yc)} ${x1} ${yBase}`, "sc-frame");
  for (let x = x0 + step; x < x1 - step + 0.1; x += step) {
    const t = (x - x0) / (x1 - x0);
    const y = yBase + 2 * t * (1 - t) * (yc - yBase);
    if (y < deckY - 1) out += path(`M${n(x)} ${n(y)}V${deckY}`, "sc-pipe");
  }
  return out;
};
const streetWaves = (rows) => waves(rows).replaceAll("sc-wave", "sc-street");

// ---------------------------------------------------------------- Inverness
const inverness = () => {
  setSeed(1101);
  const far =
    path("M0 96C14 82 26 86 40 78S66 84 84 72 112 80 132 70 152 80 160 84V122H0Z") +
    path("M0 108C20 100 44 106 70 102S120 98 160 104V122H0Z");
  const mid =
    houses(54, 104, 120, 8, 16) + houses(104, 160, 120, 8, 14) +
    // the Town House tower
    rect(100, 74, 6, 46) + spire(103, 74, 14, 8) + rect(101.4, 66, 3.2, 8);
  let cables = "";
  for (let x = 112; x < 146; x += 5) cables += path(`M${x} ${n(86 + 36 * ((x - 107.3) / 40) * (1 - (x - 107.3) / 40))}V110`, "sc-pipe");
  const near =
    // castle above the river Ness
    path("M0 120V98C6 92 12 88 20 86H50C54 94 56 106 58 120Z") +
    rect(10, 64, 38, 24) + rect(6, 52, 10, 18) + rect(42, 48, 10, 22) + crenel(6, 52, 10) + crenel(42, 48, 10) + crenel(18, 64, 24) +
    rect(46.4, 36, 0.9, 12) + path("M47.3 36L54 38.6L47.3 41Z") +
    wins(13, 70, 7, 2, 4.8, 8, 1.8, 3.2) + wins(8, 56, 2, 2, 5, 6, 1.4, 2.6) + wins(44, 53, 2, 3, 5, 5, 1.4, 2.6) +
    // St Andrew's cathedral: a nave and two short spires
    rect(64, 84, 36, 34) + path("M64 84L82 74L100 84Z") + rect(64, 62, 9, 24) + rect(91, 62, 9, 24) + spire(68.5, 62, 15, 9) + spire(95.5, 62, 15, 9) +
    wins(67, 92, 6, 2, 5, 9, 1.6, 5) + wins(66, 68, 2, 3, 5, 5, 1.4, 2.6) + wins(93, 68, 2, 3, 5, 5, 1.4, 2.6) +
    path("M79 118V104A3 5 0 0 1 85 104V118Z", "sc-arch") +
    // a footbridge on slim towers
    rect(105.8, 86, 2.6, 33) + rect(146, 86, 2.6, 33) + rect(98, 110, 60, 2.2) +
    path("M107.3 86Q127.3 104 147.3 86M107.3 86L98 109M147.3 86L158 109", "sc-pipe") + cables;
  const ground = WATER + waves([[8, 126, 22], [44, 132, 32], [92, 127, 24, 1], [124, 136, 28, 1.4], [20, 144, 28, 0.7], [76, 148, 34, 1.8]]);
  const fx = circle(136, 32, 6, "sc-sun") + circle(136, 32, 11, "sc-glow") + cloud(40, 28, 1, 36) + cloud(104, 50, 0.6, 46) + bird(74, 34) + bird(86, 28, 0.8);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Aberdeen
const aberdeen = () => {
  setSeed(1102);
  const far = path("M0 104C24 98 50 102 76 98S124 94 160 100V122H0Z") + rect(60, 90, 1.2, 14);
  const mid = rect(100, 72, 9, 48) + rect(112, 80, 8, 40) + houses(122, 134, 120, 10, 20) + houses(0, 6, 120, 8, 14) + rect(36, 82, 8, 38) + spire(40, 82, 14, 9);
  const near =
    // Marischal College: a long granite front with a tower, turrets and many pinnacles
    rect(48, 78, 62, 40) + pins(50, 108, 78, 6, 4.4) + rect(72, 56, 16, 24) + spire(80, 56, 22, 12) + pins(72, 88, 56, 5, 4) +
    rect(46, 68, 7, 12) + spire(49.5, 68, 9, 7) + rect(105, 68, 7, 12) + spire(108.5, 68, 9, 7) +
    wins(52, 84, 12, 3, 4.6, 9, 1.6, 5) + wins(75, 62, 3, 2, 4, 6, 1.4, 3) + path("M77 118V106A3 5 0 0 1 83 106V118Z", "sc-arch") +
    // harbour cranes and containers
    path("M6 118L16 88L26 118M16 88H44M16 88L30 78H44M41 88V104", "sc-frame") + rect(11, 83, 10, 6) + path("M10 106H22", "sc-pipe") +
    rect(30, 108, 10, 10) + rect(31.4, 111, 7.2, 1.4, "sc-band") + rect(0, 108, 8, 10) + rect(1.4, 112, 5.2, 1.4, "sc-band") +
    // the lighthouse on its rock
    path("M130 120Q146 106 160 120Z") + path("M139 118L141.5 90H146.5L149 118Z") + rect(138, 87, 12, 2.6) + rect(141, 76, 6, 11) + spire(144, 76, 6, 9) +
    rect(142.6, 80, 2.8, 4, "sc-arch");
  const ground = WATER + waves([[10, 126, 24], [48, 132, 30], [94, 127, 26, 1], [128, 136, 26, 1.4], [24, 144, 30, 0.7], [80, 148, 32, 1.8]]);
  const fx = circle(30, 34, 6, "sc-sun") + circle(30, 34, 11, "sc-glow") + cloud(96, 26, 1, 38) + cloud(120, 46, 0.6, 50) + bird(60, 32) + bird(72, 38, 0.7) + bird(108, 36, 1.2);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Dundee
const dundee = () => {
  setSeed(1103);
  const far = path("M0 120V86C10 72 24 68 36 74S54 96 66 120Z") + rect(27, 58, 2, 14) + path("M24 72H32L28 62Z") + path("M92 108C112 98 134 102 160 98V122H92Z");
  let piers = "";
  for (let x = 74; x < 160; x += 11) piers += rect(x, 102, 1.6, 17);
  const mid = rect(68, 100, 92, 2.6) + piers + houses(0, 40, 120, 8, 14) + rect(44, 80, 7, 40) + spire(47.5, 80, 12, 8);
  const near =
    // V&A Dundee: two angled stone volumes, layered like cliff strata
    path("M42 118L46 82L74 86L80 118Z") + path("M74 118L78 94L102 98L108 118Z") +
    path("M44 96L76.5 100L77 102L43.6 98Z", "sc-band") + path("M43 106L78.6 110L79 112L42.6 108Z", "sc-band") + path("M45 90L75.4 93.5L75.6 95.5L44.6 92Z", "sc-band") +
    path("M77 104L103 107.6L103.4 109.6L76.6 106Z", "sc-band") + path("M76 112L106 115.6L106.4 117.4L75.6 114Z", "sc-band") +
    wins(50, 100, 4, 1, 6, 4, 2.4, 2) + wins(82, 102, 3, 1, 6, 4, 2.4, 2) +
    // the RRS Discovery with her three masts
    path("M108 119L113 105H150L154 119Z") + rect(120, 70, 1.6, 36) + rect(130, 76, 1.6, 30) + rect(140, 82, 1.6, 24) + rect(122.4, 94, 4.4, 11) +
    path("M114 82H128M123 88H137M133 92H147M120.8 70L110 105M120.8 70L146 105", "sc-pipe") + rect(113, 105, 36, 1.4, "sc-band") + wins(117, 110, 6, 1, 5, 4, 2, 2);
  const ground = WATER + waves([[8, 126, 22], [46, 132, 32], [96, 127, 24, 1], [126, 136, 26, 1.4], [18, 144, 30, 0.7], [76, 148, 34, 1.8]]);
  const fx = circle(114, 32, 6, "sc-sun") + circle(114, 32, 11, "sc-glow") + cloud(40, 26, 1, 36) + cloud(96, 50, 0.6, 48) + bird(70, 34) + bird(82, 28, 0.8);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Glasgow
const glasgow = () => {
  setSeed(1104);
  const far = path("M0 104C20 98 44 102 70 98S118 90 160 98V122H0Z");
  const mid =
    // the University tower on its hill
    path("M110 120C122 98 138 92 160 100V120Z") + rect(120, 84, 34, 18) + rect(135, 46, 10, 46) + spire(140, 46, 22, 10) +
    rect(133, 54, 2.4, 8) + rect(145.6, 54, 2.4, 8) + wins(122, 88, 6, 1, 5.4, 4, 2, 3) +
    // the Armadillo: overlapping shells
    path("M66 118Q68 98 78 96Q88 98 90 118Z") + path("M82 118Q86 94 98 92Q110 96 112 118Z") + path("M102 118Q106 102 116 100Q124 102 126 118Z") +
    houses(0, 14, 120, 8, 14);
  const near =
    // the Finnieston Crane
    rect(24, 72, 7, 46) + path("M12 66H66L62 73H31V79H24V73H12Z") + rect(8, 64, 8, 10) + rect(60, 73, 1.2, 24) + rect(58.6, 97, 4, 3) +
    path("M24 118L31 96M31 118L24 96M24 96L31 78M31 96L24 78", "sc-pipe") +
    // the Clyde Arc
    path("M70 112Q106 52 142 112M73 112Q106 60 139 112", "sc-frame") + rect(62, 110, 88, 2.4) + rect(68, 112, 3, 7) + rect(141, 112, 3, 7);
  let hangers = "";
  for (let x = 79; x < 135; x += 6) {
    const t = (x - 70) / 72;
    hangers += path(`M${x} ${n(112 - 2 * t * (1 - t) * 120 * 0.5 * 1.0)}V110`, "sc-pipe");
  }
  const ground = WATER + waves([[8, 126, 24], [46, 132, 32], [96, 127, 24, 1], [126, 136, 26, 1.4], [18, 144, 30, 0.7], [76, 148, 34, 1.8]]);
  const fx = circle(96, 30, 6, "sc-sun") + circle(96, 30, 11, "sc-glow") + cloud(30, 30, 1, 38) + cloud(130, 26, 0.7, 46) + bird(54, 44) + bird(66, 38, 0.7);
  return { far, mid, near: near + hangers, ground, fx };
};

// ---------------------------------------------------------------- Edinburgh
const edinburgh = () => {
  setSeed(1105);
  const far = path("M56 120L96 82Q108 70 122 76L138 90L160 104V120Z") + path("M0 108C20 102 40 106 56 102V122H0Z");
  const mid =
    // the Old Town ridge with the crown of St Giles
    houses(60, 160, 120, 16, 30) +
    rect(120, 56, 9, 44) + spire(124.5, 52, 18, 3) + spire(121, 58, 9, 2.2) + spire(128, 58, 9, 2.2) + rect(121.4, 52, 6.2, 6);
  const near =
    // the castle on its rock
    path("M0 120V86L8 74L14 70L20 60H46L52 56H68L74 66L80 84L88 120Z") +
    rect(20, 44, 46, 18) + rect(28, 30, 10, 16) + crenel(28, 30, 10) + rect(52, 48, 16, 8) + crenel(52, 48, 16) + rect(46, 36, 6, 10) + path("M45 36L49 31L53 36Z") +
    rect(60, 36, 0.9, 12) + path("M60.9 36L67 38.2L60.9 40.4Z") + wins(24, 50, 8, 1, 5, 4, 1.8, 3) + wins(30, 34, 2, 2, 4, 5, 1.4, 2.6) +
    // the Scott Monument
    rect(94, 100, 16, 18) + path("M96 100L97 74H103L104 100Z") + spire(100, 74, 36, 5) + spire(95.4, 88, 12, 2.4) + spire(104.6, 88, 12, 2.4) +
    rect(95, 82, 10, 2.4, "sc-band") + rect(96, 92, 8, 2, "sc-band") + path("M97 118V108A3 4 0 0 1 103 108V118Z", "sc-arch");
  const ground = STREET + path("M0 128H160M0 142H160", "sc-road") + streetWaves([[10, 134, 18, 0], [60, 134, 24, 0.8], [110, 134, 20, 1.6], [30, 148, 30, 0.4], [96, 148, 28, 1.2]]);
  const fx = circle(80, 26, 6, "sc-sun") + circle(80, 26, 11, "sc-glow") + cloud(30, 22, 1, 40) + cloud(130, 36, 0.6, 52) + bird(62, 42) + bird(74, 46, 0.8) + bird(116, 30);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Newcastle
const newcastle = () => {
  setSeed(1106);
  const far = path("M0 106C24 100 52 104 80 100S130 96 160 102V122H0Z");
  const mid =
    houses(60, 108, 120, 8, 16) +
    // the Baltic flour mill
    rect(10, 78, 28, 40) + rect(8, 76, 32, 3) + wins(13, 84, 6, 4, 4.4, 8, 2, 4) +
    // St Nicholas cathedral: the lantern tower with its open crown
    rect(52, 68, 12, 50) + rect(50, 64, 16, 4) + spire(58, 58, 16, 3) + spire(51.4, 64, 9, 2.2) + spire(64.6, 64, 9, 2.2) + rect(54, 60, 8, 4);
  const near =
    // the Tyne Bridge: a steel arch between two stone towers
    rect(10, 80, 12, 38) + rect(106, 80, 12, 38) + rect(8, 76, 16, 5) + rect(104, 76, 16, 5) + rect(12, 94, 8, 1.6, "sc-band") + rect(108, 94, 8, 1.6, "sc-band") +
    rect(22, 96, 84, 2.6) + archSpan(22, 106, 118, 50, 98) + path("M22 118Q64 54 106 118", "sc-frame") +
    // the Sage: a curved shell
    path("M122 118Q124 98 138 92Q152 96 158 118Z") + path("M128 118Q132 102 142 98M138 118Q142 104 150 102", "sc-pipe") +
    path("M114 118Q114 108 120 106Q126 108 128 118Z") + wins(132, 106, 3, 1, 5, 4, 2.4, 2.4);
  const ground = WATER + waves([[8, 126, 22], [46, 132, 32], [96, 127, 24, 1], [126, 136, 26, 1.4], [18, 144, 30, 0.7], [76, 148, 34, 1.8]]);
  const fx = circle(40, 34, 6, "sc-sun") + circle(40, 34, 11, "sc-glow") + cloud(94, 26, 1, 38) + cloud(132, 44, 0.6, 50) + bird(70, 38) + bird(82, 32, 0.7);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Carlisle
const carlisle = () => {
  setSeed(1107);
  const far = path("M0 100C30 90 60 96 90 88S140 84 160 92V122H0Z") + path("M0 110C24 104 52 108 82 104S130 102 160 106V122H0Z");
  const mid = houses(0, 12, 120, 8, 14) + houses(44, 112, 120, 8, 14) + rect(0, 112, 160, 6);
  const near =
    // the red sandstone castle keep on its rise
    path("M0 120V100C8 94 14 90 22 88H44C48 96 50 108 52 120Z") +
    rect(12, 68, 28, 22) + rect(10, 62, 8, 12) + crenel(10, 62, 8) + crenel(12, 68, 28) + rect(34, 58, 8, 12) + crenel(34, 58, 8) + rect(25.6, 52, 0.9, 16) + path("M26.5 52L33 54.2L26.5 56.4Z") +
    wins(16, 74, 5, 2, 4.6, 8, 1.4, 3.4) +
    // the cathedral: a long nave with a square tower
    rect(52, 90, 48, 28) + path("M52 90L76 82L100 90Z") + rect(64, 70, 14, 22) + crenel(64, 70, 14) + pins(64, 78, 70, 5, 6) +
    wins(56, 96, 8, 2, 5, 9, 1.6, 5) + path("M68 118V104A3 5 0 0 1 74 104V118Z", "sc-arch") +
    // the Citadel: two drum towers and a gate
    rect(112, 78, 12, 40) + rect(138, 78, 12, 40) + crenel(112, 78, 12) + crenel(138, 78, 12) + rect(124, 88, 14, 30) + crenel(124, 88, 14) +
    path("M127 118V104A4 5 0 0 1 135 104V118Z", "sc-arch") + wins(115, 84, 2, 4, 4, 8, 1.4, 3) + wins(141, 84, 2, 4, 4, 8, 1.4, 3);
  const ground = WATER + waves([[8, 126, 24], [46, 132, 30], [94, 127, 26, 1], [128, 136, 26, 1.4], [22, 144, 30, 0.7], [78, 148, 34, 1.8]]);
  const fx = circle(130, 36, 6, "sc-sun") + circle(130, 36, 11, "sc-glow") + cloud(38, 28, 1, 38) + cloud(90, 48, 0.6, 50) + bird(62, 34) + bird(74, 40, 0.8);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- York
const york = () => {
  setSeed(1108);
  const far = path("M0 108C24 102 52 106 80 102S130 98 160 104V122H0Z");
  const mid = houses(0, 160, 120, 8, 18);
  const near =
    // the Minster: two west towers, a great central tower and a long nave
    rect(14, 84, 82, 34) + rect(16, 54, 12, 34) + rect(34, 54, 12, 34) + pins(16, 28, 54, 6, 5.2) + pins(34, 46, 54, 6, 5.2) +
    rect(54, 46, 20, 40) + crenel(54, 46, 20) + pins(54, 74, 46, 7, 6.6) + path("M46 84L70 76L96 84Z") +
    wins(18, 92, 16, 2, 4.8, 9, 1.8, 6) + wins(18, 60, 2, 3, 4, 8, 1.6, 4) + wins(36, 60, 2, 3, 4, 8, 1.6, 4) + wins(58, 52, 3, 3, 5, 9, 2, 5) +
    path("M29 118V104A3 4 0 0 1 35 104V118Z", "sc-arch") +
    // Clifford's Tower on its mound, a gate and the city wall
    path("M92 120Q112 86 132 120Z") + rect(103, 90, 18, 14) + crenel(103, 90, 18) + wins(107, 94, 3, 1, 5, 4, 2, 3) +
    rect(132, 102, 28, 16) + crenel(132, 102, 28) + rect(138, 88, 12, 30) + crenel(138, 88, 12) + path("M141 118V106A3 5 0 0 1 147 106V118Z", "sc-arch");
  const ground = STREET + path("M0 128H160M0 142H160", "sc-road") + streetWaves([[10, 134, 18, 0], [60, 134, 24, 0.8], [110, 134, 20, 1.6], [30, 148, 30, 0.4], [96, 148, 28, 1.2]]);
  const fx = circle(124, 30, 6, "sc-sun") + circle(124, 30, 11, "sc-glow") + cloud(36, 24, 1, 38) + cloud(96, 44, 0.7, 48) + bird(60, 30) + bird(72, 36, 0.7);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Leeds
const leeds = () => {
  setSeed(1109);
  const far = path("M0 104C24 98 52 102 80 98S130 94 160 100V122H0Z");
  const mid =
    houses(0, 18, 120, 8, 14) +
    // the Corn Exchange dome and a tall modern tower
    path("M120 118V106Q120 94 134 92Q148 94 148 106V118Z") + rect(130, 84, 8, 4) + path("M150 118V56L158 46V118Z");
  const near =
    // the Town Hall: a portico, a clock tower and a dome
    rect(20, 88, 66, 30) + path("M36 90L53 80L70 90Z") + rect(45, 52, 16, 38) + circle(53, 62, 4.4, "sc-wheel") + rect(46, 42, 14, 10) + dome(53, 42, 8) + rect(51.6, 28, 2.8, 6) + spire(53, 28, 8, 3.4) +
    rect(38, 94, 1.6, 24, "sc-band") + rect(44, 94, 1.6, 24, "sc-band") + rect(50, 94, 1.6, 24, "sc-band") + rect(56, 94, 1.6, 24, "sc-band") + rect(62, 94, 1.6, 24, "sc-band") +
    wins(22, 94, 3, 2, 5.2, 10, 2, 4) + wins(72, 94, 3, 2, 4.4, 10, 2, 4) +
    // the Civic Hall: twin towers
    rect(92, 66, 8, 52) + rect(108, 66, 8, 52) + spire(96, 66, 12, 10) + spire(112, 66, 12, 10) + circle(96, 50, 1.8) + circle(112, 50, 1.8) +
    rect(98, 98, 12, 20) + wins(93, 72, 2, 5, 3.4, 8, 1.4, 4) + wins(109, 72, 2, 5, 3.4, 8, 1.4, 4);
  const ground = STREET + path("M0 128H160M0 142H160", "sc-road") + streetWaves([[10, 134, 18, 0], [60, 134, 24, 0.8], [110, 134, 20, 1.6], [30, 148, 30, 0.4], [96, 148, 28, 1.2]]);
  const fx = circle(136, 30, 6, "sc-sun") + circle(136, 30, 11, "sc-glow") + cloud(32, 26, 1, 38) + cloud(88, 38, 0.6, 50) + bird(64, 30) + bird(76, 36, 0.8);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Liverpool
const liverpool = () => {
  setSeed(1110);
  const far = path("M0 104C24 98 52 102 80 98S130 94 160 100V122H0Z");
  const mid =
    // the Cunard Building with a low dome, a ferry, and Radio City tower
    rect(6, 88, 40, 30) + dome(26, 88, 8) + wins(9, 94, 8, 3, 4.6, 8, 2, 4) +
    rect(147, 44, 2.4, 76) + rect(143.4, 62, 9.6, 6) + rect(146.4, 36, 1, 8) +
    path("M104 118L108 112H132L136 118Z") + rect(116, 104, 4, 8);
  const near =
    // the Royal Liver Building: a centre block and two clock towers topped with domes and birds
    rect(54, 76, 48, 42) + rect(54, 48, 13, 30) + rect(89, 48, 13, 30) + circle(60.5, 60, 4.4, "sc-wheel") + circle(95.5, 60, 4.4, "sc-wheel") +
    dome(60.5, 48, 8) + dome(95.5, 48, 8) + rect(59.8, 36, 1.4, 6) + rect(94.8, 36, 1.4, 6) + circle(60.5, 34, 1.8) + circle(95.5, 34, 1.8) +
    path("M72 76L78 66L84 76Z") + wins(58, 82, 8, 3, 5, 9, 2, 4.6) + path("M75 118V104A3 5 0 0 1 81 104V118Z", "sc-arch") +
    // the Metropolitan Cathedral with its cone crown
    rect(112, 92, 28, 26) + path("M110 92L126 56L142 92Z") + spire(126, 56, 10, 3) + path("M126 56L116 92M126 56L136 92M126 56V92", "sc-pipe") + wins(116, 100, 5, 2, 4.6, 9, 2, 5);
  const ground = WATER + waves([[8, 126, 24], [46, 132, 30], [94, 127, 26, 1], [128, 136, 26, 1.4], [22, 144, 30, 0.7], [78, 148, 34, 1.8]]);
  const fx = circle(30, 34, 6, "sc-sun") + circle(30, 34, 11, "sc-glow") + cloud(100, 24, 1, 38) + cloud(132, 46, 0.6, 50) + bird(70, 28) + bird(82, 34, 0.7) + bird(116, 38, 1.2);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Manchester
const manchester = () => {
  setSeed(1111);
  const far = path("M0 104C24 98 52 102 80 98S130 94 160 100V122H0Z");
  const mid =
    // the Central Library: a portico under a low dome
    rect(76, 96, 28, 22) + rect(78, 98, 1.6, 20, "sc-band") + rect(84, 98, 1.6, 20, "sc-band") + rect(90, 98, 1.6, 20, "sc-band") + rect(96, 98, 1.6, 20, "sc-band") +
    dome(90, 96, 11) + rect(88.6, 82, 2.8, 4) +
    houses(0, 14, 120, 8, 14);
  const near =
    // the Town Hall: gables and a tall clock tower with a spire
    rect(18, 86, 56, 32) + gable(20, 86, 14, 8) + gable(58, 86, 14, 8) + rect(38, 54, 11, 34) + circle(43.5, 64, 4, "sc-wheel") + spire(43.5, 54, 24, 8) +
    rect(36, 60, 2.4, 8) + rect(49.6, 60, 2.4, 8) + wins(22, 92, 4, 2, 5, 10, 2, 5) + wins(54, 92, 4, 2, 4.4, 10, 2, 5) +
    // the Cathedral tower
    rect(106, 84, 12, 34) + crenel(106, 84, 12) + pins(106, 118, 84, 5, 5.6) + wins(108, 90, 2, 3, 4.4, 9, 1.6, 4) +
    // the Beetham Tower: a slim glass blade with an overhanging top
    rect(124, 30, 9, 88) + rect(121, 30, 15, 9) + wins(125.4, 43, 3, 8, 2.8, 9, 1.4, 6) + rect(128, 20, 1, 10) +
    // a tram, its wire and a pole
    path("M0 76H160", "sc-wire") + rect(144, 76, 1, 42) + rect(138, 106, 18, 10) + rect(137, 104, 20, 2.4) + wins(140, 108, 4, 1, 4, 3, 2.4, 3);
  const ground = STREET + path("M0 128H160M0 142H160", "sc-road") + path("M0 124H160", "sc-road") + streetWaves([[10, 134, 18, 0], [60, 134, 24, 0.8], [110, 134, 20, 1.6], [30, 148, 30, 0.4], [96, 148, 28, 1.2]]);
  const fx = circle(100, 28, 6, "sc-sun") + circle(100, 28, 11, "sc-glow") + cloud(32, 28, 1, 38) + cloud(76, 44, 0.6, 50) + bird(56, 34) + bird(68, 28, 0.8);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Sheffield
const sheffield = () => {
  setSeed(1112);
  const far = path("M0 98C20 88 44 96 70 90S120 84 160 94V122H0Z");
  const mid =
    // Park Hill: long terraces stepping down the hill, and the cathedral spire
    rect(96, 76, 14, 42) + rect(110, 82, 14, 36) + rect(124, 88, 14, 30) + rect(138, 94, 20, 24) +
    wins(98, 80, 3, 5, 4, 7, 2, 3) + wins(112, 86, 3, 4, 4, 7, 2, 3) + wins(126, 92, 3, 3, 4, 7, 2, 3) + wins(140, 98, 4, 2, 4.4, 7, 2, 3) +
    rect(84, 76, 8, 42) + spire(88, 76, 34, 6);
  const near =
    // the Winter Garden: a glass house of arches
    path("M8 118V108Q8 88 30 86Q52 88 52 108V118Z") + path("M12 118V108Q12 94 20 94Q27 94 27 108V118Z", "sc-arch") + path("M33 118V108Q33 94 40 94Q48 94 48 108V118Z", "sc-arch") + rect(6, 116, 48, 3) +
    // the Arts Tower: a tall block with bands of windows
    rect(60, 28, 16, 90) + rect(58, 24, 20, 5) + rect(66.6, 10, 1, 14) + wins(62.4, 34, 4, 12, 3.4, 7, 1.8, 3.8) +
    // a steelworks chimney
    rect(138, 56, 5, 64) + rect(138, 66, 5, 3, "sc-band") + rect(138, 80, 5, 3, "sc-band") + circle(140.5, 110, 7, "sc-furnace");
  const ground = STREET + path("M0 128H160M0 142H160", "sc-road") + streetWaves([[10, 134, 18, 0], [60, 134, 24, 0.8], [110, 134, 20, 1.6], [30, 148, 30, 0.4], [96, 148, 28, 1.2]]);
  const fx = circle(30, 30, 6, "sc-sun") + circle(30, 30, 11, "sc-glow") + smoke(140.5, 56, 0.4, 20) + cloud(96, 24, 1, 40) + cloud(126, 44, 0.6, 50) + bird(46, 40) + bird(58, 34, 0.8);
  return { far, mid, near, ground, fx };
};

export const ukScenesA = {
  Inverness: build(inverness()),
  Aberdeen: build(aberdeen()),
  Dundee: build(dundee()),
  Glasgow: build(glasgow()),
  Edinburgh: build(edinburgh()),
  Newcastle: build(newcastle()),
  Carlisle: build(carlisle()),
  York: build(york()),
  Leeds: build(leeds()),
  Liverpool: build(liverpool()),
  Manchester: build(manchester()),
  Sheffield: build(sheffield()),
};
