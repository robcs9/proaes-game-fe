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
  const geojsonStr = localStorage.getItem('proaes-game-geojson');
  let geojson = {};
  if(geojsonStr && geojsonStr.length === 0){
    console.log('Locally stored "proaes-game-geojson" not found');
  }
  try {
    geojson = JSON.parse(geojsonStr);
    console.log('Locally stored geojson parsed successfully');
  } catch(e) {
    console.log(`Failed to handle geojson.\nError: ${e}`);
  }
  /* if(geojson === null || !Object.hasOwn(geojson, 'features')) {
    console.log('No geojson data available for display');
  } */
  // console.log('geojson: ',JSON.stringify(geojson))
  // console.log('geojson: ', geojson['type'])
  return (
    // <div class="border border-red-600">
      <>
        <iframe class={""+props.className} src="/map.html"></iframe>
        geojson type: {geojson['type']}
      </>
    // </div>
  );
}