// Draws the founder plate contour lines off the main thread.
import { createPlate } from "./plate-core";

let plate: ReturnType<typeof createPlate> | null = null;
let canvas: OffscreenCanvas | null = null;
let timer: ReturnType<typeof setInterval> | undefined;
let started = 0;
let reduce = false;
let announced = false;

const frame = () => {
  plate?.draw((performance.now() - started) / 1000 + 6);
  if (!announced) { announced = true; postMessage({ type: "ready" }); }
};
const play = () => {
  if (reduce || timer) return;
  timer = setInterval(frame, 1000 / 24); // about 24 frames per second
};
const pause = () => { clearInterval(timer); timer = undefined; };

self.onmessage = (event: MessageEvent) => {
  const data = event.data;
  if (data.type === "init") {
    canvas = data.canvas as OffscreenCanvas;
    reduce = data.reduce;
    canvas.width = canvas.height = Math.round(data.size * data.ratio);
    plate = createPlate(canvas.getContext("2d")!);
    plate.resize(data.size, data.ratio);
    started = performance.now();
    if (reduce) { plate.draw(6); postMessage({ type: "ready" }); } else frame();
  } else if (data.type === "resize" && canvas && plate) {
    canvas.width = canvas.height = Math.round(data.size * data.ratio);
    plate.resize(data.size, data.ratio);
    if (reduce) plate.draw(6); else frame();
  } else if (data.type === "play") play();
  else if (data.type === "pause") pause();
};
