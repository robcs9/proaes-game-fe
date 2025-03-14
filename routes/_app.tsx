import { type PageProps } from "$fresh/server.ts";
// import { cron } from "https://deno.land/x/deno_cron/cron.ts";

Deno.cron("geojson fetch and update cron", "0 * * * *", async () => {
  // updateLocalGeojson();
  // if(localStorage.getItem('geojson') === null) {
  //   const d = await updateLocalGeojson();
  //   if(d) localStorage.setItem('geojson', d)
  // }
  
  const url = 'https://proaes-game-be-scraper.onrender.com/api/v1';
  try {
    const res = await fetch(`${url}/scrape`);
    console.log('Scraper task will be concluded soon.');
    // console.log('Scraper task finished successfully');
    // const data = await fetch(`${url}/db/geojson`);
    // if(data) {
    //   console.log(data);
    // }
  } catch(e) {
    // console.log(`Error fetching scraper data.\n${e}`);
    console.log(`Scrape request error.\n${e}`);
  }
});

export default function App({ Component }: PageProps) {
  
  return (
    <html lang="pt-br">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GAME - Guia de Acomodações para Moradia Estudantil</title>
        {/* Flash Of Unstyled Content fix not working */}
        {/* <link rel="preload" href="/styles.css" as={"style"}/> */}

        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />

        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/maplibre-gl@5.1.1/dist/maplibre-gl.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poetsen+One&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vast+Shadow&display=swap" rel="stylesheet" />
      </head>
      {/* <body class={"flex flex-col justify-between"}> */}
      <body class={""}>
        <Component />
        {/* <p>foo</p> */}
      </body>
    </html>
  );
}
