import React from 'react';
import { UAVState, DisplayPreferences } from '../../App';

// setup the props
type HUDDisplayProps = {
    uavState: UAVState;
    displayPreferences: DisplayPreferences;
}

export default function ControlPanel(
    { uavState, displayPreferences }: HUDDisplayProps
) {
  return (
    <div className="flex-1 border-gray-400 border w-full h-full">
      <h1>
        HUD Display
      </h1>
    </div>
  );
}
