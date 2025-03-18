import React from 'react';
import { useState } from "react";
import ControlPanel from "./components/layout/ControlPanel";
import HUDDisplay from "./components/layout/HUDDisplay";
import HSIDisplay from "./components/layout/HSIDisplay";
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
  } as DisplayPreferences);

  useKeyboardShortcuts(setUavState);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex h-full p-2 space-x-2">
        <div className="w-1/3 print:hidden">
          <ControlPanel uavState={uavState} displayPreferences={displayPreferences} onStateChange={setUavState} />
        </div>
        <div className="w-2/3 print:w-full flex flex-col items-center justify-center space-y-2">
          <HUDDisplay uavState={uavState} displayPreferences={displayPreferences} />
          <HSIDisplay uavState={uavState} displayPreferences={displayPreferences} />
        </div>
      </div>
    </div>
  );
}

export default App;
export type { UAVState, DisplayPreferences };
