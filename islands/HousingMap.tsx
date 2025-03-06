import type { Signal } from "@preact/signals";
// import { Button } from "../components/Button.tsx";
// import * as maplibregl from "maplibre-gl";
// import { Map } from "maplibre-gl";
import maplibregl from 'https://esm.sh/maplibre-gl@5.1.1';
// import 'https://esm.sh/maplibre-gl/dist/maplibre-gl.css';

// import maplibre here
// import { createRef } from "https://esm.sh/v128/preact@10.22.0/src/index.js";
// const ref = createRef()

interface MapProps {
  //myAPIKey: Signal<string|undefined>;
  //maxHeight: string;
  //maxWidth: string;
  className: string;
}


const getData = async () => {
  try {
    //const json = await fetch("./plot.json");
    // Retrieve data from api when it's available
    //const json = await fetch("/data.geojson");
    //const json = localStorage.getItem('geojson')
    //console.log(localStorage) 
    // fetch geojson from api
    const json = await fetch("/api/geodata");
    //console.dir(await json.text())  
    if (!json.ok) throw new Error(`HTTP error! status: ${json.status}`);
    const data = await json.json();
    // check if data.data is valid before returning
    //console.log(data)
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};


export default async function HousingMap(props: MapProps) {
  const titleFont = "poetsen-one-regular";
  const center: [number, number] = [-34.949739906180845, -8.05176740274159];
  const bounds: [[number,number],[number,number]] = [
    [-35.05753608967149, -8.215822246952289],
    [-34.791714891930305, -7.919269971663603],
  ];
  const style = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";
  const map = new maplibregl.Map({
    container: "map", // container id
    style: style, // style URL
    center: center, // starting position [lng,lat]
    zoom: 14, // starting zoom
    maplibreLogo: true,
    maxBounds: bounds,
  });

const el = document.createElement("div");
el.className = "marker";
el.style.backgroundImage = `url(/assets/ufpe-sprite.png)`;
el.style.width = `110px`;
el.style.height = `110px`;
el.style.backgroundRepeat = "no-repeat";
el.style.backgroundSize = "contain";
//el.addEventListener("mouseenter", (e) => {
//  map.getCanvas().style.cursor = "pointer";
//});
const centerMarkerText = "<a href='https://www.ufpe.br' target='_blank'>Universidade Federal de Pernambuco</a>";
const centerPopup = new maplibregl.Popup({ offset: 25 }).setHTML(centerMarkerText);
const centerMarker = new maplibregl.Marker({ element: el })
  .setLngLat(center)
  .setPopup(centerPopup)
  .addTo(map);

let data = await getData();
let features = [];
if (data.features) features = data.features;
//datajson.then(res => data = res.features)

const geojson = {
  type: "FeatureCollection",
  features: features,
  //attribution: "Todos os colaboradores e fontes",
  //filter: ({active}) => (active == true)
  //cluster: true,
};

map.on("load", async () => {
  // Add an image to use as a custom marker icon
  /*const image = await map.loadImage(
    "https://maplibre.org/maplibre-gl-js/docs/assets/custom_marker.png"
  );
  map.addImage("custom-marker", image.data);
  */

  //const mapIcons = {
  //  universityIcon: "mdi--university.png",
  //  housingIcon: "material-symbols--other-houses.png",
  //};

  const mapIcons = {
    universityIcon: "university-sprite.png",
    housingIcon: "house-sprite.png",
  };
  //const icon = await map.loadImage(mapIcons.universityIcon);

  // scale down sprite pictures before importing
  let icon = await map.loadImage(`/assets/${mapIcons.housingIcon}`);
  
  map.addImage("housing-marker", icon.data);
  
  //icon = await map.loadImage(`./${mapIcons.universityIcon}`);
  //map.addImage("university-marker", icon.data);
  
  //for(k of Object.keys(mapIcons)) {
  //  const icon = await map.loadImage(mapIcons[k]);
  //  //if(icon.ok)
  //  //  console.log(icon)
  //  map.addImage(mapIcons[k], icon.data);
  //const housingIcon = await map.loadImage(
  //  "./bi--house-check-fill.svg"
  //);
  //map.addImage("housing-marker", houseingIcon.data);
  //}
  
  // Add a GeoJSON source
  // points == moradias
  map.addSource("points", {
    type: "geojson",
    data: geojson,
    //cluster: true,
    //clusterMaxZoom: 14, // Max zoom to cluster points on
    //clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
  });
  
  map.addSource("places", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: center,
      },
      properties: {
        title: "UFPE",
        //"marker-symbol": "monument",
        //"marker-symbol": "university-marker",
      },
    },
  });
  
  // Housings layer
  map.addLayer({
    id: "symbols",
    type: "symbol",
    source: "points",
    layout: {
      //"icon-overlap": "always",
      //"icon-ignore-placement": true,
      "icon-image": "housing-marker",
      "text-field": ["get", "price"],
      "icon-allow-overlap": true,
      "text-allow-overlap": true, // false allows cluster-like behavior
      "text-variable-anchor": ["top"],
      //"text-radial-offset": 1.8,
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      //"text-font": ["Doto Sans Serif",],
      //"text-justify": "auto",
      //'text-offset': [1, 0.5], // x and y offset
      //'text-size': 14,
      //'text-anchor': 'top', // Anchor position (top, bottom, left, right, center)
    },
    paint: {
      "text-color": "#ffffff",
      "text-halo-color": "#0000FF",
      "text-halo-width": 2,
      "text-halo-blur": 0.5,
    },
  });
  
    // Places layer
    //map.addLayer({
    //  id: "places",
    //  type: "symbol",
    //  source: "places",
    //  layout: {
    //    "icon-image": "university-marker",
    //    "icon-overlap": "always",
    //  },
    //});
});

// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
map.on("click", "symbols", (e) => {
  const coordinates = e.features[0].geometry.coordinates.slice();
  const title = e.features[0].properties.title;
  const price = e.features[0].properties.price;
  const address = e.features[0].properties.address;
  const url = e.features[0].properties.url;
  const propertyType = e.features[0].properties.property_type;
  const modifiedAt = e.features[0].properties.modifiedAt;
  const active = e.features[0].properties.active;

//console.log(active)

urlText = url.slice(url.indexOf("/") + 2, url.indexOf(".br") + 3);
status = active
  ? `<span style="color: green">ATIVO</span>`
  : `<span style="color: red">INATIVO</span>`;
const description = `
  <strong class="${titleFont}" style="font-size: 1.25em;">${title.toUpperCase()}</strong>
  <p>${price}</p>
  <p>${address.toUpperCase()}</p>
  <p><strong>Tipo de Moradia:</strong> ${propertyType.toUpperCase()}</p>
  <p><strong>Atualizado:</strong> ${modifiedAt}</p>
  <p><a href="${url}"target="_blank" title="Acessar link em nova aba">${"VER ANÚNCIO"}</a></p>
`;

// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
}

  //if(active) proceed
  new maplibregl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);
});

// Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
map.on("click", "symbols", (e) => {
  map.flyTo({
    center: e.features[0].geometry.coordinates,
  });
  // also change color to make it easier to see which marker is selected
});

// Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
map.on("mouseenter", "symbols", () => {
  map.getCanvas().style.cursor = "pointer";
});

// Change it back to a pointer when it leaves.
map.on("mouseleave", "symbols", () => {
  map.getCanvas().style.cursor = "";
});
  return (
    // <div class="border border-red-600">
    //   <>
    //     <iframe class={""+props.className} src="/map.html"></iframe>
    //   </>
    // </div>
    <>
      <div id="map" class="open-sans"></div>
    </>
  );
}