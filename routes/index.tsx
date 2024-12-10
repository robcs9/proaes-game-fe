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
    <div>
      <div class={"flex items-center w-1/4"}>
        <a class={"inline-block"} href={"/"}>
          <img src="/logo.png" class={""} alt="logo" />
        </a>
        <a class={""} href={"/"}>
          <h1 class="mx-2 text-xl my-2 font-bold">Guia de Acomodações para Moradia Estudantil<br/>(GAME)</h1>
        </a>
      </div>
      <div class="mx-auto flex flex-col items-center justify-center">
        <div class="flex flex-col justify-center items-center mx-20">
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
        <p class={"text-xl mt-6 font-semibold"}>A UFPE, por meio da Proaes, preparou este GAME para te ajudar. Desejamos sucesso na busca!! Bem-vindos e bem-vindas!!!</p>
        {/* <h2 class="text-xl">Encontre  para você que quer morar próximo à sua universidade!</h2> */}
        <h1 class="mt-4 text-2xl">Mapeamento de Moradias e Quartos Alugáveis próximos à UFPE</h1>
        <Map myAPIKey={myAPIKey}/>

        {/* <Button ref={btn} onClick={handleClick}>test</Button> */}
        {/* <a href="/">
        <Button onClick={handleClick}>Formulário</Button>
        </a> */}
      </div>
    </div>
  );
}