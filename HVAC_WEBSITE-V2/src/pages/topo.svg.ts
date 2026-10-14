import type { APIRoute } from "astro";
import { buildTopoSvg } from "../lib/topo.js";

export const GET: APIRoute = () => new Response(buildTopoSvg(), { headers: { "Content-Type": "image/svg+xml" } });
