import React, { useEffect } from "react";
import { UAVState, DisplayPreferences } from "../../App";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// setup the props
type MapDisplayProps = {
  uavState: UAVState;
  displayPreferences: DisplayPreferences;
};

export default function MapDisplay({
  uavState,
  displayPreferences,
}: MapDisplayProps) {
  let map: maplibregl.Map;

  useEffect(() => {
    map = new maplibregl.Map({
      container: "map-display", 
      style: "https://demotiles.maplibre.org/style.json", // style URL
      center: [-115.6719, 36.5892], // Center of KINS
      zoom: 12, // starting zoom
    });
    
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      id="map-display"
      className="border-gray-400 border w-full print:hidden bg-neutral-900 flex items-center justify-center flex-1"
    >
      <h1>Map</h1>
    </div>
  );
}
