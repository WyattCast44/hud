import { useState } from "react";
import "./App.css";
import ControlPanel from "./components/layout/ControlPanel";
import HUDDisplay from "./components/display/HUDDisplay";
import { useKeyboardControls } from "./hooks/useKeyboardControls";

function App() {
  const [uavState, setUavState] = useState({
    airspeed: 150,
    altitude: 16000,
    pitch: 0,
    bank: 0,
    heading: 360,
    gearPosition: "up",
    pla: 125,
    powerMode: "speed",
  });

  useKeyboardControls(setUavState);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex h-full space-x-1">
        <div className="w-1/3 m-1">
          <ControlPanel uavState={uavState} onStateChange={setUavState} />
        </div>
        <div className="w-2/3 m-1 flex flex-col items-center justify-center">
          <HUDDisplay uavState={uavState} />
          <HUDDisplay uavState={uavState} />
        </div>
      </div>
      </div>
  );
}

export default App;
