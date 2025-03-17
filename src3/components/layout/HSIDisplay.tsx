import React from 'react';
import { UAVState, DisplayPreferences } from '../../App';

// setup the props
type HSIDisplayProps = {
    uavState: UAVState;
    displayPreferences: DisplayPreferences;
}

export default function HSIDisplay(
    { uavState, displayPreferences }: HSIDisplayProps
) {
  return (
    <div className="flex-1 border-gray-400 border w-full print:hidden">
      <h1>
        HSI Display
      </h1>
    </div>
  );
}
