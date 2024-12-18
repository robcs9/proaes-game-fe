// import { h } from "preact";
import { useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import Map from "../islands/HousingMap.tsx";
import { Button } from "../components/Button.tsx";

// const btn = useRef()
// const handleClick = () => {
//   dialog.current.open()
// }
const handleClick = () => {
};
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
      {/* <header class={"text-white p-2 lg:w-[90%]"}> */}
      {/* <header class={"bg-blue-500 text-white flex justify-center p-2"}> */}
        <a class={"inline-block"} href={"/"}>
          <div class={"flex gap-2 items-center border border-[#58d2f4] px-2 rounded-full"}>
            <img src="/assets/logo.png" class="w-16" alt="logo" />
            <h1 class="text-xs text-nowrap text-center black-ops-one-regular">
              GUIA DE <span class={"text-[#ff0763]"}>ACOMODAÇÕES</span> PARA<br />MORADIA ESTUDANTIL
            </h1>
          </div>
        </a>
      </header>

      {/* <main class="container mx-auto p-2 flex-grow"> */}
      <main class="container p-4 flex flex-col flex-grow gap-4 justify-center items-center w-[90%] rounded-md border border-violet-400 overflow-clip">
        {/* <div class="flex flex-col justify-center items-center mx-20 roboto-light"> */}
        <div class="flex flex-col justify-center items-center roboto-light">
          <ul>
            {list.map((elem, idx) => (
              <li key={`main-li-${idx}`}>
                <h2 className="text-md text-center">
                  {elem}
                </h2>
              </li>
            ))}
          </ul>
        <h2 class={"py-2 text-md font-semibold roboto-bold-italic text-center"}>
          A UFPE, por meio da Proaes, preparou este GAME para te ajudar!
          Desejamos sucesso na busca e sejam bem-vindos e bem-vindas!!!
        </h2>
        </div>

        <div class={"w-[90vw] h-[70vh]"}>
          <Map className="w-[100%] h-[100%]" />
        </div>
      </main>

      <footer class={"text-white p-2 mt-auto"}>
      {/* <footer class={"bg-blue-500 text-white p-2 mt-auto"}> */}
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
