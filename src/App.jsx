import { useState, useEffect } from "react";
import "./App.css";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import PitchLadder from "./components/PitchLadder";
import FlightPathMarker from "./components/FlightPathMarker";
import BankIndicator from "./components/BankIndicator";
import HeadingIndicator from "./components/HeadingIndicator";

function ControlPanel({ uavState, onStateChange }) {
  const handleInputChange = (name, value) => {
    // Special handling for heading to wrap between 1 and 360
    if (name === "heading") {
      let newHeading = parseFloat(value) || 0;
      
      // Wrap heading values
      if (newHeading > 360) {
        newHeading = 1;
      } else if (newHeading < 1) {
        newHeading = 360;
      }
      
      onStateChange({
        ...uavState,
        [name]: newHeading
      });
    } else {
      // Handle other inputs normally
      onStateChange({
        ...uavState,
        [name]: parseFloat(value) || 0,
      });
    }
  };

  const toggleGear = () => {
    onStateChange({
      ...uavState,
      gearPosition: uavState.gearPosition === "up" ? "down" : "up",
    });
  };

  return (
    <div className="flex w-full border border-gray-400 flex-col -outline-offset-1 bg-black h-full pv overflow-hidden">
      <div
        id="header"
        className="h-10 flex items-center justify-between border-b border-gray-400"
      >
        <h1 className="font-mono uppercase tracking-tight font-black pl-4">
          Control Panel
        </h1>
        <button
          className="border-l flex items-center size-10 justify-center border-gray-400 cursor-pointer"
          type="button"
        >
          <ArrowLeftIcon className="size-4 text-gray-400" />
        </button>
      </div>

      <div className="flex-1 bg-black p-6">
        <div className="grid grid-cols-3 w-full h-auto grid-rows-3 divide-x divide-y divide-gray-400 border border-gray-400">
          {/* KEAS */}
          <div className="flex items-center justify-center aspect-square flex-col text-white space-y-2">
            <label htmlFor="airspeed">Airspeed</label>
            <input
              type="number"
              className="border-green-500 text-center border text-xl w-20 text-white font-semibold selection:bg-green-300 selection:text-black bg-black"
              value={uavState.airspeed}
              onChange={(e) => handleInputChange("airspeed", e.target.value)}
            />
            <p>KEAS</p>
          </div>
          {/* Heading */}
          <div className="flex items-center justify-center aspect-square flex-col text-white space-y-2">
            <label>Heading</label>
            <input
              type="number"
              className="border-green-500 text-center border text-xl w-20 text-white font-semibold selection:bg-green-300 selection:text-black bg-black"
              value={uavState.heading}
              min="1"
              max="360"
              onChange={(e) => handleInputChange("heading", e.target.value)}
            />
            <p>DEG</p>
          </div>
          {/* PLA */}
          <div className="flex items-center justify-center aspect-square flex-col text-white space-y-2">
            <label>Power</label>
            <input
              type="number"
              className="border-green-500 text-center border text-xl w-20 text-white font-semibold selection:bg-green-300 selection:text-black bg-black"
              value={uavState.pla}
              onChange={(e) => handleInputChange("pla", e.target.value)}
            />
            <p>PLA</p>
          </div>
          {/* Altitude */}
          <div className="flex items-center justify-center aspect-square flex-col text-white space-y-2">
            <label>Altitude</label>
            <input
              type="number"
              className="border-green-500 text-center border text-xl w-20 text-white font-semibold selection:bg-green-300 selection:text-black bg-black"
              value={uavState.altitude}
              onChange={(e) => handleInputChange("altitude", e.target.value)}
            />
            <p>MSL</p>
          </div>
          {/* Pitch */}
          <div className="flex items-center justify-center aspect-square flex-col text-white space-y-2">
            <label>Pitch</label>
            <input
              type="number"
              className="border-green-500 text-center border text-xl w-20 text-white font-semibold selection:bg-green-300 selection:text-black bg-black"
              value={uavState.pitch}
              step={0.1}
              onChange={(e) => handleInputChange("pitch", e.target.value)}
            />
            <p>DEG</p>
          </div>
          {/* Bank */}
          <div className="flex items-center justify-center aspect-square flex-col text-white space-y-2">
            <label>Bank</label>
            <input
              type="number"
              className="border-green-500 text-center border text-xl w-20 text-white font-semibold selection:bg-green-300 selection:text-black bg-black"
              value={uavState.bank}
              step={1}
              // make sure the min and max values are respected onChange  
              onChange={(e) => {

                if (e.target.value < -45) {
                  handleInputChange("bank", -45);
                } else if (e.target.value > 45) {
                  handleInputChange("bank", 45);
                } else {
                  handleInputChange("bank", e.target.value);
                }
              }}
            />
            <p>DEG</p>
          </div>
          {/* Gear Position */}
          <div className="flex items-center justify-center aspect-square flex-col text-white space-y-2">
            <label>Gear</label>
            <button
              onClick={toggleGear}
              className="border-green-500 border text-xl px-4 py-2 text-white font-semibold hover:bg-green-900 transition-colors bg-black"
            >
              {uavState.gearPosition.toUpperCase()}
            </button>
            <p>Position</p>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-gray-400 h-10 flex items-center px-4 text-gray-400 font-mono text-sm">
        Status: Connected
      </div>
    </div>
  );
}

