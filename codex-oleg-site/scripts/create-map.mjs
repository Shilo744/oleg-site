import fs from "node:fs";

const [, , source, requestedCode = "GBR"] = process.argv;
if (!source) throw new Error("Usage: node scripts/create-map.mjs <geojson> [GBR|CZE|DEU]");

const settings = {
  GBR: {
    output: "src/data/uk-path.json",
    project: ([lon, lat]) => [(lon + 8.8) * 39 + 30, (59.7 - lat) * 65 + 15],
    include: ([lon, lat]) => lat > 49 && lat < 60 && lon > -9 && lon < 3,
  },
  CZE: {
    output: "src/data/cz-path.json",
    project: ([lon, lat]) => [(lon - 12) * 95 + 20, (51.2 - lat) * 135 + 15],
    include: () => true,
  },
  DEU: {
    output: "src/data/de-path.json",
    project: ([lon, lat]) => [(lon - 5.5) * 48 + 15, (55.3 - lat) * 78 + 15],
    include: () => true,
  },
};

const code = requestedCode.toUpperCase();
const config = settings[code];
if (!config) throw new Error(`Unsupported country code: ${code}`);

const data = JSON.parse(fs.readFileSync(source, "utf8"));
const country = data.features.find((feature) => feature.properties.ADM0_A3 === code);
if (!country) throw new Error(`${code} geometry missing`);

const polygons = country.geometry.type === "MultiPolygon"
  ? country.geometry.coordinates
  : [country.geometry.coordinates];
const path = polygons
  .filter((polygon) => polygon[0].some(config.include))
  .map((polygon) => polygon.map((ring) =>
    `M${ring.map((point) => config.project(point).map((number) => number.toFixed(1)).join(",")).join("L")}Z`,
  ).join(""))
  .join("");

fs.writeFileSync(config.output, JSON.stringify(path));
console.log(`Wrote ${config.output}`);
