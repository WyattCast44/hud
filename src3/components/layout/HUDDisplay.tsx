import React from 'react';
import { UAVState, DisplayPreferences } from '../../App';
import HeadingIndicator from '../hud/HeadingIndicator';
import PitchLadder from '../hud/PitchLadder';
import FlightPathMarker from '../hud/FlightPathMarker';
import BankIndicator from '../hud/BankIndicator';
import AirspeedIndicator from '../hud/AirspeedIndicator';
import AltitudeIndicator from '../hud/AltitudeIndicator';
import PLAIndicator from '../hud/PLAIndicator';
type HUDDisplayProps = {
    uavState: UAVState;
    displayPreferences: DisplayPreferences;
}

export default function ControlPanel(
    { uavState, displayPreferences }: HUDDisplayProps
) {
  return (
    <div className="border-gray-400 border w-full flex-1 bg-neutral-900 relative overflow-hidden flex items-center justify-center">
      <section id="hud" className="absolute h-full aspect-5/3 border-x border-gray-400 bg-black print:bg-white">
        <HeadingIndicator heading={uavState.heading} />
        <PitchLadder bank={uavState.bank} gearPosition={uavState.gearPosition} pitch={uavState.pitch} />
        <FlightPathMarker bank={uavState.bank} pitch={uavState.pitch} />
        <BankIndicator bank={uavState.bank} />
        <AirspeedIndicator airspeed={uavState.airspeed} />
        <AltitudeIndicator altitude={uavState.altitude} />
        <PLAIndicator pla={uavState.pla} powerMode={uavState.powerMode} />
      </section>
    </div>
  );
}
