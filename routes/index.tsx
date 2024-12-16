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
  
}
export default function Home() {
  const myAPIKey = useSignal(Deno.env.get('GEOAPIFY_API_KEY'));
  
  return (
    <div class={""}>
      <header class={"banner flex justify-center"}>
      <a class={"flex items-center"} href={"/"}>
          <img src="/assets/logo.png" class={"w-1/4"} alt="logo" />
        {/* <a class={""} href={"/"}> */}
          <h1 class="px-1 text-4xl my-2 black-ops-one-regular text-center">GUIA DE ACOMODAÇÕES<br/>PARA MORADIA ESTUDANTIL</h1>
        {/* </a> */}
        </a>
      </header>
      <div class="mx-auto flex flex-col items-center justify-center">
        <div class="flex flex-col justify-center items-center mx-20 roboto-light">
          <ul>
            <li>
              <p className="text-xl text-justify">Está chegando à UFPE e não sabe onde morar?</p>
            </li>
            <li>
              <p className="text-xl text-justify">Conseguiu a tão sonhada aprovação no SISU, calouro?</p>
            </li>
            <li>
              <p className="text-xl text-justify">Está vindo em intercâmbio ou mobilidade, visitante?</p>
            </li>
            <li>
              <p className="text-xl text-justify">Procurando um novo lugar para morar, vetereno?</p>
            </li>
          </ul>
        </div>
        <h3 class={"text-xl my-6 font-semibold roboto-bold-italic text-center"}>A UFPE, por meio da Proaes, preparou este GAME para te ajudar! Desejamos sucesso na busca!! <br/>Bem-vindos e bem-vindas!!!</h3>
        
        <Map className="rounded-lg w-full" />
        {/* <Map className="h-10" myAPIKey={myAPIKey}/> */}

      </div>
    </div>
  );
}