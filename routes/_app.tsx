import { type PageProps } from "$fresh/server.ts";
const scraper_url = 'https://proaes-game-be-scraper.onrender.com/api/v1';

Deno.cron("geojson fetch and update cron task", "5 */1 * * *", () => { 
  try {
    const res = fetch(`${scraper_url}/scrape`);
    console.log('Scraper task will be concluded soon.');
  } catch(e) {
    console.log(`Scrape request error.\n${e}`);
  }
});

Deno.cron("Scraper API healthcheck ", "*/10 * * * *", async () => {
  // console.log('Performing scraper healthcheck now');
  const res = await fetch(scraper_url);
  if(res.status === 200) console.log('Scraper API is healthy');
  else console.log('Scraper API is unhealthy');
});

export default function App({ Component }: PageProps) {
  
  return (
    <html lang="pt-br">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GAME - Guia de Acomodações para Moradia Estudantil</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/maplibre-gl@5.1.1/dist/maplibre-gl.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poetsen+One&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vast+Shadow&display=swap" rel="stylesheet" />
      </head>
      <body class={""}>
        <Component />
      </body>
    </html>
  );
}