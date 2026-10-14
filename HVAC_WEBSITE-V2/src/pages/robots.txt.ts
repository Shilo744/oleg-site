import { site } from "../data/site.js";
export function GET() {
  return new Response(
    site.url
      ? `User-agent: *\nAllow: /\nSitemap: ${new URL("/sitemap.xml", site.url)}\n`
      : "User-agent: *\nDisallow: /\n",
    { headers: { "Content-Type": "text/plain" } },
  );
}
