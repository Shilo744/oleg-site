// The founder plate. Contour lines move slowly, drawn in a worker when possible.
import { createPlate } from "./plate-core";

export function initPlate(plate: HTMLElement) {
  const canvas = plate.querySelector<HTMLCanvasElement>("canvas.topo-live");
  if (!canvas) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ratio = Math.min(devicePixelRatio || 1, 2);
  let size = canvas.clientWidth;
  if (!size) return;
  const live = () => plate.classList.add("is-live");
  let play = () => {};
  let pause = () => {};
  let resize = (_next: number) => {};
  let started = false;

  if ("transferControlToOffscreen" in canvas && typeof Worker !== "undefined") {
    try {
      // Make the worker first. The canvas is handed over only when the worker exists.
      const worker = new Worker(new URL("./plate.worker.ts", import.meta.url), { type: "module" });
      const offscreen = canvas.transferControlToOffscreen();
      worker.onmessage = (event) => { if (event.data.type === "ready") live(); };
      worker.postMessage({ type: "init", canvas: offscreen, size, ratio, reduce }, [offscreen]);
      play = () => worker.postMessage({ type: "play" });
      pause = () => worker.postMessage({ type: "pause" });
      resize = (next) => worker.postMessage({ type: "resize", size: next, ratio });
      started = true;
    } catch {
      /* The browser refused. Draw on the main thread below. */
    }
  }
  if (!started) {
    const context = canvas.getContext("2d");
    if (!context) return;
    const renderer = createPlate(context);
    const start = performance.now();
    let timer = 0;
    const paint = () => renderer.draw(reduce ? 6 : (performance.now() - start) / 1000 + 6);
    const setSize = (next: number) => { canvas.width = canvas.height = Math.round(next * ratio); renderer.resize(next, ratio); };
    setSize(size);
    paint();
    live();
    play = () => { if (!reduce && !timer) timer = window.setInterval(paint, 1000 / 24); };
    pause = () => { clearInterval(timer); timer = 0; };
    resize = (next) => { setSize(next); paint(); };
  }

  new ResizeObserver(() => {
    const next = canvas.clientWidth;
    if (next && next !== size) { size = next; resize(next); }
  }).observe(canvas);
  if (reduce) return;
  let onScreen = false;
  const sync = () => (onScreen && !document.hidden ? play() : pause());
  new IntersectionObserver((entries) => { onScreen = entries[0].isIntersecting; sync(); }).observe(plate);
  document.addEventListener("visibilitychange", sync);
}
