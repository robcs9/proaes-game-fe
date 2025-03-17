import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div class="px-4 py-8 mx-auto bg-[#86efac]">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <img
            class="my-6"
            src="/assets/logo.png"
            width="128"
            height="128"
            alt="PROAES-GAME Logo"
          />
          <h1 class="text-4xl font-bold">404 - Página não encontrada</h1>
          <a href="/" class="underline">Go back home</a>
        </div>
      </div>
    </>
  );
}
