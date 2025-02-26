import { FreshContext } from "$fresh/server.ts";
import { updateLocalGeojson } from "../../lib/utils.ts";
// import or fetch geojson here

export const handler = (_req: Request, _ctx: FreshContext): Response => {
  const data = localStorage.getItem('geojson');
  // localStorage.clear()
  if(data === null) {
    
    const res = {error: "Failed to retrieve geojson from localStorage",};
    return Response.json(res);
  }
  const body = JSON.parse(data);
  return Response.json(body);
};
