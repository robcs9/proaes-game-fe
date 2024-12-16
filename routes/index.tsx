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

  return (
    <div class={""}>
      
      <header class={"bg-blue-500 text-white p-4"}>
        <a class={"block"} href={"/"}>
          <img src="/assets/logo.png" class="" alt="logo" />
          <h1 class="text-xl text-center black-ops-one-regular">
            GUIA DE ACOMODAÇÕES PARA MORADIA ESTUDANTIL
          </h1>
        </a>
      </header>
      
      <main class="container mx-auto p-4">
        <div class="flex flex-col justify-center items-center mx-20 roboto-light">
          <ul>
            <li>
              <p className="text-xl text-justify">
                Está chegando à UFPE e não sabe onde morar?
              </p>
            </li>
            <li>
              <p className="text-xl text-justify">
                Conseguiu a tão sonhada aprovação no SISU, calouro?
              </p>
            </li>
            <li>
              <p className="text-xl text-justify">
                Está vindo em intercâmbio ou mobilidade, visitante?
              </p>
            </li>
            <li>
              <p className="text-xl text-justify">
                Procurando um novo lugar para morar, vetereno?
              </p>
            </li>
          </ul>
        </div>
        <h3 class={"text-xl my-6 font-semibold roboto-bold-italic text-center"}>
          A UFPE, por meio da Proaes, preparou este GAME para te ajudar!
          Desejamos sucesso na busca!! <br />Bem-vindos e bem-vindas!!!
        </h3>

        <Map className="rounded-lg w-full" />
      </main>
      
      <footer class={"bg-blue-500 text-white p-4 mt-8"}>
        <a href="https://www.ufpe.br/proaes" target={"_blank"}>
          <p>&copy; 2024 PROAES UFPE</p>
        </a>
      </footer>
      
    </div>
  );
}