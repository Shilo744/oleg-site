import { site, routes } from "../data/site.js";
export function GET() {
  const escape = (s: string) =>
    s
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll('"', "&quot;");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${site.url ? routes.map((path) => `<url><loc>${escape(new URL(path, site.url).href)}</loc></url>`).join("") : ""}</urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
}
