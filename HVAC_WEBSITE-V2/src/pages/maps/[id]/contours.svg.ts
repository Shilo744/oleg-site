import type { APIRoute } from "astro";
import { mapIds, contoursSvg } from "../../../lib/map-assets.js";

export const getStaticPaths = () => mapIds.map((id) => ({ params: { id } }));

export const GET: APIRoute = ({ params }) =>
  new Response(contoursSvg(params.id as string), { headers: { "Content-Type": "image/svg+xml" } });
