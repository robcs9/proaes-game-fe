import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { Map } from "maplibre-gl"

// import maplibre here
// import { createRef } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
// const ref = createRef()

interface MapProps {
  //myAPIKey: Signal<string|undefined>;
  //maxHeight: string;
  //maxWidth: string;
  className: string;
}


export default function HousingMap(props: MapProps) {
  
  return (
    <div class="py-2 size-fit">
      {<iframe class={props.className} src="/map.html"></iframe>}
      {/* {<iframe class={"rounded-lg sm:max-w-1"} src="/map.html" width={"900px"} height={"600px"}></iframe>} */}
    </div>
  );
}
