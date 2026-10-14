import type { APIRoute } from "astro";
import { mapIds, scenesJson } from "../../../lib/map-assets.js";

export const getStaticPaths = () => mapIds.map((id) => ({ params: { id } }));

export const GET: APIRoute = ({ params }) =>
  new Response(scenesJson(params.id as string), { headers: { "Content-Type": "application/json" } });
