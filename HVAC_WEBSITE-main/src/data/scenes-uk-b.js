// City models for the UK map lens, part B. Stylised, not to scale.
// Each city is a small diorama in layers: far, mid, near, ground, fx. Colours come from CSS classes in visuals.css.
import { setSeed, rect, path, circle, gable, spire, dome, wins, houses, bridge, cloud, bird, waves, smoke, WATER, STREET, build } from "./scene-kit.js";

// Little squares along a roof line (battlements).
const crenel = (x, y, w, step = 3.2, h = 2) => {
  let out = "";
  for (let cx = x; cx + 1.6 <= x + w; cx += step) out += rect(cx, y - h, 1.6, h);
  return out;
};

// ---------------------------------------------------------------- Nottingham
const nottingham = () => {
  setSeed(6001);
  const far = path("M0 108C24 100 48 104 74 100S122 96 160 102V122H0Z") + rect(112, 82, 1.5, 18) + path("M109 100L113 82L117 100Z");
  const mid = houses(112, 160, 108, 6, 12) + houses(62, 76, 120, 8, 14);
  const near =
    // The castle on its sandstone rock
    path("M0 120V92C8 86 16 82 24 80H58C62 92 66 106 70 120Z") +
    rect(8, 68, 50, 12) + crenel(8, 68, 50) + rect(8, 58, 10, 10) + rect(46, 58, 10, 10) + crenel(8, 58, 10) + crenel(46, 58, 10) +
    rect(28, 48, 14, 20) + crenel(28, 48, 14) + rect(34.5, 36, 0.9, 12) + path("M35.4 36L41 38.4L35.4 40.6Z") +
    wins(12, 71, 8, 1, 5.4, 5, 2, 3) + wins(31, 53, 2, 2, 6, 7, 2, 3.4) +
    // The Council House: columns, a pediment and a tall dome with a clock
    rect(74, 114, 40, 6) + rect(77, 92, 34, 22) + gable(75, 92, 38, 8) + wins(80, 95, 7, 1, 4.2, 0, 1.3, 17) +
    rect(85, 78, 18, 14) + dome(94, 78, 9) + rect(92.8, 60, 2.4, 8) + spire(94, 60, 7, 3.4) + circle(94, 85, 3.4, "sc-wheel") +
    rect(70, 113, 5, 5) + rect(113, 113, 5, 5) +
    // Trent Bridge
    bridge(112, 160, 110, 118, 4) + rect(132, 100, 1, 10) + rect(148, 100, 1, 10);
  const ground = WATER + waves([[8, 128, 22], [44, 134, 30], [92, 127, 24, 1], [124, 136, 28, 1.4], [20, 144, 30, 0.7], [76, 148, 34, 1.8]]);
  const fx = circle(130, 34, 6, "sc-sun") + circle(130, 34, 11, "sc-glow") + cloud(36, 24, 1, 36) + cloud(84, 40, 0.7, 46) + bird(60, 30) + bird(72, 25, 0.7);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Birmingham
const birmingham = () => {
  setSeed(6002);
  const far = rect(0, 84, 8, 36) + rect(10, 92, 10, 28) + rect(100, 96, 8, 24) + rect(142, 86, 10, 34) + path("M0 106C30 102 60 106 90 102S140 100 160 104V122H0Z");
  const mid = houses(0, 16, 120, 10, 22) + rect(36, 80, 10, 40) + rect(48, 90, 8, 30) + houses(126, 134, 120, 10, 16);
  let discs = "";
  for (let y = 91.4; y < 116; y += 5.2) for (let x = 55.4; x < 96; x += 5.2) {
    const inside = y > 98 || (x > 56 && x < 92 && y > 92);
    if (inside) discs += circle(x, y, 1.3, "sc-wheel");
  }
  const near =
    // The Rotunda: a round tower with bands
    rect(18, 48, 16, 72) + rect(16.6, 44, 18.8, 5) + rect(24, 34, 4, 10) + rect(24.8, 28, 1.6, 6) +
    rect(18, 70, 16, 2.4, "sc-band") + rect(18, 96, 16, 2.4, "sc-band") + wins(20, 54, 4, 4, 3.6, 4.6, 1.6, 2.4) + wins(20, 76, 4, 4, 3.6, 4.6, 1.6, 2.4) +
    // Selfridges: a curved building covered in discs
    path("M50 120V98C50 90 62 84 74 84S98 90 98 98V120Z") + discs +
    // The Library: stacked boxes with round windows
    rect(104, 96, 24, 24) + rect(107, 84, 18, 12) + rect(110, 74, 12, 10) + circle(116, 108, 3.6, "sc-wheel") + circle(116, 90, 2.8, "sc-wheel") + circle(116, 79, 2.2, "sc-wheel") +
    // BT Tower with its dishes
    rect(133, 40, 4, 80) + rect(130, 62, 10, 7) + rect(131, 76, 8, 5) + rect(134.2, 26, 1.6, 14) + wins(133.6, 48, 1, 4, 0, 4.6, 1.2, 2.4) +
    // a small canal bridge
    bridge(34, 50, 110, 118, 2);
  const ground = WATER + waves([[8, 128, 24], [46, 134, 28, 0.6], [92, 128, 24, 1], [124, 138, 26, 1.4], [20, 146, 30, 0.7], [72, 150, 32, 1.8]]);
  const fx = circle(66, 34, 6, "sc-sun") + circle(66, 34, 11, "sc-glow") + cloud(100, 24, 1, 38) + cloud(24, 56, 0.6, 50) + bird(78, 30) + bird(90, 36, 0.8);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Leicester
const leicester = () => {
  setSeed(6003);
  const far = path("M0 106C20 100 44 104 66 100S114 96 138 100 154 98 160 102V122H0Z");
  const mid = houses(0, 160, 120, 8, 16);
  const near =
    // The National Space Centre rocket tower
    path("M22 120V62C22 46 28 38 31 28C34 38 40 46 40 62V120Z") + path("M26 60V120M31 52V120M36 60V120", "sc-pipe") + rect(30.4, 14, 1.2, 14) +
    // The Haymarket clock tower
    rect(52, 100, 22, 20) + rect(55.4, 62, 12.6, 38) + circle(61.7, 74, 4.2, "sc-wheel") + rect(53.4, 58, 16.6, 5) + spire(61.7, 58, 20, 11) +
    rect(52, 86, 3.4, 14) + rect(70.6, 86, 3.4, 14) + wins(58, 84, 3, 2, 4, 6, 1.4, 3.4) +
    // The Guildhall: timber gables
    rect(80, 98, 24, 22) + gable(79, 98, 13, 9) + gable(91.6, 98, 13, 9) + path("M80 102L92 118M92 102L80 118M92 102L104 118M104 102L92 118", "sc-pipe") + wins(84, 108, 2, 1, 10, 0, 2.2, 4) +
    // The cathedral with its spire
    rect(112, 86, 36, 34) + path("M112 86L130 76L148 86Z") + rect(124, 62, 12, 24) + spire(130, 62, 36, 9) + wins(115, 92, 8, 2, 4, 9, 1.6, 5) + wins(126.4, 66, 2, 3, 5, 5.6, 1.6, 3);
  const ground = STREET + path("M0 128H160M0 144H160", "sc-road");
  const fx = circle(98, 30, 6, "sc-sun") + circle(98, 30, 11, "sc-glow") + cloud(70, 28, 1, 36) + cloud(112, 56, 0.6, 48) + bird(44, 26) + bird(56, 32, 0.8);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Norwich
const norwich = () => {
  setSeed(6004);
  const far = path("M0 110C22 106 46 108 72 106S122 102 160 108V122H0Z") + circle(18, 100, 7) + circle(30, 102, 6) + circle(136, 102, 7) + circle(148, 104, 6);
  const mid = houses(0, 28, 120, 8, 14) + houses(86, 110, 120, 8, 14) + houses(128, 144, 120, 8, 14);
  const near =
    // The Norman castle keep on its mound
    path("M20 120C24 100 34 90 48 90C62 90 72 100 78 120Z") + rect(36, 62, 24, 28) + crenel(36, 62, 24) + rect(34, 58, 5, 8) + rect(57, 58, 5, 8) + crenel(34, 58, 5, 2.6, 1.6) + crenel(57, 58, 5, 2.6, 1.6) +
    wins(40, 68, 4, 1, 5, 0, 2, 4) + wins(40, 78, 4, 1, 5, 0, 2, 4) + path("M36 70H60M36 80H60", "sc-band") +
    // The cathedral: a long nave and a very tall spire
    rect(86, 94, 40, 26) + path("M86 94L106 84L126 94Z") + rect(98, 68, 14, 26) + spire(105, 68, 48, 8) + rect(96.4, 64, 2, 6) + rect(110.6, 64, 2, 6) +
    spire(97.4, 64, 6, 2.2) + spire(111.6, 64, 6, 2.2) + wins(89, 100, 9, 2, 4, 8, 1.6, 4.4) + wins(100.4, 72, 2, 3, 5, 6, 1.6, 3) +
    rect(126, 100, 12, 20) + gable(125, 100, 14, 6) +
    // The City Hall clock tower
    rect(144, 58, 8, 62) + circle(148, 70, 3.4, "sc-wheel") + rect(142.6, 54, 10.8, 5) + spire(148, 54, 14, 9) + wins(145.4, 84, 2, 4, 3, 6.4, 1.4, 3.4);
  const ground = STREET + path("M0 128H160M0 144H160", "sc-road");
  const fx = circle(20, 34, 6, "sc-sun") + circle(20, 34, 11, "sc-glow") + cloud(78, 24, 1, 38) + cloud(128, 38, 0.7, 48) + bird(96, 36) + bird(108, 30, 0.7) + bird(120, 38, 1.3);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Cambridge
const cambridge = () => {
  setSeed(6005);
  const far = path("M0 108C28 104 54 106 84 104S130 102 160 106V122H0Z") + circle(12, 96, 9) + circle(26, 100, 7) + circle(138, 98, 9) + circle(152, 100, 7);
  const mid = rect(0, 100, 30, 20) + crenel(0, 100, 30) + rect(118, 96, 42, 24) + crenel(118, 96, 42) + wins(122, 104, 8, 1, 4.6, 0, 2, 3.4);
  const near =
    // King's College Chapel: a long chapel with four pinnacled towers
    rect(32, 82, 88, 38) + path("M32 82L76 74L120 82Z") + rect(30, 62, 9, 58) + rect(113, 62, 9, 58) + rect(52, 66, 7, 16) + rect(93, 66, 7, 16) +
    crenel(30, 62, 9, 2.8, 2) + crenel(113, 62, 9, 2.8, 2) + crenel(52, 66, 7, 2.8, 2) + crenel(93, 66, 7, 2.8, 2) +
    spire(31.6, 60, 8, 2) + spire(37.4, 60, 8, 2) + spire(114.6, 60, 8, 2) + spire(120.4, 60, 8, 2) +
    wins(40, 88, 18, 1, 4.2, 0, 2, 12) + path("M34 90V120M120 90V120M74 82V120", "sc-pipe") +
    // Great St Mary's tower
    rect(128, 68, 14, 52) + crenel(126, 68, 18) + rect(126, 66, 18, 3) + circle(135, 80, 3.4, "sc-wheel") + wins(131, 92, 3, 3, 4, 7, 1.6, 4);
  const ground = WATER + waves([[8, 128, 24], [46, 133, 28, 0.6], [100, 128, 24, 1], [126, 138, 26, 1.4], [20, 146, 30, 0.7], [90, 150, 32, 1.8]]) +
    // a punt with its pole
    path("M60 130H88L85 133.6H63Z", "sc-pipe") + path("M80 130V116M80 116L76 114", "sc-pipe") + circle(72, 127, 1.4, "sc-pipe");
  const fx = circle(104, 32, 6, "sc-sun") + circle(104, 32, 11, "sc-glow") + cloud(30, 26, 1, 38) + cloud(62, 46, 0.6, 50) + bird(122, 38) + bird(134, 32, 0.8);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Oxford
const oxford = () => {
  setSeed(6006);
  const far = path("M0 104C26 98 52 102 80 98S132 94 160 100V122H0Z");
  // The dreaming spires: thin spires at different heights
  const spires = [[40, 70, 28], [58, 80, 22], [88, 66, 32], [102, 78, 24], [124, 72, 28], [140, 82, 20]].map(([x, y, h]) => rect(x - 3, y, 6, 120 - y) + spire(x, y, h, 6)).join("");
  const mid = houses(0, 160, 120, 8, 14) + spires;
  const near =
    // Bridge of Sighs: two stone blocks and a covered bridge between
    rect(8, 84, 20, 36) + crenel(8, 84, 20) + rect(34, 84, 20, 36) + crenel(34, 84, 20) + rect(28, 92, 6, 8) + path("M28 100H34", "sc-pipe") +
    wins(11, 90, 3, 4, 5, 7, 1.8, 3.4) + wins(37, 90, 3, 4, 5, 7, 1.8, 3.4) + path("M26 120V108A3 5 0 0 1 36 108V120Z", "sc-arch") +
    // The Radcliffe Camera: a round library with a dome
    rect(62, 92, 30, 28) + path("M60 92H94", "sc-band") + dome(77, 92, 13) + rect(75.6, 70, 2.8, 8) + spire(77, 70, 8, 3.2) + wins(65, 98, 6, 2, 4.2, 9, 1.6, 5) +
    // Carfax Tower and Magdalen Tower
    rect(104, 66, 12, 54) + crenel(104, 66, 12, 2.6) + wins(107, 72, 2, 5, 4, 8, 1.6, 3.4) + circle(110, 90, 0.1, "sc-wheel") +
    rect(128, 50, 14, 70) + crenel(128, 50, 14, 2.8, 2.2) + rect(127, 44, 2, 6) + rect(141, 44, 2, 6) + spire(128, 44, 6, 2) + spire(142, 44, 6, 2) +
    wins(131, 56, 3, 7, 4, 8, 1.6, 4) + rect(128, 78, 14, 2.4, "sc-band");
  const ground = STREET + path("M0 128H160M0 144H160", "sc-road");
  const fx = circle(28, 34, 6, "sc-sun") + circle(28, 34, 11, "sc-glow") + cloud(72, 26, 1, 38) + cloud(110, 44, 0.6, 50) + bird(52, 36) + bird(64, 31, 0.7) + bird(96, 28, 1.2);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Cardiff
const cardiff = () => {
  setSeed(6007);
  const far = path("M0 104C20 96 44 100 70 96S120 92 160 100V122H0Z");
  const mid = rect(76, 96, 8, 24) + rect(88, 90, 6, 30) + houses(96, 112, 120, 10, 20);
  const near =
    // Principality Stadium: a bowl, a roof ring and four masts
    path("M6 120V102C6 92 24 88 40 88S74 92 74 102V120Z") + path("M4 98C8 84 72 84 76 98", "sc-frame") +
    rect(14, 62, 1.6, 36) + rect(64, 62, 1.6, 36) + rect(26, 70, 1.4, 22) + rect(52, 70, 1.4, 22) + path("M14.8 62L40 90M64.8 62L40 90M26.7 70L40 90M52.7 70L40 90", "sc-wire") +
    wins(12, 102, 16, 1, 3.6, 0, 1.8, 3) +
    // The castle keep on its mound
    path("M70 120C74 108 80 100 90 100S104 108 108 120Z") + rect(82, 76, 16, 26) + crenel(82, 76, 16, 2.8) + rect(80, 72, 5, 6) + rect(95, 72, 5, 6) + wins(86, 82, 2, 3, 5, 7, 1.8, 3.4) + rect(89.5, 62, 1, 10) +
    // The Pierhead clock tower
    rect(112, 66, 9, 54) + circle(116.5, 76, 3.2, "sc-wheel") + rect(110.6, 62, 11.8, 5) + spire(116.5, 62, 12, 9) + wins(113, 88, 2, 4, 4, 7, 1.4, 3.4) +
    // The Millennium Centre: a wide low dome with a band
    rect(126, 98, 32, 22) + path("M124 98C128 82 156 82 160 98Z") + rect(126, 104, 32, 3, "sc-band") + wins(129, 110, 6, 1, 5, 0, 2.4, 4);
  const ground = WATER + waves([[8, 128, 24], [46, 134, 30, 0.6], [92, 128, 24, 1], [124, 138, 26, 1.4], [20, 146, 30, 0.7], [78, 150, 34, 1.8]]);
  const fx = circle(96, 34, 6, "sc-sun") + circle(96, 34, 11, "sc-glow") + cloud(34, 28, 1, 36) + cloud(128, 50, 0.7, 48) + bird(52, 40) + bird(64, 34, 0.7) + bird(130, 32, 1.3);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Swansea
const swansea = () => {
  setSeed(6008);
  const far = path("M0 100C22 92 44 98 70 94S116 92 140 98 156 100 160 104V122H0Z") + path("M118 98C128 88 140 86 160 96V122H118Z");
  const mid = houses(0, 8, 120, 8, 12) + houses(52, 108, 120, 8, 16);
  const near =
    // The Guildhall: a long wing and a tall clock tower
    rect(8, 88, 44, 32) + rect(8, 84, 44, 3) + wins(11, 92, 9, 3, 4.6, 9, 1.8, 4.6) + rect(30, 54, 10, 66) + rect(28.6, 50, 12.8, 5) + spire(35, 50, 12, 9) + circle(35, 64, 3.6, "sc-wheel") + wins(32, 78, 2, 5, 4, 7, 1.4, 3.4) +
    // The Meridian Tower: a tall slim tower with a stepped crown
    rect(124, 40, 12, 80) + path("M122 40H138L134 32H126Z") + rect(129, 22, 2, 10) + wins(126, 46, 3, 9, 3.6, 7.6, 1.6, 4.4) +
    // Marina: sails
    path("M70 112L78 90V112Z") + path("M80 112L80 94L88 112Z") + rect(78, 90, 0.9, 22) + path("M96 114L102 98V114Z") + rect(101.6, 98, 0.9, 16) + rect(66, 112, 40, 3) +
    // A lighthouse on a rock
    path("M108 120C110 112 114 108 118 108C122 108 124 112 126 120Z") + path("M115 108L116.4 84H119.6L121 108Z") + rect(115.4, 80, 5.2, 5) + path("M114.6 80L118 74L121.4 80Z") + circle(118, 82.4, 0.1, "sc-wheel");
  const ground = WATER + waves([[8, 128, 24], [46, 133, 28, 0.6], [92, 128, 24, 1], [124, 138, 26, 1.4], [20, 146, 30, 0.7], [76, 150, 34, 1.8]]);
  const fx = circle(62, 32, 6, "sc-sun") + circle(62, 32, 11, "sc-glow") + cloud(100, 26, 1, 38) + cloud(20, 36, 0.6, 50) + bird(80, 40) + bird(92, 34, 0.8);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Bristol
const bristol = () => {
  setSeed(6009);
  const far = path("M0 98L28 84H48L60 98V122H0Z") + path("M112 98L124 84H150L160 92V122H112Z");
  const mid =
    houses(4, 26, 98, 6, 12) + houses(124, 156, 98, 6, 12) +
    // Wills Memorial Building tower
    rect(58, 70, 12, 50) + crenel(58, 70, 12, 2.6, 2.4) + rect(57, 66, 2, 5) + rect(69, 66, 2, 5) + spire(58, 66, 6, 2) + spire(70, 66, 6, 2) + houses(72, 110, 120, 8, 16);
  // hanging cables from tower to tower, with their hangers
  let hangers = "";
  for (let x = 48; x <= 112; x += 5) {
    const t = (x - 79) / 39;
    hangers += `M${x} ${(68 - 22 * t * t).toFixed(1)}V72`;
  }
  const near =
    // The cliffs of the gorge and the Clifton Suspension Bridge
    path("M0 120V68L12 66L22 71L28 80L24 92L30 104L26 120Z") + path("M134 120L130 104L136 92L132 80L138 71L148 66L160 68V120Z") +
    rect(24, 72, 112, 3) + rect(36, 44, 8, 28) + rect(114, 44, 8, 28) + rect(34, 42, 12, 3) + rect(112, 42, 12, 3) +
    path("M38 50Q79 90 118 50M38 50L16 70M118 50L140 70", "sc-pipe") + path(hangers, "sc-wire") +
    path("M38 72V62A2 4 0 0 1 42 62V72ZM118 72V62A2 4 0 0 1 122 62V72Z", "sc-arch") +
    // Cabot Tower on the hill
    rect(12, 52, 6, 18) + rect(11, 49, 8, 4) + spire(15, 49, 8, 4.4) +
    // The harbour: a crane and the masts of a steamship
    path("M70 118V92M70 92H88M70 92L82 80H92M92 80V86", "sc-frame") + rect(66, 112, 12, 6) +
    path("M92 116H122L118 119.6H96Z") + rect(98, 94, 0.9, 22) + rect(104, 90, 0.9, 26) + rect(110, 96, 0.9, 20) + rect(116, 100, 0.9, 16);
  const ground = WATER + waves([[8, 128, 24], [46, 133, 28, 0.6], [92, 128, 24, 1], [124, 138, 26, 1.4], [20, 146, 30, 0.7], [76, 150, 34, 1.8]]);
  const fx = circle(100, 26, 6, "sc-sun") + circle(100, 26, 11, "sc-glow") + cloud(36, 26, 1, 36) + cloud(128, 38, 0.6, 48) + bird(70, 36) + bird(82, 30, 0.8) + bird(138, 54, 1.3);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- South Croydon
const croydon = () => {
  setSeed(6010);
  const far = rect(2, 80, 8, 40) + rect(12, 90, 8, 30) + rect(146, 86, 8, 34) + path("M0 106C30 102 60 106 90 102S140 100 160 104V122H0Z");
  const mid = houses(0, 160, 120, 8, 14);
  const near =
    // The 50p tower: a tall block with chamfered corners
    path("M62 120V40L68 32H88L94 40V120Z") + wins(66.4, 42, 4, 10, 6.2, 7.2, 2.8, 3.2) + rect(62, 64, 32, 2.4, "sc-band") + rect(62, 92, 32, 2.4, "sc-band") + rect(76, 22, 2, 10) +
    // two office blocks
    rect(18, 70, 18, 50) + rect(16.6, 67, 20.8, 4) + wins(21, 76, 3, 7, 5, 6, 2.4, 3) + rect(38, 82, 16, 38) + wins(41, 88, 3, 5, 4.4, 6.6, 2.2, 3.2) +
    // Fairfield Halls: a low hall with a fly tower
    rect(102, 90, 34, 30) + rect(110, 74, 16, 16) + wins(105, 96, 6, 2, 5, 9, 2.6, 4.4) + rect(112, 78, 12, 2.4, "sc-band") +
    // a church spire
    rect(140, 84, 10, 36) + spire(145, 84, 26, 9) + rect(143.8, 54, 2.4, 6) + wins(143, 92, 2, 3, 4, 8, 1.6, 4) +
    // a tram on its overhead wire
    path("M0 96H160", "sc-wire") + rect(50, 109, 36, 9, "sc-band") + rect(52, 105, 32, 4, "sc-band") + path("M68 105V96", "sc-wire") + wins(53, 111, 7, 1, 4.6, 0, 3, 3);
  const ground = STREET + path("M0 128H160M0 144H160", "sc-road");
  const fx = circle(116, 30, 6, "sc-sun") + circle(116, 30, 11, "sc-glow") + cloud(26, 28, 1, 38) + cloud(100, 50, 0.6, 50) + bird(46, 40) + bird(58, 34, 0.8);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Southampton
const southampton = () => {
  setSeed(6011);
  const far = path("M0 110C30 104 70 108 110 104S150 102 160 106V122H0Z") + path("M108 104C120 98 140 98 160 104V120H108Z");
  const mid = houses(96, 118, 120, 8, 14) + rect(138, 96, 8, 24) + houses(146, 160, 120, 8, 14) +
    // The Civic Centre clock tower
    rect(80, 60, 10, 60) + circle(85, 72, 3.4, "sc-wheel") + rect(78.6, 56, 12.8, 5) + spire(85, 56, 12, 9);
  const near =
    // A big cruise ship with a funnel
    path("M6 118L14 104H108L116 118Z") + rect(24, 92, 76, 12) + rect(32, 82, 58, 10) + rect(46, 74, 32, 8) + rect(58, 62, 8, 12) + rect(56.6, 60, 10.8, 2.6, "sc-band") +
    wins(28, 95, 18, 1, 4, 0, 2, 2.4) + wins(36, 85, 14, 1, 4, 0, 2, 2.4) + wins(50, 77, 7, 1, 4, 0, 2, 2.2) + wins(18, 108, 20, 1, 4.6, 0, 2, 2) +
    // container cranes
    path("M120 118V70M136 118V70M116 70H150M120 70L138 52H152M138 52L128 70", "sc-frame") + rect(116, 66, 36, 3) + rect(122, 108, 10, 10) + rect(134, 110, 10, 8) +
    path("M146 118V76M158 118V76M142 76H160", "sc-frame");
  const ground = WATER + waves([[8, 126, 24], [46, 132, 28, 0.6], [92, 127, 24, 1], [124, 136, 26, 1.4], [20, 144, 30, 0.7], [76, 148, 34, 1.8]]);
  const fx = circle(108, 26, 6, "sc-sun") + circle(108, 26, 11, "sc-glow") + smoke(62, 62, 0.4, 18) + cloud(34, 26, 1, 36) + cloud(132, 40, 0.7, 48) + bird(60, 34) + bird(72, 28, 0.8);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Exeter
const exeter = () => {
  setSeed(6012);
  const far = path("M0 104C22 98 44 102 70 98S120 94 160 100V122H0Z");
  const mid = houses(0, 22, 120, 8, 14) + houses(104, 118, 120, 8, 14) +
    // Guildhall front and a quay warehouse
    rect(108, 100, 14, 20) + gable(107, 100, 16, 8) + rect(140, 94, 20, 26) + gable(139, 94, 22, 8) + rect(150, 84, 1, 10) + path("M146 84H156", "sc-wire") + wins(143, 100, 4, 2, 4.4, 8, 2, 3.4);
  const near =
    // The cathedral: a long nave and two squat Norman towers
    rect(22, 88, 78, 32) + path("M22 88L61 78L100 88Z") + rect(40, 62, 15, 28) + rect(68, 62, 15, 28) + crenel(40, 62, 15) + crenel(68, 62, 15) +
    wins(43, 68, 2, 3, 7, 6.6, 1.6, 4) + wins(71, 68, 2, 3, 7, 6.6, 1.6, 4) + wins(26, 94, 14, 1, 5, 0, 2, 11) + circle(61, 98, 5, "sc-wheel") +
    rect(22, 72, 9, 16) + crenel(22, 72, 9, 2.6, 1.8) + rect(91, 72, 9, 16) + crenel(91, 72, 9, 2.6, 1.8) +
    // Rougemont castle gatehouse on its mound
    path("M118 120C124 108 132 100 140 100C148 100 156 108 160 120Z") + rect(128, 76, 24, 26) + crenel(128, 76, 24) + path("M136 102V90A4 7 0 0 1 144 90V102Z", "sc-arch") +
    rect(126, 72, 5, 8) + rect(149, 72, 5, 8) + wins(132, 82, 2, 1, 14, 0, 2, 4);
  const ground = WATER + waves([[8, 128, 24], [46, 134, 28, 0.6], [92, 128, 24, 1], [124, 138, 26, 1.4], [20, 146, 30, 0.7], [76, 150, 34, 1.8]]);
  const fx = circle(130, 36, 6, "sc-sun") + circle(130, 36, 11, "sc-glow") + cloud(40, 26, 1, 38) + cloud(90, 46, 0.6, 50) + bird(70, 36) + bird(82, 30, 0.8);
  return { far, mid, near, ground, fx };
};

export const ukScenesB = {
  Nottingham: build(nottingham()),
  Birmingham: build(birmingham()),
  Leicester: build(leicester()),
  Norwich: build(norwich()),
  Cambridge: build(cambridge()),
  Oxford: build(oxford()),
  Cardiff: build(cardiff()),
  Swansea: build(swansea()),
  Bristol: build(bristol()),
  "South Croydon": build(croydon()),
  Southampton: build(southampton()),
  Exeter: build(exeter()),
};
