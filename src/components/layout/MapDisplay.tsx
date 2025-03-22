import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { UAVState, DisplayPreferences } from "../../App";
import Map from "ol/Map.js";

import "ol/ol.css";
import { XYZ } from "ol/source";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import { useGeographic } from "ol/proj.js";
import { fromLonLat } from "ol/proj.js";
import Planform from "../plane/Planform";
import Overlay from "ol/Overlay.js";

// setup the props
type MapDisplayProps = {
  uavState: UAVState;
  displayPreferences: DisplayPreferences;
};

export default function MapDisplay({
  uavState,
  displayPreferences,
}: MapDisplayProps) {
  let map: Map;
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  useGeographic();

  useEffect(() => {
    map = new Map({
      target: mapRef.current as HTMLElement,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            maxZoom: 19,
            wrapX: false,
          }),
        }),
      ],
      view: new View({
        center: [uavState.longitude, uavState.latitude],
        zoom: 14,
      }),
      controls: [],
    });

    let posit = fromLonLat([uavState.longitude, uavState.latitude]);

    // plane marker
    const marker = new Overlay({
      position: [uavState.longitude, uavState.latitude],
      positioning: "center-center",
      element: markerRef.current as HTMLElement,
      stopEvent: false,
    });

    map.addOverlay(marker);

    return () => {
      map.setTarget(null as unknown as HTMLElement);
    };
  }, []);

  return (
    <div className="flex-1 relative w-full h-full">
      <div
        ref={mapRef}
        style={{
          filter: "brightness(0.75)",
        }}
        className="border-gray-400 border print:hidden bg-neutral-900 flex items-center justify-center flex-1 absolute inset-0"
      ></div>

      <div style={{ display: "none" }}>
        <div
          ref={markerRef}
          className="flex items-center relative justify-center size-20"
        >
          <Planform className="w-full h-full text-blue-300 absolute inset-0 flex items-center justify-center" svgClassName="stroke-black stroke-[0.75px]" style={{
            transform: `rotate(${uavState.heading}deg)`,
          }} />
        </div>
      </div>
    </div>
  );
}
