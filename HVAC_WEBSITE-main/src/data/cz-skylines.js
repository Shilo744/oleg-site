// City models for the Czech map lens. Stylised, not to scale.
// Each city is a small diorama in layers: far, mid, near, ground, fx. Colours come from CSS classes in visuals.css.
import { setSeed, rect, path, circle, gable, spire, dome, onion, wins, houses, bridge, cloud, bird, waves, smoke, WATER, STREET, build } from "./scene-kit.js";

// ---------------------------------------------------------------- Prague
const prague = () => {
  setSeed(101);
  const far =
    path("M0 108C16 96 32 102 50 98S88 90 108 96 144 92 160 100V122H0Z") +
    rect(23, 78, 1.6, 22) + path("M19 100L24 78L29 100Z");
  const mid =
    houses(64, 160, 120, 8, 20) +
    // Tyn Church: two tall spires
    rect(84, 66, 24, 54) + spire(89, 66, 36, 7) + spire(103, 66, 36, 7) + rect(93, 58, 4, 8) +
    // St Nicholas: a green dome with a lantern
    dome(122, 92, 9) + rect(120.6, 76, 2.8, 5) + spire(122, 76, 8, 3.4);
  const near =
    // Castle hill with St Vitus cathedral, its two towers and its spire
    path("M0 120V104C8 100 16 92 28 90H78C80 98 84 110 90 120Z") +
    rect(30, 62, 38, 28) + rect(30, 44, 10, 18) + rect(58, 44, 10, 18) +
    spire(35, 44, 24, 10) + spire(63, 44, 24, 10) + spire(49, 62, 18, 4.5) + path("M30 62L49 52L68 62Z") +
    rect(10, 76, 18, 14) + rect(70, 76, 12, 14) + gable(69, 76, 14, 5) +
    wins(33, 66, 7, 2, 4.8, 8, 1.6, 4) + wins(32, 48, 2, 3, 5, 4.4, 1.5, 2.4) + wins(60, 48, 2, 3, 5, 4.4, 1.5, 2.4) + wins(12, 79, 4, 2, 4, 5) +
    // Zizkov television tower
    rect(139, 50, 3.2, 70) + rect(135.4, 64, 10.4, 6) + rect(136.4, 78, 8.4, 5) + rect(137.2, 90, 6.8, 4.4) + rect(140.3, 32, 0.9, 18) +
    // Charles Bridge with its two gate towers
    bridge(58, 150, 108, 118, 7) + rect(56, 94, 6, 14) + gable(55.4, 94, 7.2, 5) + rect(146, 96, 6, 12) + gable(145.4, 96, 7.2, 5);
  const ground = WATER + waves([[8, 126, 22], [42, 132, 34], [90, 127, 24, 1], [120, 136, 30, 1.4], [20, 142, 28, 0.7], [70, 146, 36, 1.8], [118, 150, 26, 0.4]]);
  const fx = circle(118, 36, 7, "sc-sun") + circle(118, 36, 12, "sc-glow") + cloud(34, 26, 1, 34) + cloud(100, 52, 0.7, 42) + bird(60, 34) + bird(72, 28, 0.6) + bird(84, 36, 1.2);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Brno
const brno = () => {
  setSeed(202);
  const far = path("M0 100C20 90 44 98 66 94S110 86 130 94 152 92 160 96V122H0Z");
  const mid =
    houses(0, 160, 120, 8, 18) +
    // Old Town Hall tower
    rect(58, 76, 8, 44) + spire(62, 76, 14, 9) + rect(60, 66, 4, 10);
  const near =
    // Spilberk castle on its hill
    path("M0 120V96C10 90 20 82 32 80H62C64 92 70 108 78 120Z") +
    rect(14, 66, 40, 16) + rect(10, 60, 8, 10) + rect(48, 56, 10, 14) + gable(47, 56, 12, 5) + rect(28, 58, 6, 8) + rect(30.6, 48, 0.9, 10) +
    path("M10 82L14 70H54L58 82Z") + wins(18, 70, 6, 1, 6, 5, 2, 3) +
    // Cathedral of St Peter and Paul: two slim spires
    rect(92, 74, 30, 46) + rect(92, 56, 9, 18) + rect(113, 56, 9, 18) + spire(96.5, 56, 38, 9) + spire(117.5, 56, 38, 9) + path("M92 74L107 62L122 74Z") +
    wins(94, 80, 6, 4, 4.6, 8, 1.6, 4) + wins(93.6, 60, 2, 3, 5, 4.6, 1.6, 2.4) + wins(114.6, 60, 2, 3, 5, 4.6, 1.6, 2.4) +
    // A modern block on the right and a tram line
    rect(132, 92, 22, 28) + rect(130, 90, 26, 3) + wins(135, 97, 4, 3, 4.6, 7, 2.4, 3.4) +
    path("M0 96H160", "sc-wire") + rect(78, 90, 1, 30);
  const ground = STREET + path("M0 128H160M0 142H160", "sc-road") + waves([[10, 134, 18, 0], [60, 134, 24, 0.8], [110, 134, 20, 1.6], [30, 148, 30, 0.4], [96, 148, 28, 1.2]]).replaceAll("sc-wave", "sc-street");
  const fx = circle(40, 38, 5, "sc-sun") + circle(40, 38, 11, "sc-glow") + cloud(100, 30, 1, 38) + cloud(26, 60, 0.6, 46) + bird(76, 28) + bird(88, 34, 0.8);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Ostrava
const ostrava = () => {
  setSeed(303);
  const far = path("M0 108L40 98L64 106L96 90L112 74L124 92L160 100V122H0Z");
  const mid =
    // saw-tooth factory halls
    path("M0 120V96L12 88V96L24 88V96L36 88V96L48 88V120Z") + path("M100 120V100L112 92V100L124 92V100L136 92V120Z") + rect(144, 96, 16, 24);
  const near =
    // Vitkovice blast furnaces with pipes and the Bolt Tower
    rect(36, 62, 10, 58) + rect(52, 48, 12, 72) + rect(70, 70, 9, 50) + path("M34 62H48L46 56H36Z") + path("M50 48H66L63 40H53Z") + path("M68 70H81L79 64H70Z") +
    path("M46 70L52 60M64 66L70 76M46 90L52 82M64 90L70 96", "sc-pipe") + rect(53, 22, 10, 18) + path("M53 22L58 14L63 22Z") + path("M56 40V22M60 40V22", "sc-pipe") + rect(57.4, 6, 0.9, 8) +
    wins(54, 54, 3, 4, 3.6, 8, 1.4, 2.2) + wins(38, 70, 2, 5, 4, 9, 1.4, 2.4) +
    // a gas holder drum
    rect(94, 76, 36, 44) + dome(112, 76, 18) + path("M94 90H130M94 104H130", "sc-pipe") + rect(110, 54, 4, 8) +
    // pit headframe with its two wheels
    path("M136 120L146 56L156 120", "sc-frame") + path("M138 98H154M140 84H152M142 70H150M138 98L152 84M154 98L140 84", "sc-frame") + circle(143.5, 52, 5, "sc-wheel") + circle(148.5, 52, 5, "sc-wheel") +
    // two tall chimneys with bands
    rect(14, 52, 5, 68) + rect(14, 60, 5, 3, "sc-band") + rect(14, 72, 5, 3, "sc-band") + rect(24, 66, 4, 54) + rect(24, 74, 4, 3, "sc-band");
  const ground = STREET + path("M0 124H160M0 136H160M0 148H160", "sc-road");
  const fx = circle(58, 66, 9, "sc-furnace") + circle(120, 34, 5, "sc-sun") + circle(120, 34, 9, "sc-glow") + smoke(16.5, 52, 0) + smoke(26, 66, 1.2, 18) + smoke(112, 54, 2.2, 20) + cloud(32, 28, 0.9, 40) + cloud(88, 22, 0.6, 50) + bird(130, 58);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Plzen
const plzen = () => {
  setSeed(404);
  const far = path("M0 104C20 98 44 102 70 98S120 92 140 98 156 96 160 100V122H0Z");
  const mid = houses(0, 52, 120, 8, 18) + houses(92, 160, 120, 8, 16);
  const near =
    // St Bartholomew's cathedral: a long nave, a west tower and the tallest spire in the country
    rect(30, 78, 54, 42) + path("M30 78L57 62L84 78Z") + rect(54, 48, 14, 30) + spire(61, 48, 40, 10) + rect(52.6, 56, 2, 6) + rect(68.4, 56, 2, 6) +
    spire(53.5, 56, 8, 2.4) + spire(68.5, 56, 8, 2.4) + rect(60.6, 4, 0.9, 6) +
    wins(33, 84, 10, 3, 5, 10, 1.7, 5) + wins(56, 52, 2, 3, 5, 6, 1.7, 3.4) +
    // Great Synagogue: two domed towers and a rose window
    rect(96, 70, 26, 50) + rect(96, 58, 7, 12) + rect(115, 58, 7, 12) + onion(99.5, 58, 4.4, 12) + onion(118.5, 58, 4.4, 12) + circle(109, 82, 5, "sc-wheel") + wins(98, 96, 6, 2, 3.6, 8, 1.6, 4) +
    // brewery chimneys and a water tower
    rect(130, 56, 4, 64) + rect(138, 66, 3, 54) + rect(146, 76, 10, 44) + path("M144 76H158L151 64Z") + rect(147, 92, 8, 3, "sc-band") + wins(148, 100, 2, 3, 4, 5.6, 1.6, 2.6);
  const ground = STREET + path("M0 130H160M0 146H160", "sc-road");
  const fx = circle(26, 34, 5, "sc-sun") + circle(26, 34, 11, "sc-glow") + smoke(132, 56, 0.4, 20) + smoke(139.5, 66, 1.6, 18) + cloud(96, 28, 1, 36) + cloud(130, 50, 0.6, 48) + bird(44, 30) + bird(56, 24, 0.7);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Liberec
const liberec = () => {
  setSeed(505);
  const far = path("M0 110C20 100 40 106 60 100L98 84L126 56L160 92V122H0Z");
  const mid =
    path("M60 120L100 80L130 56L160 84V120Z") + houses(0, 24, 120, 8, 16) + houses(70, 160, 120, 6, 12) +
    // dark conifers on the slope
    [64, 72, 80, 88, 96].map((x, i) => gable(x, 118, 7, 10 + (i % 2) * 4)).join("");
  const near =
    // Jested tower: a slim curved tower with its antenna, on the summit
    path("M118 62C122 58 123 56 125 54L127 40L128.6 54C130 56 131 58 135 62Z") + path("M125 54L127.6 12L128.6 54Z") + rect(127.4, 4, 0.9, 8) +
    path("M122 62h12v3h-12Z") +
    // Town hall: a tall central tower and gables
    rect(18, 80, 40, 40) + rect(32, 52, 12, 28) + onion(38, 52, 6.4, 18) + rect(37.4, 26, 1, 8) + circle(38, 62, 3.4, "sc-wheel") +
    gable(18, 80, 14, 8) + gable(44, 80, 14, 8) + wins(21, 86, 8, 3, 4.4, 10, 1.7, 5) + wins(34.4, 56, 2, 2, 5, 7, 1.6, 3.4) +
    rect(60, 96, 20, 24) + gable(59, 96, 22, 7) + wins(63, 100, 3, 2, 5, 8, 2, 3.4);
  const ground = STREET + path("M0 128H160M0 144H160", "sc-road");
  const fx = circle(34, 34, 5, "sc-sun") + circle(34, 34, 9, "sc-glow") + cloud(88, 24, 1, 40) + cloud(116, 40, 0.7, 52) + bird(62, 30) + bird(74, 36, 0.9);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Olomouc
const olomouc = () => {
  setSeed(606);
  const far = path("M0 106C24 100 48 104 70 100S116 96 140 100 156 98 160 102V122H0Z");
  const mid = houses(0, 160, 120, 8, 16) + dome(100, 98, 8) + rect(99, 86, 2, 4);
  const near =
    // St Wenceslas cathedral: a nave and a tall neo-Gothic spire
    rect(14, 78, 40, 42) + path("M14 78L34 66L54 78Z") + rect(26, 40, 14, 38) + spire(33, 40, 32, 12) + wins(17, 84, 8, 2, 4.6, 10, 1.6, 5) + wins(28, 46, 2, 3, 6, 8, 1.6, 3.6) +
    // Holy Trinity column: a tall baroque monument of stacked tiers
    rect(70, 106, 20, 14) + rect(73, 94, 14, 12) + rect(76, 78, 8, 16) + rect(78, 52, 4, 26) + circle(80, 48, 3.4) + spire(80, 46, 12, 4) +
    rect(74, 88, 3, 5) + rect(83, 88, 3, 5) + rect(76.4, 70, 7, 3) +
    // Town hall tower with an astronomical clock
    rect(116, 58, 14, 62) + circle(123, 72, 5, "sc-wheel") + rect(114, 54, 18, 4) + onion(123, 54, 7, 16) + rect(122.4, 30, 1.2, 8) + wins(118, 86, 3, 3, 4, 9, 1.6, 4) +
    rect(134, 88, 22, 32) + gable(133, 88, 24, 9) + wins(137, 94, 4, 2, 4.6, 8, 1.8, 3.6);
  const ground = STREET + path("M0 130H160M0 146H160", "sc-road");
  const fx = circle(100, 34, 5, "sc-sun") + circle(100, 34, 11, "sc-glow") + cloud(26, 26, 1, 36) + cloud(60, 48, 0.7, 48) + bird(120, 28) + bird(132, 34, 0.8);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Ceske Budejovice
const budejovice = () => {
  setSeed(707);
  const far = path("M0 108C20 102 42 106 66 102S112 98 136 102 154 100 160 104V122H0Z");
  const mid = houses(60, 160, 120, 10, 22);
  const near =
    // The Black Tower with its gallery and pointed roof
    rect(26, 46, 16, 74) + rect(23, 66, 22, 5) + path("M24 46L34 22L44 46Z") + gable(26, 46, 16, 8) + rect(33.4, 8, 1, 14) + circle(34, 56, 3, "sc-wheel") + wins(29, 78, 3, 5, 4.6, 8, 1.8, 3.6) + rect(32, 104, 4, 16) +
    // St Nicholas cathedral beside it
    rect(46, 82, 24, 38) + path("M46 82L58 68L70 82Z") + rect(54, 56, 8, 26) + spire(58, 56, 18, 8) + wins(49, 88, 4, 2, 5.2, 10, 1.7, 5) +
    // Samson fountain in the square
    rect(86, 108, 28, 4) + rect(90, 104, 20, 4) + rect(98, 90, 4, 14) + circle(100, 86, 4) + path("M96 92L104 92L102 98H98Z") +
    // arcaded houses with stepped gables
    rect(122, 84, 36, 36) + path("M122 84H158V76H150V70H142V76H138V66H130V76H122Z") + wins(125, 90, 7, 2, 4.8, 8, 1.8, 3.6) + path("M122 108A3 6 0 0 1 128 108V120H122ZM132 108A3 6 0 0 1 138 108V120H132ZM142 108A3 6 0 0 1 148 108V120H142Z", "sc-arch");
  const ground = WATER + waves([[8, 126, 22], [44, 132, 32], [96, 128, 24, 1], [126, 136, 28, 1.4], [20, 144, 30, 0.7], [76, 148, 34, 1.8]]);
  const fx = circle(120, 34, 5, "sc-sun") + circle(120, 34, 11, "sc-glow") + cloud(80, 30, 1, 36) + cloud(24, 24, 0.7, 48) + bird(64, 34) + bird(76, 28, 0.7);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Hradec Kralove
const hradec = () => {
  setSeed(808);
  const far = path("M0 106C22 100 44 104 68 100S116 96 138 100 156 98 160 102V122H0Z");
  const mid = houses(0, 52, 120, 8, 16) + houses(104, 160, 120, 8, 18);
  const near =
    // The White Tower with a baroque cupola
    rect(56, 38, 16, 82) + rect(53, 58, 22, 4) + rect(53, 82, 22, 4) + dome(64, 38, 9) + path("M60 29h8v-7h-8Z") + spire(64, 22, 14, 4) + circle(64, 46, 3, "sc-wheel") + wins(59, 66, 3, 3, 4.4, 5, 1.6, 2.6) + wins(59, 92, 3, 5, 4.4, 5.6, 1.6, 3) +
    // The brick cathedral with a single tower
    rect(84, 80, 30, 40) + path("M84 80L99 68L114 80Z") + rect(104, 54, 10, 26) + path("M103 54L109 36L115 54Z") + wins(87, 86, 6, 3, 4.4, 9, 1.6, 4.4) + wins(106, 58, 2, 3, 4.4, 6, 1.5, 3.4) +
    // a modern block and a bridge
    rect(8, 82, 30, 38) + rect(6, 80, 34, 3) + wins(11, 88, 6, 4, 4.6, 8, 2.4, 4.6) + rect(130, 96, 24, 24) + wins(133, 100, 5, 2, 4.4, 8, 2, 3.6) +
    bridge(118, 160, 112, 118, 3);
  const ground = WATER + waves([[10, 126, 24], [46, 132, 30], [92, 127, 26, 1], [128, 136, 26, 1.4], [24, 142, 28, 0.7], [80, 148, 34, 1.8]]);
  const fx = circle(30, 34, 5, "sc-sun") + circle(30, 34, 11, "sc-glow") + cloud(90, 26, 1, 38) + cloud(122, 48, 0.7, 50) + bird(50, 24) + bird(62, 30, 0.7);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Pardubice
const pardubice = () => {
  setSeed(909);
  const far = path("M0 108C22 102 46 106 70 102S118 98 140 102 156 100 160 104V122H0Z");
  const mid = houses(60, 160, 120, 8, 16) + houses(0, 14, 120, 8, 14);
  const near =
    // The Green Gate: a gate tower with two pointed turrets and an arch
    rect(20, 58, 30, 62) + rect(16, 52, 8, 14) + rect(46, 52, 8, 14) + spire(20, 52, 14, 10) + spire(50, 52, 14, 10) + path("M24 58H46L35 40Z") + rect(34.4, 22, 1, 18) +
    path("M28 120V104A7 8 0 0 1 42 104V120Z", "sc-arch") + wins(23, 66, 5, 3, 5, 9, 1.8, 4) +
    // castle wall with a round bastion
    rect(54, 92, 42, 28) + rect(54, 88, 42, 4) + circle(100, 100, 12) + rect(88, 100, 24, 20) + path("M86 100L100 84L114 100Z") + wins(58, 98, 8, 2, 4.8, 8, 1.8, 3.6) +
    // church tower with an onion dome
    rect(122, 62, 14, 58) + onion(129, 62, 8, 20) + rect(128.4, 34, 1.2, 8) + circle(129, 76, 3.2, "sc-wheel") + wins(124, 90, 3, 3, 4.4, 9, 1.6, 4) +
    rect(138, 92, 22, 28) + gable(137, 92, 24, 8);
  const ground = STREET + path("M0 130H160M0 146H160", "sc-road");
  const fx = circle(80, 32, 5, "sc-sun") + circle(80, 32, 11, "sc-glow") + cloud(34, 26, 1, 36) + cloud(112, 22, 0.7, 48) + bird(56, 34) + bird(68, 28, 0.8);
  return { far, mid, near, ground, fx };
};

// ---------------------------------------------------------------- Zlin
const zlin = () => {
  setSeed(1010);
  const far = path("M0 108C22 100 46 106 70 100S120 96 142 102 156 98 160 104V122H0Z");
  const mid = rect(0, 96, 18, 24) + rect(120, 100, 40, 20) + rect(18, 104, 22, 16);
  const near =
    // Building 21: a tall block with bands of windows and a flat roof
    rect(58, 30, 36, 90) + rect(55, 27, 42, 4) + rect(74, 18, 4, 9) + rect(75.4, 6, 0.9, 12) + wins(61, 36, 5, 9, 6.4, 9.4, 3.4, 5.4) + rect(86, 112, 6, 8) +
    // functional red-brick modules with large windows
    rect(10, 78, 40, 42) + rect(8, 76, 44, 3) + wins(13, 83, 6, 3, 6.2, 11, 4.2, 6) +
    rect(102, 70, 30, 50) + rect(100, 68, 34, 3) + wins(105, 76, 4, 4, 6.6, 10.4, 4, 5.6) +
    // a factory chimney with bands
    rect(140, 44, 5, 76) + rect(140, 54, 5, 3, "sc-band") + rect(140, 68, 5, 3, "sc-band") + rect(136, 100, 20, 20);
  const ground = STREET + path("M0 128H160M0 144H160", "sc-road");
  const fx = circle(120, 30, 5, "sc-sun") + circle(120, 30, 11, "sc-glow") + smoke(142.5, 44, 0.6, 20) + cloud(34, 24, 1, 36) + cloud(100, 46, 0.7, 50) + bird(24, 44) + bird(36, 38, 0.8);
  return { far, mid, near, ground, fx };
};

export const czSkylines = {
  Prague: build(prague()),
  Brno: build(brno()),
  Ostrava: build(ostrava()),
  "Plzeň": build(plzen()),
  Liberec: build(liberec()),
  Olomouc: build(olomouc()),
  "České Budějovice": build(budejovice()),
  "Hradec Králové": build(hradec()),
  Pardubice: build(pardubice()),
  "Zlín": build(zlin()),
};
