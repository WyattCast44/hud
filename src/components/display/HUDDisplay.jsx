import HeadingIndicator from './../HeadingIndicator';
import PitchLadder from './../PitchLadder';
import BankIndicator from './../BankIndicator';
import FlightPathMarker from './../FlightPathMarker';
import DataDisplay from './DataDisplay';
import PLAGauge from './PLAGauge';

function HUDDisplay({ uavState }) {
  return (
    <div className="h-full w-full flex items-center justify-center bg-black border border-gray-400 p-2">
      <div className="relative w-full h-0 pb-[75%] max-h-full max-w-[133.33vh]">
        <div className="absolute inset-0 border border-green-500">
          <HeadingIndicator heading={uavState.heading} />
          <PitchLadder bank={uavState.bank} gearPosition={uavState.gearPosition} />
          <BankIndicator bank={uavState.bank} showLabels={false} />
          
          {/* Show PLA Gauge only in PLA mode */}
          {uavState.powerMode === "pla" && (
            <PLAGauge 
              pla={uavState.pla}
              position={{ x: 15, y: 3 }}
              showLabel={true}
            />
          )}
          
          <DataDisplay
            label="airspeed"
            value={uavState.airspeed}
            position="left"
          />
          <DataDisplay
            label="altitude"
            value={uavState.altitude}
            position="right"
          />
          
          <FlightPathMarker bank={uavState.bank} pitch={uavState.pitch} />
        </div>
      </div>
    </div>
  );
}

export default HUDDisplay; 