// The one script every page loads. Small on purpose.
// It does five jobs: scroll reveals, animation gating, the header, the mobile menu and the logo scroll bar.
// The map and the founder plate are separate files. They load only on the pages that have them.

const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
root.classList.add("motion-ready");

// ---------- Scroll reveals ----------
for (const group of document.querySelectorAll<HTMLElement>("[data-reveal-group]")) {
  Array.from(group.children).forEach((child, index) => (child as HTMLElement).style.setProperty("--d", `${index * 110}ms`));
}
const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
if (reduce || !("IntersectionObserver" in window)) {
  for (const element of targets) element.classList.add("is-in");
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.16, rootMargin: "0px 0px -5% 0px" },
  );
  for (const element of targets) observer.observe(element);
}

// ---------- Animation gating ----------
// Endless animations run only while their block is on screen. CSS pauses the others (see "Animation gating" in atlas-visuals.css).
if ("IntersectionObserver" in window) {
  const live = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) entry.target.classList.toggle("is-live", entry.isIntersecting);
      document.dispatchEvent(new Event("live-change"));
    },
    { rootMargin: "120px 0px" },
  );
  for (const block of document.querySelectorAll(".hero, .illus, .founder-plate, .final-cta, .page-hero, .pilot-weeks")) live.observe(block);
} else {
  for (const block of document.querySelectorAll(".hero, .illus, .founder-plate, .final-cta, .page-hero, .pilot-weeks")) block.classList.add("is-live");
}

// ---------- Flowing dashes ----------
// A dash that moves along a line changes its shape every frame, and the browser then rebuilds the page every frame.
// This ticker moves all such dashes together, 15 times a second, and only while their block is on screen.
// An element opts in with data-flow="<dash period> <speed in units per second>".
const flows = Array.from(document.querySelectorAll<SVGElement>("[data-flow]")).map((element) => {
  const [period, speed] = (element.dataset.flow || "").split(" ").map(Number);
  return { element, period, speed };
});
if (flows.length && !reduce) {
  let running: typeof flows = [];
  let timer = 0;
  // A timer, not requestAnimationFrame: a frame loop would make the browser draw 60 frames a second, even when nothing changes.
  const tick = () => {
    const seconds = performance.now() / 1000;
    for (const { element, period, speed } of running) element.style.strokeDashoffset = (-((seconds * speed) % period)).toFixed(2);
  };
  const refresh = () => {
    running = document.hidden ? [] : flows.filter(({ element }) => element.closest(".is-live"));
    if (running.length && !timer) timer = window.setInterval(tick, 66);
    else if (!running.length && timer) { clearInterval(timer); timer = 0; }
  };
  document.addEventListener("live-change", refresh);
  document.addEventListener("visibilitychange", refresh);
  refresh();
}

// ---------- Header state ----------
// A one-pixel marker at the top of the page tells when the page has moved. No scroll listener is needed.
const header = document.querySelector<HTMLElement>(".site-header");
if (header && "IntersectionObserver" in window) {
  const marker = document.createElement("div");
  marker.setAttribute("aria-hidden", "true");
  marker.style.cssText = "position:absolute;top:0;left:0;width:1px;height:12px;pointer-events:none;visibility:hidden";
  document.body.prepend(marker);
  new IntersectionObserver((entries) => {
    const scrolled = !entries[0].isIntersecting;
    header.classList.toggle("is-scrolled", scrolled);
    root.classList.toggle("is-scrolled", scrolled);
  }).observe(marker);
}

// ---------- Mobile menu ----------
const button = document.querySelector<HTMLButtonElement>(".menu-toggle");
const nav = document.querySelector<HTMLElement>("#navigation");
if (button && nav) {
  root.classList.add("has-js");
  const close = () => {
    button.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  };
  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  });
  nav.addEventListener("click", (event) => { if ((event.target as HTMLElement).closest("a")) close(); });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") { close(); button.focus(); }
  });
  document.addEventListener("click", (event) => { if (!(event.target as HTMLElement).closest(".site-header")) close(); });
}

// ---------- Logo scroll bar ----------
// The handle is the coral stripe of the logo. A mouse on a wide screen uses it instead of the native bar.
const bar = document.querySelector<HTMLElement>(".logo-scroll");
const thumb = bar?.querySelector<HTMLElement>(".ls-thumb");
if (bar && thumb) {
  const wide = matchMedia("(hover: hover) and (pointer: fine) and (min-width: 900px)");
  const MIN_HANDLE = 56;
  let frame = 0;
  let trackHeight = 0, handleHeight = 0;
  const range = () => root.scrollHeight - innerHeight;

  // Measure on resize and when the page height changes, never on scroll.
  const measure = () => {
    if (!wide.matches) return;
    const max = range();
    bar.classList.toggle("is-idle", max <= 4);
    trackHeight = bar.clientHeight;
    handleHeight = Math.min(trackHeight, Math.max(MIN_HANDLE, (innerHeight / root.scrollHeight) * trackHeight));
    thumb.style.height = `${handleHeight.toFixed(1)}px`;
    place();
  };
  // Only a transform changes while the page scrolls.
  const place = () => {
    frame = 0;
    if (!wide.matches) return;
    const max = range();
    const fraction = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    thumb.style.transform = `translate3d(0, ${((trackHeight - handleHeight) * fraction).toFixed(1)}px, 0)`;
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(place); };
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", measure);
  wide.addEventListener("change", measure);
  new ResizeObserver(measure).observe(document.body);
  measure();

  // Drag the handle. Press the track to bring the handle there, then keep dragging.
  let dragging = false;
  let startY = 0;
  let startScroll = 0;
  const usable = () => trackHeight - handleHeight;
  bar.addEventListener("pointerdown", (event) => {
    if (!wide.matches || event.button !== 0) return;
    dragging = true;
    bar.setPointerCapture(event.pointerId);
    bar.classList.add("is-drag");
    if (!thumb.contains(event.target as Node)) {
      const box = bar.getBoundingClientRect();
      const fraction = Math.min(1, Math.max(0, (event.clientY - box.top - handleHeight / 2) / usable()));
      scrollTo({ top: fraction * range(), behavior: "instant" });
    }
    startY = event.clientY;
    startScroll = scrollY;
    event.preventDefault();
  });
  bar.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const room = usable();
    if (room > 0) scrollTo({ top: startScroll + ((event.clientY - startY) * range()) / room, behavior: "instant" });
  });
  const stop = () => { dragging = false; bar.classList.remove("is-drag"); };
  bar.addEventListener("pointerup", stop);
  bar.addEventListener("pointercancel", stop);
}

// ---------- Pages with a map or a plate ----------
const panel = document.querySelector<HTMLElement>(".map-panel");
if (panel) void import("./map").then((module) => module.initMap(panel));
const plate = document.querySelector<HTMLElement>(".founder-plate");
if (plate) {
  const start = () => void import("./plate").then((module) => module.initPlate(plate));
  if ("IntersectionObserver" in window) {
    const near = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { near.disconnect(); start(); }
    }, { rootMargin: "600px 0px" });
    near.observe(plate);
  } else start();
}
