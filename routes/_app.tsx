import { type PageProps } from "$fresh/server.ts";
import { getGeojson } from "@lib/utils.ts";
// import { cron } from "https://deno.land/x/deno_cron/cron.ts";

/* import { randomInt } from "node:crypto";
const geodata = ["foo", "bar", "fizz", "buzz"];
let data = "empty~" */
let data = await getGeojson();
localStorage.setItem('proaes-game-geojson', data);

Deno.cron("geojson fetch and update cron", "0 * * * *", async () => {
  data = await getGeojson();
  if(data === null) {
    console.log('Failed to get geojson data');
    return;
  }
  // data = geodata[randomInt(4)]
  localStorage.setItem('proaes-game-geojson', data);
  console.log('proaes-game-geojson localStorage data updated!');
})

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
      </head>
      {/* <body class={"flex flex-col justify-between"}> */}
      <body class={""}>
        <Component />
        {/* <p>foo</p> */}
      </body>
    </html>
  );
}
