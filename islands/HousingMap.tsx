import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { Map } from "maplibre-gl"

// import maplibre here
// import { createRef } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
// const ref = createRef()

interface MapProps {
  myAPIKey: Signal<string|undefined>;
}


export default function HousingMap(props: MapProps) {
  
  return (
    <div class="py-2">
      <iframe src="/map.html" width={"900"} height={"600px"}></iframe>
    </div>
  );
}
