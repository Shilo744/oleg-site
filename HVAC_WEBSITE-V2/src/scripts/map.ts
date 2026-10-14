// Map interactions: selection, the preview card (a small card on a mouse, a sheet on touch),
// the fish-eye lens with the city model, and the coordinate readout.
//
// Cost rules for this file:
// - Geometry is measured once and kept (see "geom"). A pointer move reads nothing from the page and does only arithmetic.
// - All page writes (classes, transforms, text) happen in one animation frame loop, never inside an event handler.
// - The lens is built on the first hover, not at load.
// - The city models are one cached file, fetched when the browser is idle.
// - Nothing keeps animating when the lens is hidden.

const SVG_NS = "http://www.w3.org/2000/svg";

let scenesPromise: Promise<Record<string, string>> | null = null;
const loadScenes = (url: string | undefined) => {
  if (!url) return Promise.resolve({} as Record<string, string>);
  return (scenesPromise ??= fetch(url).then((response) => response.json()).catch(() => ({})));
};
const whenIdle = (task: () => void) =>
  "requestIdleCallback" in window ? (window as any).requestIdleCallback(task, { timeout: 4000 }) : setTimeout(task, 1500);

export function initMap(panel: HTMLElement) {
  const preview = panel.querySelector<HTMLElement>(".map-preview")!;
  const body = panel.querySelector<HTMLElement>("[data-preview-body]");
  const stage = panel.querySelector<HTMLElement>(".map-stage")!;
  const svg = panel.querySelector<SVGSVGElement>(".opportunity-map")!;
  const markers = Array.from(panel.querySelectorAll<SVGGElement>(".map-marker"));
  const routes = Array.from(panel.querySelectorAll<SVGPathElement>(".map-link"));
  const names = Array.from(panel.querySelectorAll<SVGTextElement>(".map-city-label"));
  const crossV = panel.querySelector<SVGLineElement>(".map-cross .cv");
  const crossH = panel.querySelector<SVGLineElement>(".map-cross .ch");
  const sceneUrl = panel.dataset.scenes;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sheetQuery = matchMedia("(hover: none), (max-width: 760px)");
  const sheetMode = () => sheetQuery.matches;

  let scenes: Record<string, string> | null = null;
  const fetchScenes = () => loadScenes(sceneUrl).then((all) => (scenes = all));
  whenIdle(() => void fetchScenes());

  // ---------- Geometry, measured once ----------
  // The screen matrix of the drawing and the boxes of the stage and the panel. They change only on scroll and resize.
  const geom = { dirty: true, inverse: new DOMMatrix(), scale: 1, stageLeft: 0, stageTop: 0, panelLeft: 0, panelTop: 0, panelWidth: 0, panelHeight: 0, matrix: new DOMMatrix() };
  const measure = () => {
    const matrix = svg.getScreenCTM();
    if (!matrix) return false;
    geom.matrix = matrix;
    geom.inverse = matrix.inverse();
    geom.scale = matrix.a || 1;
    const stageBox = stage.getBoundingClientRect(), panelBox = panel.getBoundingClientRect();
    geom.stageLeft = stageBox.left; geom.stageTop = stageBox.top;
    geom.panelLeft = panelBox.left; geom.panelTop = panelBox.top; geom.panelWidth = panelBox.width; geom.panelHeight = panelBox.height;
    geom.dirty = false;
    return true;
  };
  const dirty = () => { geom.dirty = true; };
  addEventListener("scroll", dirty, { passive: true });
  addEventListener("resize", dirty);
  new ResizeObserver(dirty).observe(stage);
  const ensure = () => (geom.dirty ? measure() : true);

  let active: SVGGElement | null = null;
  let closeTimer = 0;
  let touched = false;
  let openedAt = 0;
  let restoring = false;

  // ---------- Selection: the others fade, the signal line grows, cross lines meet on the city ----------
  const select = (marker: SVGGElement | null) => {
    for (const item of markers) {
      item.classList.toggle("is-selected", item === marker);
      item.setAttribute("aria-pressed", String(item === marker));
    }
    for (const route of routes) route.classList.toggle("is-to-selected", Boolean(marker) && route.dataset.to === marker?.dataset.city);
    for (const name of names) name.classList.toggle("is-dim", Boolean(marker) && name.dataset.for !== marker?.dataset.city);
    if (marker) stage.setAttribute("data-selected", marker.dataset.city || "");
    else stage.removeAttribute("data-selected");
    if (crossV && crossH && marker) {
      const box = svg.viewBox.baseVal;
      const { cx = "0", cy = "0" } = marker.dataset;
      crossV.setAttribute("x1", cx); crossV.setAttribute("x2", cx); crossV.setAttribute("y1", String(box.y)); crossV.setAttribute("y2", String(box.y + box.height));
      crossH.setAttribute("y1", cy); crossH.setAttribute("y2", cy); crossH.setAttribute("x1", String(box.x)); crossH.setAttribute("x2", String(box.x + box.width));
    }
  };

  const close = (restore = false) => {
    clearTimeout(closeTimer);
    preview.classList.remove("is-open");
    preview.hidden = true;
    preview.style.transform = "";
    panel.classList.remove("is-sheet-open");
    select(null);
    // Give focus back to the marker without opening the card again.
    if (restore) { restoring = true; active?.focus(); restoring = false; }
    active = null;
  };
  // On a mouse the card stays while the pointer moves from the marker to the card.
  const closeSoon = () => {
    clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      if (!preview.matches(":hover") && !panel.contains(document.activeElement)) close();
    }, 260);
  };

  const show = (marker: SVGGElement) => {
    clearTimeout(closeTimer);
    const same = active === marker && !preview.hidden;
    active = marker;
    const city = marker.dataset.city || "";
    const template = body ? panel.querySelector<HTMLTemplateElement>(`template[data-detail="${CSS.escape(city)}"]`) : null;
    // Measure before anything is written, so the page is not forced to update twice.
    ensure();
    const dotX = geom.matrix.a * Number(marker.dataset.cx) + geom.matrix.e - geom.panelLeft;
    const dotY = geom.matrix.d * Number(marker.dataset.cy) + geom.matrix.f - geom.panelTop;
    select(marker);
    for (const key of ["title", "city", "value", "scope"]) preview.querySelector(`[data-preview-${key}]`)!.textContent = marker.dataset[key] || "";
    if (template && body && !same) {
      body.replaceChildren(template.content.cloneNode(true));
      // The touch sheet shows the city model as its picture.
      const slot = body.querySelector<HTMLElement>("[data-scene]");
      const fill = (all: Record<string, string>) => { if (slot && active === marker && all[city]) slot.innerHTML = all[city]; };
      if (scenes) fill(scenes); else void fetchScenes().then(fill);
    }
    preview.hidden = false;
    // The card opens on the side of the map that is away from the marker.
    preview.classList.toggle("is-left", dotX > geom.panelWidth / 2);
    preview.dataset.pos = dotY > geom.panelHeight / 2 ? "top" : "bottom";
    if (!same) {
      openedAt = performance.now();
      preview.classList.remove("is-open");
      void preview.offsetWidth;
      requestAnimationFrame(() => preview.classList.add("is-open"));
      if (touched && !reduceMotion) navigator.vibrate?.(10);
    }
    panel.classList.toggle("is-sheet-open", Boolean(template) && sheetMode());
  };

  for (const marker of markers) {
    marker.addEventListener("pointerdown", (event) => { touched = event.pointerType === "touch"; if (touched) void fetchScenes(); });
    marker.addEventListener("mouseenter", () => show(marker));
    marker.addEventListener("mouseleave", () => { if (!sheetMode() && document.activeElement !== marker) closeSoon(); });
    marker.addEventListener("focus", () => { if (!restoring) show(marker); });
    marker.addEventListener("click", () => show(marker));
    marker.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); show(marker); }
    });
  }
  preview.addEventListener("mouseenter", () => clearTimeout(closeTimer));
  preview.addEventListener("mouseleave", () => { if (!sheetMode() && !panel.contains(document.activeElement)) closeSoon(); });

  // A touch sheet closes when you pull it down.
  let pullFrom = 0, pulled = 0;
  preview.addEventListener("touchstart", (event) => { pullFrom = event.touches[0].clientY; pulled = 0; }, { passive: true });
  preview.addEventListener("touchmove", (event) => {
    if (!sheetMode()) return;
    pulled = event.touches[0].clientY - pullFrom;
    if (pulled > 0 && preview.scrollTop <= 0) preview.style.transform = `translateY(${pulled}px)`;
  }, { passive: true });
  preview.addEventListener("touchend", () => {
    if (!sheetMode()) return;
    if (pulled > 90 && preview.scrollTop <= 0) close(); else preview.style.transform = "";
    pulled = 0;
  });
  panel.querySelector(".preview-close")!.addEventListener("click", () => close(true));
  panel.addEventListener("mouseleave", () => { if (!sheetMode() && !panel.contains(document.activeElement)) closeSoon(); });
  panel.addEventListener("focusout", () => setTimeout(() => { if (!sheetMode() && !panel.contains(document.activeElement)) close(); }, 0));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !preview.hidden) { event.preventDefault(); close(true); }
  });
  // The dark layer behind a touch sheet belongs to the panel, so a tap on it (the panel itself) also closes.
  panel.addEventListener("click", (event) => { if (event.target === panel && performance.now() - openedAt > 400) close(); });
  document.addEventListener("click", (event) => { if (!panel.contains(event.target as Node)) close(); });

  // ---------- Pointer loop: readout and lens ----------
  const readout = panel.querySelector<HTMLElement>(".map-readout");
  const readoutData = readout ? (() => {
    const { ax, bx, ay, by, default: fallback = "" } = readout.dataset;
    const [kx, cx0, ky, cy0] = [ax, bx, ay, by].map(Number);
    return { kx, cx0, ky, cy0, fallback };
  })() : null;

  const lens = panel.querySelector<HTMLElement>(".map-lens")!;
  const zoomBox = lens.querySelector<HTMLElement>(".lens-map")!;
  const cityBox = lens.querySelector<HTMLElement>(".lens-city")!;
  const land = svg.querySelector<SVGGeometryElement>(".map-land")!;
  const ZOOM = 2.1, STRENGTH = 0.85, NEAR = 22;
  const hasHover = matchMedia("(hover: hover)").matches;
  let lensReady = false;
  let R = 88, W = 356, builtFor = 0;
  let copy: SVGSVGElement | null = null;
  let holder: SVGSVGElement | null = null;
  let filterId = "";
  let offX = 0, offY = 0;
  let dots: { node: SVGElement; x: number; y: number }[] = [];

  // Where the pointer is, and what the loop still has to do about it.
  let px = 0, py = 0, pending = false, inside = false;
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, visible = false;
  let shown = "";
  let near: SVGElement | null = null;
  let clearTimerId = 0;

  // Hit test against the outline without asking the page: a Path2D of the same path, and one canvas context.
  let hitContext: CanvasRenderingContext2D | null = null;
  let landPath: Path2D | null = null;
  const insideLand = (x: number, y: number) => {
    if (!hitContext) {
      hitContext = document.createElement("canvas").getContext("2d");
      landPath = new Path2D(land.getAttribute("d") || "");
      if (hitContext) hitContext.lineWidth = 1.1;
    }
    if (!hitContext || !landPath) return true;
    return hitContext.isPointInPath(landPath, x, y) || hitContext.isPointInStroke(landPath, x, y);
  };

  function buildFilter() {
    const D = Math.round(Math.min(Math.max(stage.clientWidth * 0.27, 112), 210));
    if (D === builtFor) return;
    builtFor = D;
    const PAD = Math.round(D / 2);
    R = D / 2; W = D + PAD * 2;
    lens.style.setProperty("--lens-d", `${D}px`);
    lens.style.setProperty("--lens-pad", `${PAD}px`);
    lens.style.setProperty("--lens-w", `${W}px`);
    // Fish-eye: a displacement map that pushes samples outward with the cube of the radius.
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = W;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const image = ctx.createImageData(W, W);
    const S = 2 * STRENGTH * R;
    for (let y = 0; y < W; y++) {
      for (let x = 0; x < W; x++) {
        const dx = x - W / 2 + 0.5, dy = y - W / 2 + 0.5, rr = Math.hypot(dx, dy);
        const r = Math.min(rr / R, 1), d = STRENGTH * R * r * r * r;
        const i = (y * W + x) * 4;
        image.data[i] = 128 + (rr ? (d * dx) / rr / S : 0) * 255;
        image.data[i + 1] = 128 + (rr ? (d * dy) / rr / S : 0) * 255;
        image.data[i + 2] = 128;
        image.data[i + 3] = 255;
      }
    }
    ctx.putImageData(image, 0, 0);
    holder!.innerHTML = `<filter id="${filterId}" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${W}" color-interpolation-filters="sRGB"><feImage href="${canvas.toDataURL()}" x="0" y="0" width="${W}" height="${W}" preserveAspectRatio="none" result="map"/><feDisplacementMap in="SourceGraphic" in2="map" scale="${S}" xChannelSelector="R" yChannelSelector="G"/></filter>`;
    zoomBox.style.filter = `url(#${filterId})`;
  }

  // The copy has a fixed size. Only its transform changes while the pointer moves.
  function sizeCopy() {
    const box = svg.getBoundingClientRect(), stageBox = stage.getBoundingClientRect();
    offX = box.left - stageBox.left; offY = box.top - stageBox.top;
    if (copy) { copy.style.width = `${box.width * ZOOM}px`; copy.style.height = `${box.height * ZOOM}px`; }
  }

  function setupLens() {
    holder = document.createElementNS(SVG_NS, "svg");
    holder.setAttribute("width", "0"); holder.setAttribute("height", "0");
    holder.setAttribute("aria-hidden", "true"); holder.style.position = "absolute";
    panel.appendChild(holder);
    filterId = `fisheye-${Math.random().toString(36).slice(2, 8)}`;
    buildFilter();
    copy = svg.cloneNode(true) as SVGSVGElement;
    copy.querySelectorAll(".map-hit, .map-ripple").forEach((node) => node.remove());
    copy.querySelectorAll("[tabindex]").forEach((node) => node.removeAttribute("tabindex"));
    copy.querySelectorAll(".map-marker").forEach((node) => { node.removeAttribute("role"); node.removeAttribute("aria-label"); });
    copy.querySelectorAll(".is-selected, .is-near, .is-dim, .is-to-selected").forEach((node) => node.classList.remove("is-selected", "is-near", "is-dim", "is-to-selected"));
    copy.removeAttribute("role"); copy.removeAttribute("aria-label");
    zoomBox.appendChild(copy);
    sizeCopy();
    dots = Array.from(svg.querySelectorAll<SVGElement>("[data-city]"))
      .map((node) => ({ node, x: Number(node.dataset.cx), y: Number(node.dataset.cy) }))
      .filter((item) => Number.isFinite(item.x));
    let resizeTimer = 0;
    new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => { buildFilter(); sizeCopy(); }, 120);
    }).observe(stage);
  }

  const setNear = (next: SVGElement | null) => {
    if (next === near) return;
    near?.classList.remove("is-near");
    near = next;
    near?.classList.add("is-near");
  };
  // The city model stays in the page only while the lens shows it. A hidden model must not keep animating.
  const dropScene = () => {
    clearTimeout(clearTimerId);
    clearTimerId = window.setTimeout(() => { if (!lens.classList.contains("is-city")) { cityBox.replaceChildren(); shown = ""; } }, 360);
  };
  const hideLens = () => {
    visible = false;
    lens.classList.remove("is-visible", "is-city");
    setNear(null);
    if (shown) dropScene();
  };

  // One pass over the pointer: arithmetic only, then the writes.
  const process = () => {
    pending = false;
    if (!inside || !ensure()) { if (visible) hideLens(); if (readout && readoutData && !inside) { readout.textContent = readoutData.fallback; readout.classList.remove("is-live"); } return; }
    const point = new DOMPoint(px, py).matrixTransform(geom.inverse);
    if (readout && readoutData) {
      const lon = (point.x - readoutData.cx0) / readoutData.kx, lat = (point.y - readoutData.cy0) / readoutData.ky;
      readout.textContent = `${Math.abs(lat).toFixed(3)}° ${lat < 0 ? "S" : "N"} · ${Math.abs(lon).toFixed(3)}° ${lon < 0 ? "W" : "E"}`;
      readout.classList.add("is-live");
    }
    if (!lensReady) return;
    if (!insideLand(point.x, point.y)) { if (visible) hideLens(); return; }
    const scale = geom.scale;
    let best = NEAR / scale, hit: (typeof dots)[number] | null = null;
    for (const item of dots) {
      const d = Math.hypot(point.x - item.x, point.y - item.y);
      if (d < best) { best = d; hit = item; }
    }
    tx = px - geom.stageLeft; ty = py - geom.stageTop;
    if (!visible) { cx = tx; cy = ty; visible = true; }
    lens.classList.add("is-visible");
    setNear(hit?.node ?? null);
    if (!hit) { lens.classList.remove("is-city"); if (shown) dropScene(); return; }
    // Parallax for the city model: the pointer position around the point moves the layers.
    lens.style.setProperty("--ox", Math.max(-1, Math.min(1, ((point.x - hit.x) * scale) / NEAR)).toFixed(2));
    lens.style.setProperty("--oy", Math.max(-1, Math.min(1, ((point.y - hit.y) * scale) / NEAR)).toFixed(2));
    const city = hit.node.dataset.city || "";
    clearTimeout(clearTimerId);
    if (city !== shown) {
      const insert = (all: Record<string, string>) => {
        if (!visible || near?.dataset.city !== city) return;
        shown = city;
        cityBox.innerHTML = all[city] || "";
        lens.classList.add("is-city");
      };
      if (scenes) insert(scenes); else { void fetchScenes().then(insert); return; }
    }
    lens.classList.add("is-city");
  };

  const loop = () => {
    raf = 0;
    if (pending) process();
    if (lensReady && visible && copy) {
      const k = reduceMotion ? 1 : 0.3;
      cx += (tx - cx) * k; cy += (ty - cy) * k;
      lens.style.transform = `translate(${cx - R}px, ${cy - R}px)`;
      copy.style.transform = `translate(${W / 2 - (cx - offX) * ZOOM}px, ${W / 2 - (cy - offY) * ZOOM}px)`;
      if (Math.hypot(tx - cx, ty - cy) > 0.3) raf = requestAnimationFrame(loop);
    }
  };
  const wake = () => { if (!raf) raf = requestAnimationFrame(loop); };

  stage.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "touch") return;
    if (hasHover && !lensReady) { setupLens(); lensReady = true; }
    inside = true; px = event.clientX; py = event.clientY; pending = true; wake();
  });
  stage.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    inside = true; px = event.clientX; py = event.clientY; pending = true; wake();
  }, { passive: true });
  stage.addEventListener("pointerleave", () => { inside = false; pending = true; wake(); });
}
