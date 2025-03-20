import React from "react";
import { useState } from "react";
import ControlPanel from "./components/layout/ControlPanel";
import HUDDisplay from "./components/layout/HUDDisplay";
import HSIDisplay from "./components/layout/HSIDisplay";
import VSIDisplay from "./components/layout/VSIDisplay";
import MapDisplay from "./components/layout/MapDisplay";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

type UAVState = {
  airspeed: number;
  altitude: number;
  pitch: number;
  bank: number;
  heading: number;
  gearPosition: string;
  powerMode: string;
  pla: number;
  boardsPosition: BoardsPosition;
};

export enum BoardsPosition {
  LOCKED = "locked",
  IN = "in",
  HALF = "half",
  FULL = "full",
}

type DisplayPreferences = {
  showHUD: boolean;
  showMap: boolean;
  theme: string;
  northUp: boolean;
};

function App() {
  const [uavState, setUavState] = useState({
    airspeed: 150,
    altitude: 16000,
    pitch: 0,
    bank: 0,
    heading: 360,
    gearPosition: "up",
    powerMode: "speed",
    pla: 30,
    boardsPosition: BoardsPosition.IN,
  } as UAVState);

  const [displayPreferences, setDisplayPreferences] = useState({
    showHUD: true,
    showMap: true,
    theme: "dark",
    northUp: false,
  } as DisplayPreferences);

  useKeyboardShortcuts(setUavState);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex h-full p-2 space-x-2">
        <div className="w-2/6 print:hidden">
          <ControlPanel
            uavState={uavState}
            displayPreferences={displayPreferences}
            onStateChange={setUavState}
          />
        </div>
        <div className="w-4/6 print:w-full flex flex-col items-center justify-center space-y-2">
          <HUDDisplay
            uavState={uavState}
            displayPreferences={displayPreferences}
          />
          <div className="flex w-full space-x-2 flex-1 max-h-1/2 print:hidden">
            <HSIDisplay
              uavState={uavState}
              displayPreferences={displayPreferences}
            />
            <div className="flex flex-col space-y-2 w-full">
              <VSIDisplay
                uavState={uavState}
                displayPreferences={displayPreferences}
              />
              <MapDisplay
                uavState={uavState}
                displayPreferences={displayPreferences}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
export type { UAVState, DisplayPreferences };
