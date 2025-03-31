// import { h } from "preact";
// import { useRef } from "preact/hooks";
// import { useSignal } from "@preact/signals";
// import Map from "../islands/HousingMap.tsx";
import AltMap from "@/islands/AltMap.tsx";

// const btn = useRef()
// const handleClick = () => {
//   dialog.current.open()
// }
// const handleClick = () => {
// };

export default function Home() {
  const list = [
    "Está chegando à UFPE e não sabe onde morar?",
    "Conseguiu a tão sonhada aprovação no SISU, calouro?",
    "Está vindo em intercâmbio ou mobilidade, visitante?",
    "Procurando um novo lugar para morar, vetereno?",
  ];

  return (
    <div class={"min-h-screen flex flex-col items-center"}>
      <header class={"text-white p-2"}>
        <a class={"inline-block"} href={"/"}>
          <div class={"flex gap-2 items-center border border-[#58d2f4] px-2 rounded-full"}>
            <img src="/assets/logo.png" class="w-16" alt="logo" />
            <h1 class="text-xs text-nowrap text-center black-ops-one-regular">
              GUIA DE <span class={"text-[#ff0763]"}>ACOMODAÇÕES</span> PARA<br />MORADIA ESTUDANTIL
            </h1>
          </div>
        </a>
      </header>

      <main class="container p-4 flex flex-col flex-grow gap-4 justify-center items-center w-[90%] rounded-md border border-violet-400 overflow-clip">
        <div class="flex flex-col justify-center items-center roboto-light">
        <h2 class={"py-2 text-md sm:text-xl roboto-regular text-center"}>
          Está chegando à UFPE e não sabe onde <strong>morar</strong>?<br/>
          A UFPE, por meio da Proaes, preparou este <strong>GAME</strong> para te ajudar!
          Desejamos sucesso na busca e sejam bem-vindos e bem-vindas!!!
        </h2>
        </div>

        <div class={"w-[90vw] h-[70vh] flex flex-col justify-center items-center"}>
          <AltMap class="open-sans w-[100%] h-[100%]" />
        </div>
      </main>

      <footer class={"text-white p-2 mt-auto"}>
        <a
          class={"inline-block"}
          href="https://www.ufpe.br/proaes"
          target={"_blank"}
        >
          <p class={"text-sm"}>&copy; 2024 PROAES UFPE</p>
        </a>
      </footer>
    </div>
  );
}
