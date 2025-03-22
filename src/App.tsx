import React from "react";
import ControlPanel from "./components/layout/ControlPanel";
import HUDDisplay from "./components/layout/HUDDisplay";
import HSIDisplay from "./components/layout/HSIDisplay";
import VSIDisplay from "./components/layout/VSIDisplay";
import MapDisplay from "./components/layout/MapDisplay";
import { useUAVSimulation } from "./hooks/useUAVSimulation";
import UAVState from "./types/UAVState";
import GearPosition from "./types/GearPosition";
import PowerMode from "./types/PowerMode";
import BoardsPosition from "./types/BoardsPosition";

function App() {
  const initialUAVState: UAVState = {
    keas: 130,
    ktas: 130,
    mach: 0.2,
    altitude: 16000,
    altitudeMeters: 4876.8,
    heading: 360,
    gamma: 0,
    commandedGamma: null,
    bank: 0,
    commandedBank: 0,
    commandedHeading: null,
    course: 360,
    boardsPosition: BoardsPosition.IN,
    commandedBoardsPosition: null,
    gearPosition: GearPosition.UP,
    commandedGearPosition: null,
    pla: 0,
    powerMode: PowerMode.SPEED,
    commandedSpeed: null,
    commandedPLA: null,
    longitude: -115.671793,
    latitude: 36.589243,
  };

  const [uavState, simulationControls] = useUAVSimulation(initialUAVState);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex h-full p-2 space-x-2">
        {/* Control Panel */}
        <div className="w-1/4 print:hidden">
          <ControlPanel
            uavState={uavState}
            onStateChange={simulationControls.reset}
            simulationControls={simulationControls}
          />
        </div>

        {/* Right Side Display */}
        <div className="flex-1 flex flex-col space-y-2">
          {/* HUD and Map top row */}
          <div className="flex w-full space-x-2 flex-1 print:space-x-0 print:bg-white">
            <HUDDisplay uavState={uavState} />

            <div className="print:hidden flex-1">
              <MapDisplay uavState={uavState} />
            </div>
          </div>

          {/* HSIDisplay and VSIDisplay bottom row */}
          <div className="flex w-full space-x-2 flex-1 max-h-1/2 print:hidden">
            <HSIDisplay uavState={uavState} />
            <VSIDisplay uavState={uavState} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
export type { UAVState };
