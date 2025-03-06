import { useEffect, useRef } from 'preact/hooks';

const getData = async () => {
  try {
    //const json = await fetch("./plot.json");
    // Retrieve data from api when it's available
    const json = await fetch("/data.geojson");
    
    //const json = localStorage.getItem('geojson')
    //console.log(localStorage) 
    
    // fetch geojson from api
    // const json = await fetch("/api/geodata");
    
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

const titleFont = "poetsen-one-regular";
const center: [number, number] = [-34.949739906180845, -8.05176740274159];
const maxBounds: [[number,number],[number,number]] = [
  [-35.05753608967149, -8.215822246952289],
  [-34.791714891930305, -7.919269971663603],
];
const style = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";
const zoom = 14;

export default function Map(props) {
  // console.log('props', props);
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    (async () => {
      const { Map, Popup, Marker } = await import('https://esm.sh/maplibre-gl@5.1.1');
      if (map.current) return;
      map.current = new Map({
        container: mapContainer.current,
        style,
        center,
        zoom,
        maxBounds,
      });

      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundImage = `url(/assets/ufpe-sprite.png)`;
      el.style.width = `110px`;
      el.style.height = `110px`;
      el.style.backgroundRepeat = "no-repeat";
      el.style.backgroundSize = "contain";
      const centerMarkerText = "<a href='https://www.ufpe.br' target='_blank'>Universidade Federal de Pernambuco</a>";
      const centerPopup = new Popup({ offset: 25 }).setHTML(centerMarkerText);
      const centerMarker = new Marker({ element: el })
        .setLngLat(center)
        .setPopup(centerPopup)
        .addTo(map.current);

      let data = await getData();
      let features = [];
      if (data.features) features = data.features;

      const geojson = {
        type: "FeatureCollection",
        features: features,
      };
      const mapIcons = {
        universityIcon: "university-sprite.png",
        housingIcon: "house-sprite.png",
      };

      map.current.on("load", async () => {
        let icon = await map.current.loadImage(`/assets/${mapIcons.housingIcon}`);
        map.current.addImage("housing-marker", icon.data);
        map.current.addSource("points", {
          type: "geojson",
          data: geojson,
          //cluster: true,
          //clusterMaxZoom: 14, // Max zoom to cluster points on
          //clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });
        map.current.addSource("places", {
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
        map.current.addLayer({
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
      });
      map.current.on("click", "symbols", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const title = e.features[0].properties.title;
        const price = e.features[0].properties.price;
        const address = e.features[0].properties.address;
        const url = e.features[0].properties.url;
        const propertyType = e.features[0].properties.property_type;
        const modifiedAt = e.features[0].properties.modifiedAt;
        const active = e.features[0].properties.active;
      
      //console.log(active)
      
      // urlText = url.slice(url.indexOf("/") + 2, url.indexOf(".br") + 3);
      // status = active
      //   ? `<span style="color: green">ATIVO</span>`
      //   : `<span style="color: red">INATIVO</span>`;
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
        new Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map.current);
      });
      
      // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
      map.current.on("click", "symbols", (e) => {
        map.current.flyTo({
          center: e.features[0].geometry.coordinates,
        });
        // also change color to make it easier to see which marker is selected
      });
      
      // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
      map.current.on("mouseenter", "symbols", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });
      
      // Change it back to a pointer when it leaves.
      map.current.on("mouseleave", "symbols", () => {
        map.current.getCanvas().style.cursor = "";
      });
      return () => map.current?.remove();
    })();
  }, []);
  return (
    <>
      <div
        /* id="map"  */
        ref={mapContainer} 
        class={props.class}
        /*class="open-sans" style={{ width: '300px', height: '300px' }} */
      >
      </div>
    </>
  );
}