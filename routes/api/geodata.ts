import { FreshContext } from "$fresh/server.ts";
import { getGeojson } from "../../lib/utils.ts";
// import or fetch geojson here

export const handler = async (_req: Request, _ctx: FreshContext): Promise<Response> => {
  const url = 'https://proaes-game-be-scraper.onrender.com/api/v1';
  const json = await fetch(`${url}/db/geojson`);
  if (!json.ok) throw new Error(`HTTP error! status: ${json.status}`);
  const data = await json.json();

  if(data === null) {
    const res = {error: "Failed to retrieve geojson from localStorage",};
    return Response.json(res);
  }
  return Response.json(data);
  // const body = JSON.parse(data);
  // return Response.json(body);
};
