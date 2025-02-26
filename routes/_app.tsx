import { type PageProps } from "$fresh/server.ts";
// import { cron } from "https://deno.land/x/deno_cron/cron.ts";
import { updateLocalGeojson } from "../lib/utils.ts";

Deno.cron("geojson fetch and update cron", "* * * * *", () => {
  // updateLocalGeojson();
})

export default function App({ Component }: PageProps) {
  
  if(localStorage.getItem('geojson') === null) {
    updateLocalGeojson();
  }
  
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
