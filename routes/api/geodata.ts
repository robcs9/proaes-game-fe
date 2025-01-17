import { FreshContext } from "$fresh/server.ts";

// import or fetch geojson here

const data = [
  'geojson data 0',
  'geojson data 1',
];

export const handler = (_req: Request, _ctx: FreshContext): Response => {
  const body = data[0];
  return new Response(body);
};