function HUDDisplay({ uavState }) {
  return (
    <div className="h-full w-full flex items-center justify-center bg-black border border-gray-400 p-2">
      <div className="relative w-full h-0 pb-[75%] max-h-full max-w-[133.33vh]">
        <div className="absolute inset-0 border border-green-500">
          {/* Add HeadingIndicator near the top */}
          <HeadingIndicator heading={uavState.heading} />
          
          {/* Static Pitch Ladder Component */}
          <PitchLadder
            bank={uavState.bank}
            gearPosition={uavState.gearPosition}
          />

          {/* Bank Indicator - now between 5 and 10 degrees nose low */}
          <BankIndicator bank={uavState.bank} showLabels={false} />

          {/* Current Airspeed Box */}
          <div className="absolute left-[15%] top-[45%] border border-green-500 px-4 py-2">
            <div className="text-green-500 font-mono text-xl">
              {uavState.airspeed}
            </div>
          </div>

          {/* Static Pitch Ladder Component */}
          <PitchLadder
            bank={uavState.bank}
            gearPosition={uavState.gearPosition}
          />

          {/* Current Altitude Box */}
          <div className="absolute right-[15%] top-[45%]">
            <div className="border border-green-500 px-4 py-2">
              <div className="text-green-500 font-mono text-xl">
                {uavState.altitude}
              </div>
            </div>
          </div>

          {/* Flight Path Marker Component */}
          <FlightPathMarker bank={uavState.bank} pitch={uavState.pitch} />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [uavState, setUavState] = useState({
    airspeed: 150,
    altitude: 16000,
    pitch: 0,
    bank: 0,
    heading: 360,
    gearPosition: "up",
    pla: 125,
  });

  const handleKeyDown = (e) => {

    // Check if any input element is focused
    if (document.activeElement.tagName === 'INPUT') {
      return; // Exit early if an input is focused
    }

    switch (e.key) {
      case "ArrowUp":
        // Increase pitch by 0.1 degrees, round to nearest 0.1
        setUavState((prev) => ({
          ...prev,
          pitch: Math.round((prev.pitch + 0.1) * 10) / 10,
        }));
        break;
      case "ArrowDown":
        setUavState((prev) => ({
          ...prev,
          pitch: Math.round((prev.pitch - 0.1) * 10) / 10,
        }));
        break;
      case "ArrowLeft":
        setUavState((prev) => ({
          ...prev,
          bank: Math.max(prev.bank - 1, -45),
        }));
        break;
      case "ArrowRight":
        setUavState((prev) => ({ ...prev, bank: Math.min(prev.bank + 1, 45) }));
        break;
      case "g":
      case "G":
        setUavState((prev) => ({
          ...prev,
          gearPosition: prev.gearPosition === "up" ? "down" : "up",
        }));
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex h-full space-x-1">
        <div className="w-1/3 m-1">
          <ControlPanel uavState={uavState} onStateChange={setUavState} />
        </div>
        <div className="w-2/3 m-1 flex items-center justify-center">
          <HUDDisplay uavState={uavState} />
        </div>
      </div>
      </div>
  );
}

export default App;
