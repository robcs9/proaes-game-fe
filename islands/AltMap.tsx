const { Map, Popup, Marker } = await import('https://esm.sh/maplibre-gl@5.1.1');
import { useState, useEffect, useRef } from 'preact/hooks';
import { getData } from "@/lib/utils.ts";

// let isLoading = true;
const titleFont = "poetsen-one-regular";
const center: [number, number] = [-34.949739906180845, -8.05176740274159];
const maxBounds: [[number,number],[number,number]] = [
  [-35.05753608967149, -8.215822246952289],
  [-34.791714891930305, -7.919269971663603],
];
const style = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";
const zoom = 14;

export default function AltMap(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {(async () => {
    // Fetch geojson data
    const dataFetch = await getData();
    const data = JSON.parse(localStorage.getItem('geojson'));
    // console.log('geojson data:\n', data.features);
    let features = [];
    if (data.features) features = data.features;
    const geojson = {
      type: "FeatureCollection",
      features: features,
    };

    if (map.current) return;

    map.current = new Map({
      container: mapContainer.current,
      style,
      center,
      zoom,
      maxBounds,
    });

    // map.current.on("style.load", () => console.log('style is loaded'));
    map.current.on("load", async () => {
      // console.log('map is loaded');
      
      // Initialize center marker
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundImage = `url('/assets/ufpe-sprite.png')`;
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
      
      // loadImage only supports the file formats .png, .jpg, .webp
      let icon = await map.current.loadImage(
        '/assets/housesprite.png',
        (err, image) => {
          if(err) console.log('maplibre failed to load housesprite.png.\n', err);
        });
      map.current.addImage("housing-marker", icon.data);
      map.current.addSource("houses", {
        type: "geojson",
        data: geojson,
        //cluster: true,
        //clusterMaxZoom: 14, // Max zoom to cluster points on
        //clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });
      map.current.addSource("university", {
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
            // "marker-symbol": "university-marker",
          },
        },
      });

      map.current.addLayer({
        id: "house-symbols",
        type: "symbol",
        source: "houses",
        layout: {
          //"icon-overlap": "always",
          //"icon-ignore-placement": true,
          "icon-image": "housing-marker",
          "icon-size": 1.0,
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

      // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
      map.current.on("mouseenter", "house-symbols", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      map.current.on("mouseleave", "house-symbols", () => {
        map.current.getCanvas().style.cursor = "";
      });


      
      map.current.on("click", "house-symbols", ({
        lngLat,
        features: [{
        geometry: {
          coordinates,
        },
        properties: {
          title,
          price,
          address,
          url,
          property_type: propertyType,
          modifiedAt
        }
      }] 
    }) => {

      // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
      map.current.flyTo({
        center: coordinates,
      });
      
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
      while (Math.abs(lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += lngLat.lng > coordinates[0] ? 360 : -360;
      }
      //if(active) proceed
      new Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map.current);
      });
    });
    

    map.current.on("styledata", (e) => {
      setLoading(false);
      // if(e.isSourceLoaded) {
      //   console.log('map data is loaded!', e);
      // } else console.log('loading map');
    });

    return () => map.current?.remove();
  })();
}, []);

  // if(isLoading) return (<img src="/assets/my-loader.svg" alt="" />);

  return (
    <>
      {loading && <img src="/assets/my-loader.svg" alt="" />}
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