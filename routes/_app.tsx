import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>gmme-map</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class={"flex flex-col justify-between"}>
        <main>
          <Component />
        </main>
        <footer class={"flex justify-center my-5"}>
          <p>&copy; 2024, PROAES/UFPE - <a href="https://github.com/robcs9/proaes-game">GAME</a></p>
          </footer>
      </body>
    </html>
  );
}
