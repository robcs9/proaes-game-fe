import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GAME - Guia de Acomodações para Moradia Estudantil</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
      </head>
      <body class={"flex flex-col justify-between"}>
        <main>
          <Component />
        </main>
        <footer class={"flex justify-center my-5"}>
        <a href="https://www.ufpe.br/proaes"><p>&copy; 2024, PROAES UFPE</p></a>
          {/* <p>&copy; 2024, PROAES/UFPE - <a href="https://github.com/robcs9/proaes-game-fe">GAME</a></p> */}
          </footer>
      </body>
    </html>
  );
}
