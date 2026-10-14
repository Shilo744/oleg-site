// City models for the German map lens. Stylised, not to scale.
// Each city is a small diorama in layers: far, mid, near, ground, fx. Colours come from CSS classes in visuals.css.
import { setSeed, rect, path, circle, gable, spire, dome, onion, wins, houses, bridge, cloud, bird, waves, smoke, WATER, STREET, build } from "./scene-kit.js";

// A harbour crane: two legs, a cross beam and a long jib with its rope.
const crane = (x, base, h = 46, jib = 26) =>
  path(`M${x} ${base}V${base - h}M${x + 10} ${base}V${base - h}M${x} ${base - h}H${x + 10}M${x} ${base - h + 12}H${x + 10}M${x} ${base - h + 24}H${x + 10}M${x} ${base - h}L${x - jib} ${base - h - 2}M${x + 10} ${base - h}L${x + 22} ${base - h - 8}M${x - jib * 0.5} ${base - h - 1}V${base - h + 10}`, "sc-frame");
// A row of columns under a flat beam.
const colonnade = (x, y, count, gap, h, w = 3) => Array.from({ length: count }, (_, i) => rect(x + i * gap, y, w, h)).join("");

// ---------------------------------------------------------------- Berlin
const berlin = () => {
  setSeed(9001);
  const far = path("M0 108C22 104 46 108 72 104S122 100 160 106V122H0Z") + rect(70, 92, 7, 14) + rect(84, 88, 6, 18) + rect(142, 94, 8, 12);
  const mid =
    houses(0, 8, 120, 8, 14) +
    // Berlin Cathedral: a big dome with a lantern
    rect(8, 90, 26, 30) + dome(21, 90, 11) + rect(19.6, 76, 2.8, 5) + spire(21, 76, 8, 3) + rect(10, 82, 4, 8) + rect(28, 82, 4, 8) + dome(12, 82, 2.4) + dome(30, 82, 2.4) +
    // The Reichstag with its glass dome
    rect(100, 88, 42, 32) + dome(121, 88, 8) + rect(98, 86, 46, 3) + colonnade(102, 92, 5, 7.6, 14, 2.4) + houses(144, 160, 120, 8, 16);
  const near =
    // Brandenburg Gate: six columns, the beam, the attic and the quadriga
    rect(40, 116, 52, 4) + rect(42, 80, 48, 5) + colonnade(44, 85, 6, 8, 31, 3.6) + rect(44, 72, 44, 8) +
    rect(58, 63, 16, 5) + rect(60, 60, 12, 3) + circle(66, 60, 2.2, "sc-wheel") + spire(66, 56, 9, 3) +
    path("M52 72V68H58V72M74 72V68H80V72") + rect(54, 70, 3, 2) + rect(75, 70, 3, 2) +
    wins(48, 74, 9, 1, 4.6, 5, 1.2, 2.2) +
    // Victory Column and the television tower with its sphere
    rect(109.6, 60, 3.4, 58) + rect(108, 58, 6.8, 3) + rect(106, 112, 11, 6) + circle(111.3, 54, 2.6) + spire(111.3, 52, 7, 2.6) +
    path("M131.6 120L135 74H138.6L142 120Z") + rect(135.8, 74, 2, 6) + circle(136.8, 64, 7.4) + path("M129.4 64H144.2", "sc-pipe") + rect(136.2, 20, 1.2, 44) + rect(134.6, 54, 4.4, 2) +
    wins(132, 62, 4, 1, 3.6, 3, 1.2, 1.6);
  const ground = STREET + path("M0 128H160M0 144H160", "sc-road");
  const fx = circle(26, 40, 6, "sc-sun") + circle(26, 40, 11, "sc-glow") + cloud(70, 30, 1, 38) + cloud(118, 44, 0.6, 50) + bird(86, 36) + bird(98, 30, 0.8) + bird(52, 52, 1.4);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Hamburg
const hamburg = () => {
  setSeed(9002);
  const far = path("M0 110C30 106 70 110 100 106S140 104 160 108V122H0Z") + crane(100, 118, 34, 18).replaceAll("sc-frame", "sc-pipe");
  const mid =
    // Speicherstadt: tall brick warehouses with stepped gables
    rect(0, 80, 14, 40) + path("M0 80H14L11 76H9L7 72H5L3 76H0Z") + rect(15, 88, 14, 32) + path("M15 88H29L26 84H24L22 80L20 84H17Z") + rect(30, 78, 12, 42) + path("M30 78H42L39 74H37L36 70L35 74H33Z") +
    wins(2, 86, 3, 5, 4, 6.6, 1.5, 2.8) + wins(17, 94, 3, 4, 4, 6.6, 1.5, 2.8) +
    // Container stacks
    rect(80, 106, 9, 6) + rect(80, 112, 9, 6);
  const near =
    // St Michael's church: a tall tower with a green copper top
    rect(46, 56, 14, 64) + rect(42, 98, 22, 22) + circle(53, 70, 3.6, "sc-wheel") + onion(53, 56, 6.6, 16) + rect(52.4, 36, 1.2, 8) +
    wins(48, 80, 3, 3, 4.2, 6, 1.6, 3.4) + path("M42 98L53 90L64 98Z") +
    // The Elbphilharmonie: a brick base with a glass wave on top
    rect(70, 94, 42, 24) + path("M70 94C77 74 83 86 90 66C96 52 101 76 106 80C108 84 110 88 112 94Z") +
    path("M74 86C81 72 85 82 92 64M92 70C98 60 102 80 108 84", "sc-pipe") + wins(72, 99, 8, 3, 4.8, 6.4, 1.8, 2.8) +
    // Harbour cranes and a ship
    crane(124, 118, 54, 26) + crane(138, 118, 40, 14) + path("M88 118H132L125 124H96Z") + rect(98, 112, 8, 6) + rect(107, 112, 8, 6) + rect(116, 112, 8, 6);
  const ground = WATER + waves([[8, 126, 24], [44, 134, 34], [96, 130, 24, 1], [124, 138, 28, 1.4], [18, 144, 30, 0.7], [70, 148, 36, 1.8], [118, 152, 26, 0.4]]);
  const fx = circle(112, 30, 6, "sc-sun") + circle(112, 30, 11, "sc-glow") + cloud(30, 26, 1, 36) + cloud(78, 40, 0.7, 46) + bird(66, 46) + bird(78, 54, 0.6) + bird(138, 36, 1.2) + smoke(34, 78, 0.5, 14);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Munich
const munich = () => {
  setSeed(9003);
  const far = path("M0 106L14 88L24 98L42 70L56 92L70 80L90 100L106 74L124 98L142 82L160 98V122H0Z");
  const mid =
    houses(0, 160, 120, 8, 16) +
    // Olympic Tower: a slim shaft with its round platform
    rect(16.8, 56, 2.6, 64) + rect(12, 62, 12, 4) + rect(13.4, 58, 9.2, 3.6) + rect(17.4, 40, 1.2, 16) + circle(18.1, 64, 1.2, "sc-wheel");
  const near =
    // Frauenkirche: a long brick church with two round-domed towers
    rect(44, 76, 46, 44) + path("M44 76L67 60L90 76Z") + rect(46, 50, 13, 26) + rect(75, 50, 13, 26) +
    dome(52.5, 50, 7.4) + dome(81.5, 50, 7.4) + rect(51.6, 40, 1.8, 4) + circle(52.5, 38.6, 1.4) + rect(80.6, 40, 1.8, 4) + circle(81.5, 38.6, 1.4) +
    wins(48, 80, 8, 3, 5.2, 10, 1.7, 5) + wins(48.4, 54, 2, 3, 6.4, 6.6, 1.7, 3.4) + wins(77.4, 54, 2, 3, 6.4, 6.6, 1.7, 3.4) +
    // New Town Hall: a gothic front with a tall central tower
    rect(96, 82, 36, 38) + rect(108, 44, 12, 38) + spire(114, 44, 22, 12) + rect(96, 76, 6, 10) + spire(99, 76, 8, 6) + rect(126, 76, 6, 10) + spire(129, 76, 8, 6) +
    circle(114, 56, 3, "sc-wheel") + wins(98, 88, 7, 3, 4.8, 9, 1.5, 4) + wins(110, 62, 2, 4, 5, 5.6, 1.5, 3) +
    // The BMW building: four cylinders side by side
    rect(134, 74, 4, 46) + rect(138.6, 74, 4, 46) + rect(143.2, 74, 4, 46) + rect(147.8, 74, 4, 46) + rect(134, 82, 17.8, 2, "sc-band") + rect(134, 96, 17.8, 2, "sc-band");
  const ground = STREET + path("M0 128H160M0 144H160", "sc-road");
  const fx = circle(40, 28, 6, "sc-sun") + circle(40, 28, 11, "sc-glow") + cloud(78, 22, 1, 38) + cloud(130, 34, 0.7, 48) + bird(56, 40) + bird(68, 34, 0.7) + bird(100, 28, 1.4);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Cologne
const cologne = () => {
  setSeed(9004);
  const far = path("M0 108C24 106 54 108 84 106S130 104 160 107V122H0Z");
  const mid =
    houses(0, 8, 120, 8, 14) + houses(140, 160, 120, 8, 14) +
    // a modern glass tower with a slanted top
    rect(120, 78, 14, 42) + path("M120 78L134 70V78Z") + wins(122, 84, 3, 6, 4, 6, 2, 3.4);
  const near =
    // Cologne Cathedral: a long nave with two giant spires and many pinnacles
    rect(38, 78, 62, 42) + path("M38 78L69 64L100 78Z") + rect(44, 40, 15, 38) + rect(79, 40, 15, 38) +
    spire(51.5, 40, 32, 13) + spire(86.5, 40, 32, 13) + rect(45, 56, 1.6, 6) + rect(57, 56, 1.6, 6) + rect(80, 56, 1.6, 6) + rect(92, 56, 1.6, 6) +
    spire(45.8, 56, 8, 2.4) + spire(57.8, 56, 8, 2.4) + spire(80.8, 56, 8, 2.4) + spire(92.8, 56, 8, 2.4) +
    spire(69, 64, 22, 4) + path("M38 82H30M100 82H108M38 96H32M100 96H106", "sc-pipe") +
    wins(46, 46, 2, 2, 7, 14, 1.8, 8) + wins(81, 46, 2, 2, 7, 14, 1.8, 8) + wins(42, 84, 11, 2, 5.2, 14, 1.7, 7) +
    // Great St Martin: a church with a square tower and four small corner turrets
    rect(10, 78, 20, 42) + rect(13, 56, 14, 22) + spire(20, 56, 15, 14) + rect(10, 70, 4, 8) + rect(26, 70, 4, 8) + spire(12, 70, 6, 4) + spire(28, 70, 6, 4) + wins(15, 62, 3, 2, 4, 6, 1.4, 3.4) +
    // Hohenzollern Bridge: steel arches over the Rhine with its deck and two gate towers
    rect(106, 108, 54, 3) + path("M108 108Q122 86 136 108M136 108Q150 86 164 108", "sc-frame") + path("M114 99V108M122 93V108M130 99V108M144 99V108M152 93V108", "sc-frame") +
    rect(104, 90, 6, 30) + gable(103.4, 90, 7.2, 5) + rect(108, 112, 3, 8) + rect(132, 112, 3, 8);
  const ground = WATER + waves([[8, 126, 24], [44, 134, 34], [96, 132, 24, 1], [124, 140, 28, 1.4], [18, 144, 30, 0.7], [70, 148, 36, 1.8], [118, 152, 26, 0.4]]);
  const fx = circle(138, 36, 6, "sc-sun") + circle(138, 36, 11, "sc-glow") + cloud(28, 28, 1, 36) + cloud(84, 22, 0.7, 48) + bird(60, 30) + bird(72, 24, 0.8) + bird(116, 52, 1.2);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Frankfurt
const frankfurt = () => {
  setSeed(9005);
  const far = rect(40, 80, 8, 40) + rect(52, 70, 8, 50) + rect(98, 76, 8, 44) + rect(112, 86, 8, 34) + rect(124, 72, 8, 48) + path("M0 112C30 108 70 110 100 108S140 106 160 110V122H0Z");
  const mid =
    rect(46, 60, 10, 60) + rect(102, 64, 9, 56) + rect(116, 78, 10, 42) + rect(132, 82, 12, 38) + rect(36, 86, 8, 34) +
    wins(48, 66, 1, 5, 4, 9, 1.2, 2.6);
  const near =
    // Roemer: stepped gables in the old square
    rect(0, 92, 13, 28) + path("M0 92H13L11 88H9L8 84H6L4 88H2Z") + rect(14, 100, 12, 20) + path("M14 100H26L24 96H22L20 92L18 96H16Z") + rect(27, 94, 11, 26) + path("M27 94H38L36 90H34L32.5 85L31 90H29Z") +
    wins(2, 96, 3, 3, 4, 7, 1.5, 3) + wins(16, 104, 3, 2, 3.6, 6.4, 1.5, 3) + wins(29, 98, 2, 3, 4, 7, 1.5, 3) +
    // Messeturm: a tall pencil shape with a pointed top
    rect(54, 38, 12, 82) + path("M54 38L60 22L66 38Z") + rect(54, 60, 12, 2, "sc-band") + rect(54, 84, 12, 2, "sc-band") + rect(59.4, 12, 1.2, 12) + wins(57, 44, 2, 8, 4.4, 8.6, 1.4, 3) +
    // Commerzbank: a triangular tower with a mast
    rect(70, 30, 15, 90) + rect(76.4, 12, 1.8, 18) + rect(70, 52, 15, 2.4, "sc-band") + rect(70, 76, 15, 2.4, "sc-band") + rect(70, 100, 15, 2.4, "sc-band") + wins(73, 36, 3, 10, 4.4, 8, 1.4, 3) +
    // Main Tower with its viewing deck, and the Eurotower
    rect(90, 44, 12, 76) + rect(88, 38, 16, 7) + rect(95, 22, 1.4, 16) + wins(93, 52, 2, 7, 4.8, 9.4, 1.4, 3) +
    rect(106, 60, 13, 60) + circle(112.5, 64, 4, "sc-wheel") + wins(109, 72, 2, 5, 5.2, 9, 1.4, 3) +
    // The Main river bridge with its arches
    bridge(40, 160, 110, 118, 7);
  const ground = WATER + waves([[8, 126, 24], [44, 134, 34], [96, 130, 24, 1], [124, 138, 28, 1.4], [18, 144, 30, 0.7], [70, 148, 36, 1.8], [118, 152, 26, 0.4]]);
  const fx = circle(30, 34, 6, "sc-sun") + circle(30, 34, 11, "sc-glow") + cloud(78, 22, 1, 38) + cloud(128, 38, 0.7, 48) + bird(44, 50) + bird(56, 44, 0.8) + bird(142, 26, 1.4);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Stuttgart
const stuttgart = () => {
  setSeed(9006);
  const far = path("M0 104C16 94 34 98 52 92S92 84 116 92 148 90 160 96V122H0Z");
  // vineyard rows on the slope
  const rows = ["M6 108L40 100", "M10 112L46 103", "M96 106L150 98", "M104 112L156 104"].map((d) => path(d, "sc-wire")).join("");
  const mid = houses(0, 160, 120, 8, 16) + rows;
  const near =
    // Television tower with its concrete cabin
    rect(24.4, 52, 3.2, 66) + rect(18, 40, 16, 8) + path("M18 48H34L31 52H21Z") + rect(21, 34, 10, 6) + rect(25.4, 8, 1.2, 26) + wins(20, 42, 4, 1, 3.4, 3, 1.4, 2.4) +
    // Stiftskirche: two towers that do not match
    rect(40, 84, 32, 36) + path("M40 84L56 72L72 84Z") + rect(42, 58, 9, 26) + spire(46.5, 58, 20, 9) + rect(62, 68, 8, 16) + gable(61.4, 68, 9.2, 5) +
    wins(44, 90, 5, 2, 5.6, 10, 1.7, 4.6) + wins(43.4, 62, 2, 3, 4, 6, 1.5, 3) +
    // Neues Schloss: a long palace with a central cupola
    rect(78, 90, 40, 30) + path("M78 90L84 82H112L118 90Z") + rect(94, 76, 8, 8) + dome(98, 76, 5) + rect(97.4, 66, 1.2, 4) + wins(80, 94, 8, 3, 4.6, 8, 1.7, 4) +
    // The station tower with its turning star
    rect(124, 66, 14, 54) + rect(122, 64, 18, 3) + circle(131, 56, 7, "sc-wheel") + path("M131 49V63M124.9 52.5L137.1 59.5M124.9 59.5L137.1 52.5", "sc-frame") + wins(126, 74, 3, 6, 4, 7, 1.7, 3.6);
  const ground = STREET + path("M0 128H160M0 144H160", "sc-road") + path("M0 134H160", "sc-wire");
  const fx = circle(96, 30, 6, "sc-sun") + circle(96, 30, 11, "sc-glow") + cloud(36, 26, 1, 38) + cloud(132, 36, 0.7, 48) + bird(64, 40) + bird(76, 34, 0.7) + bird(150, 52, 1.3);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Duesseldorf
const duesseldorf = () => {
  setSeed(9007);
  const far = path("M0 110C30 106 60 110 90 106S130 104 160 108V122H0Z");
  const mid =
    // The Landtag: a round building with ring windows
    rect(2, 92, 26, 28) + rect(0, 90, 30, 3) + path("M2 100H28M2 108H28", "sc-pipe") + wins(4, 95, 6, 1, 4, 5, 1.8, 2.2) +
    // Gehry buildings: three leaning, curved blocks
    path("M80 120V70C86 66 92 70 96 64V120Z") + path("M98 120V84C104 80 108 86 114 78V120Z") + path("M116 120V92C120 88 126 92 130 86V120Z") +
    wins(83, 76, 2, 5, 4, 8, 1.6, 3.2) + wins(101, 88, 2, 4, 4, 8, 1.6, 3.2);
  const near =
    // Rhine Tower: a slim shaft with its sphere
    path("M37 120L39.6 66H42.4L45 120Z") + rect(39.6, 62, 2.8, 6) + circle(41, 58, 5.6) + rect(40.4, 14, 1.2, 40) + wins(37, 56, 3, 1, 2.8, 3, 1.2, 1.6) + path("M36 58H46", "sc-pipe") +
    // St Lambertus: a basilica with its leaning, twisted spire
    rect(52, 88, 32, 32) + path("M52 88L68 76L84 88Z") + rect(59, 66, 12, 22) + path("M59 66L67 50L72 38L73 50L71 66Z") + rect(66.4, 28, 1.2, 12) +
    wins(55, 94, 5, 2, 5.4, 10, 1.7, 4.6) + wins(61, 70, 2, 3, 5, 6, 1.5, 3) +
    // The cable-stayed bridge: a tall pylon with its cables
    rect(128, 40, 3.4, 78) + rect(124, 110, 12, 4) + rect(88, 112, 72, 3) +
    path("M129.7 44L92 112M129.7 44L104 112M129.7 44L116 112M129.7 44L142 112M129.7 44L154 112M129.7 44L160 112", "sc-wire") + rect(126, 40, 7.4, 2.4);
  const ground = WATER + waves([[8, 126, 24], [44, 134, 34], [96, 132, 24, 1], [124, 140, 28, 1.4], [18, 144, 30, 0.7], [70, 148, 36, 1.8], [118, 152, 26, 0.4]]);
  const fx = circle(108, 28, 6, "sc-sun") + circle(108, 28, 11, "sc-glow") + cloud(30, 26, 1, 38) + cloud(138, 52, 0.6, 48) + bird(70, 32) + bird(82, 26, 0.8) + bird(18, 52, 1.4);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Leipzig
const leipzig = () => {
  setSeed(9008);
  const far = path("M0 108C28 104 64 108 100 104S140 104 160 108V122H0Z");
  const mid =
    houses(0, 160, 120, 8, 14) +
    // Thomaskirche: a church with a steep roof and a slim tower
    rect(94, 84, 18, 36) + path("M94 84L103 62L112 84Z") + rect(98, 52, 6, 12) + spire(101, 52, 12, 6);
  const near =
    // Monument to the Battle of the Nations: huge stepped stone, a domed top and big figures
    rect(6, 110, 54, 10) + rect(10, 98, 46, 12) + rect(14, 84, 38, 14) + rect(19, 54, 28, 30) + dome(33, 54, 14) + rect(28, 36, 10, 6) + rect(31, 28, 4, 8) +
    rect(14, 88, 4, 10) + rect(48, 88, 4, 10) + rect(24, 62, 18, 2, "sc-band") + path("M23 70H43M23 76H43", "sc-pipe") + wins(24, 88, 5, 1, 4.4, 6, 1.6, 4) +
    // New Town Hall tower with its clock
    rect(64, 90, 40, 30) + rect(70, 50, 12, 40) + spire(76, 50, 16, 13) + circle(76, 62, 3.6, "sc-wheel") + rect(68, 76, 16, 3) + wins(66, 94, 8, 3, 4.6, 8, 1.7, 4) +
    // City-Hochhaus, the tooth-shaped tower
    path("M114 120V64C114 54 122 50 122 32H130C130 50 138 54 138 64V120Z") + wins(118, 66, 4, 11, 4.4, 4.6, 1.5, 2.4) + rect(125.4, 22, 1.2, 10);
  const ground = WATER + waves([[10, 126, 24], [46, 134, 30], [96, 130, 24, 1], [124, 138, 28, 1.4], [20, 144, 30, 0.7], [76, 148, 34, 1.8]]);
  const fx = circle(100, 30, 6, "sc-sun") + circle(100, 30, 11, "sc-glow") + cloud(36, 20, 1, 38) + cloud(138, 36, 0.7, 50) + bird(60, 34) + bird(72, 28, 0.7) + bird(124, 22, 1.3);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Dortmund
const dortmund = () => {
  setSeed(9009);
  const far = path("M0 108C30 104 66 108 100 104S140 104 160 108V122H0Z");
  const mid =
    houses(0, 160, 120, 8, 14) +
    // The stadium: low stands with steel arches and flood-light masts
    rect(86, 100, 58, 20) + path("M88 100Q102 82 116 100M116 100Q130 82 144 100", "sc-frame") + rect(88, 80, 1.6, 20) + rect(142, 80, 1.6, 20) + rect(86, 78, 5, 2) + rect(140, 78, 5, 2);
  const near =
    // U-Tower: a tall stem with the big lit cube and its "U"
    rect(20, 66, 20, 52) + rect(14, 38, 32, 28) + rect(20, 42, 5, 20, "sc-win") + rect(35, 42, 5, 20, "sc-win") + rect(25, 57, 10, 5, "sc-win") + wins(23, 72, 3, 6, 5, 7.2, 1.6, 3.4) +
    // Reinoldikirche: a church with a baroque spire
    rect(54, 90, 28, 30) + path("M54 90L68 76L82 90Z") + rect(60, 56, 12, 34) + onion(66, 56, 6.6, 12) + spire(66, 44, 22, 3) + wins(58, 96, 4, 2, 5.4, 10, 1.7, 4.4) + wins(62, 62, 2, 3, 5, 7, 1.5, 3) +
    // Florian television tower: a shaft with its disc and cabin
    rect(125.6, 44, 3.2, 74) + rect(118, 40, 18, 5) + rect(121, 34, 12, 6) + rect(126.4, 10, 1.2, 24) + wins(120, 41.4, 6, 1, 2.8, 2, 1.4, 1.4);
  const ground = STREET + path("M0 128H160M0 144H160", "sc-road");
  const fx = circle(78, 30, 6, "sc-sun") + circle(78, 30, 11, "sc-glow") + smoke(100, 78, 0.4, 14) + cloud(36, 22, 1, 38) + cloud(118, 22, 0.7, 48) + bird(56, 34) + bird(68, 28, 0.7) + bird(146, 52, 1.4);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Nuremberg
const nuremberg = () => {
  setSeed(9010);
  const far = path("M0 108C26 104 60 108 96 104S136 104 160 108V122H0Z");
  const timber = ["M116 98L124 108", "M130 96L138 106", "M142 100L150 108"].map((d) => path(d, "sc-wire")).join("");
  const mid = houses(110, 160, 120, 14, 26) + timber;
  const near =
    // The Imperial Castle on its sandstone hill: walls, the round tower and the pentagonal tower
    path("M0 120V104C8 98 16 90 28 86H62C66 98 72 110 78 120Z") +
    rect(12, 68, 50, 18) + rect(8, 62, 9, 14) + gable(7.4, 62, 10.2, 5) + rect(22, 54, 20, 14) + gable(21, 54, 22, 7) +
    rect(46, 44, 12, 24) + spire(52, 44, 14, 14) + wins(24, 58, 4, 1, 4.6, 5, 2, 3.4) + wins(16, 72, 6, 1, 7, 5, 2, 3.4) +
    // St Lorenz: a church with two tall spires and a rose window
    rect(82, 80, 28, 40) + path("M82 80L96 66L110 80Z") + rect(83, 54, 8, 26) + spire(87, 54, 26, 8) + rect(101, 54, 8, 26) + spire(105, 54, 26, 8) + circle(96, 92, 5, "sc-wheel") +
    wins(84, 60, 2, 3, 3.6, 6, 1.5, 3) + wins(84, 100, 6, 2, 4, 8, 1.6, 4) +
    // A stone bridge over the river
    bridge(112, 156, 110, 118, 2);
  const ground = WATER + waves([[8, 126, 24], [44, 134, 34], [96, 132, 24, 1], [124, 140, 28, 1.4], [18, 144, 30, 0.7], [70, 148, 36, 1.8], [118, 152, 26, 0.4]]);
  const fx = circle(134, 32, 6, "sc-sun") + circle(134, 32, 11, "sc-glow") + cloud(34, 24, 1, 38) + cloud(90, 36, 0.7, 48) + bird(60, 34) + bird(72, 28, 0.7) + bird(110, 20, 1.3);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Bremen
const bremen = () => {
  setSeed(9011);
  const far = path("M0 108C28 104 62 108 98 104S140 104 160 108V122H0Z");
  const mid = houses(0, 160, 120, 8, 16);
  const near =
    // The Town Hall: arcades, an ornate gable and a copper roof
    rect(26, 84, 56, 36) + path("M26 84H82L78 76H72L70 68H62L60 60H50L48 68H40L38 76H30Z") + circle(55, 70, 3.4, "sc-wheel") + rect(24, 82, 60, 3) +
    path("M28 112A3 8 0 0 1 34 112V120H28ZM38 112A3 8 0 0 1 44 112V120H38ZM48 112A3 8 0 0 1 54 112V120H48ZM58 112A3 8 0 0 1 64 112V120H58ZM68 112A3 8 0 0 1 74 112V120H68Z", "sc-arch") +
    wins(30, 88, 9, 2, 5.6, 8, 1.8, 3.6) +
    // Roland: a tall statue with a shield and a sword
    rect(10, 104, 10, 16) + rect(12, 78, 6, 26) + circle(15, 74, 3) + rect(20, 80, 4, 8) + rect(9, 86, 3, 12) + rect(14.4, 62, 1.2, 12) +
    // St Peter's Cathedral: two tall spires
    rect(92, 82, 32, 38) + path("M92 82L108 70L124 82Z") + rect(93, 54, 9, 28) + spire(97.5, 54, 26, 9) + rect(114, 54, 9, 28) + spire(118.5, 54, 26, 9) +
    wins(94, 60, 2, 3, 4.6, 6, 1.5, 3) + wins(94, 88, 7, 2, 4.2, 9, 1.6, 4.4) +
    // The Town Musicians: a donkey, a dog, a cat and a rooster on top of each other
    rect(128, 106, 14, 8) + rect(129, 114, 2.4, 6) + rect(139, 114, 2.4, 6) + rect(142, 100, 4, 8) + rect(144, 96, 5, 4) +
    rect(130, 99, 10, 7) + rect(132, 92, 8, 7) + circle(139.4, 92, 2.4) + rect(133, 86, 6, 6) + circle(137, 84, 2.2) + path("M135.8 82L137 78L138.2 82Z") + rect(130, 80, 4, 6);
  const ground = STREET + path("M0 128H160M0 144H160", "sc-road") + path("M18 128V160M54 128V160M92 128V160M130 128V160", "sc-wire");
  const fx = circle(78, 30, 6, "sc-sun") + circle(78, 30, 11, "sc-glow") + cloud(32, 28, 1, 38) + cloud(124, 26, 0.7, 48) + bird(52, 38) + bird(64, 32, 0.7) + bird(100, 44, 1.3);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Dresden
const dresden = () => {
  setSeed(9012);
  const far = path("M0 100C20 92 44 98 66 94S110 88 130 96 152 94 160 98V122H0Z");
  const mid = houses(0, 160, 120, 8, 14);
  const near =
    // Frauenkirche: a great stone bell dome with a lantern and four corner towers
    rect(36, 90, 54, 30) + path("M40 90C40 70 52 52 63 52C74 52 86 70 86 90Z") + rect(59, 38, 8, 14) + dome(63, 38, 4.4) + rect(62.4, 26, 1.2, 8) + circle(63, 24, 1.3) +
    rect(36, 74, 6, 16) + rect(84, 74, 6, 16) + dome(39, 74, 3.6) + dome(87, 74, 3.6) +
    path("M46 72Q63 56 80 72", "sc-pipe") + wins(40, 96, 8, 2, 5.8, 10, 1.7, 5) + wins(54, 62, 5, 2, 4.4, 8, 1.4, 3.4) +
    // The Hofkirche tower with its curved cap
    rect(96, 66, 10, 54) + onion(101, 66, 5.6, 12) + spire(101, 54, 14, 2.6) + rect(92, 90, 20, 30) + wins(98, 72, 2, 3, 4, 8, 1.5, 3.6) +
    // The Semperoper: a low front with a big round arch
    rect(8, 90, 28, 30) + rect(6, 88, 32, 3) + path("M15 120V104A6 14 0 0 1 27 104V120Z", "sc-arch") + wins(10, 96, 2, 2, 3.4, 8, 1.7, 4) + wins(29, 96, 2, 2, 3.4, 8, 1.7, 4) +
    // The Albert Bridge with its stone arches
    bridge(114, 156, 110, 118, 3);
  const ground = WATER + waves([[8, 126, 24], [44, 134, 34], [96, 132, 24, 1], [124, 140, 28, 1.4], [18, 144, 30, 0.7], [70, 148, 36, 1.8], [118, 152, 26, 0.4]]);
  const fx = circle(130, 30, 6, "sc-sun") + circle(130, 30, 11, "sc-glow") + cloud(34, 24, 1, 38) + cloud(86, 20, 0.7, 48) + bird(64, 32) + bird(76, 26, 0.7) + bird(18, 50, 1.3);
  return { far, mid, near, ground, fx };
};

export const deScenes = {
  Berlin: build(berlin()),
  Hamburg: build(hamburg()),
  Munich: build(munich()),
  Cologne: build(cologne()),
  Frankfurt: build(frankfurt()),
  Stuttgart: build(stuttgart()),
  "Düsseldorf": build(duesseldorf()),
  Leipzig: build(leipzig()),
  Dortmund: build(dortmund()),
  Nuremberg: build(nuremberg()),
  Bremen: build(bremen()),
  Dresden: build(dresden()),
};
