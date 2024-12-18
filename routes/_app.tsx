import { type PageProps } from "$fresh/server.ts";

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
