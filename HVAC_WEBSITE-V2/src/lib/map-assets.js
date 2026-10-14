// Build-time map assets. Pages never import this file. Only the files in src/pages/maps do.
// They write static files that the browser loads on demand and keeps in its cache:
//   /maps/<id>/contours.svg   contour lines of the map, clipped to the country on the page
//   /maps/<id>/scenes.json    the city models for the lens and for the touch sheet
import { createHash } from "node:crypto";
import czContours from "./geo/cz-contours.json";
import ukContours from "./geo/uk-contours.json";
import deContours from "./geo/de-contours.json";
import { czSkylines } from "./scenes/cz.js";
import { ukScenesA } from "./scenes/uk-a.js";
import { ukScenesB } from "./scenes/uk-b.js";
import { deScenes } from "./scenes/de.js";
import { compactPath } from "./path-tools.js";
import { markets } from "../data/markets.js";

const contours = { cz: czContours, uk: ukContours, de: deContours };
const scenes = { cz: czSkylines, uk: { ...ukScenesA, ...ukScenesB }, de: deScenes };

export const mapIds = Object.keys(markets);

const cache = new Map();
const once = (key, make) => {
  if (!cache.has(key)) cache.set(key, make());
  return cache.get(key);
};

export function contoursSvg(id) {
  return once(`c:${id}`, () => {
    const { minor, major } = contours[id];
    const [x, y, w, h] = markets[id].map.viewBox.split(" ");
    // Colours match the map: charcoal lines, soft minor lines and a firmer major line.
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${w} ${h}"><g fill="none" stroke="#17212b" stroke-linecap="round" stroke-linejoin="round">` +
      `<path d="${compactPath(minor)}" stroke-opacity=".11" stroke-width=".7"/>` +
      `<path d="${compactPath(major)}" stroke-opacity=".22" stroke-width=".9"/></g></svg>`;
  });
}

// Each city is one ready-to-insert <svg>. The label is part of the picture.
export function scenesJson(id, modelLabel = "Illustrative model") {
  return once(`s:${id}:${modelLabel}`, () => {
    const out = {};
    for (const [city, { scene }] of Object.entries(scenes[id])) {
      const size = city.length > 12 ? 5.4 : city.length > 8 ? 6.6 : 7.8;
      out[city] =
        `<svg class="scene" viewBox="0 0 160 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${scene}` +
        `<g class="sc-label"><text class="sc-name" style="font-size:${size}px" x="80" y="139" text-anchor="middle">${city.toUpperCase()}</text>` +
        `<text class="sc-sub" x="80" y="146" text-anchor="middle">${modelLabel}</text></g></svg>`;
    }
    return JSON.stringify(out);
  });
}

// A short fingerprint, so a changed file gets a new address and the old one can be cached for a year.
export const version = (text) => createHash("sha1").update(text).digest("hex").slice(0, 8);
export const contoursUrl = (id) => `/maps/${id}/contours.svg?v=${version(contoursSvg(id))}`;
export const scenesUrl = (id) => `/maps/${id}/scenes.json?v=${version(scenesJson(id))}`;
export const hasScenes = (id) => Boolean(scenes[id]);
