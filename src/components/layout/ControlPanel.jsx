import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import ControlInput from "./ControlInput";
import GearControl from "./GearControl";
import PowerModeControl from "./PowerModeControl";

function ControlPanel({ uavState, onStateChange }) {
  const handleInputChange = (name, value) => {
    if (name === "heading") {
      let newHeading = parseFloat(value) || 0;
      if (newHeading > 360) newHeading = 1;
      if (newHeading < 1) newHeading = 360;
      onStateChange({ ...uavState, [name]: newHeading });
    } else {
      onStateChange({ ...uavState, [name]: parseFloat(value) || 0 });
    }
  };

  const controls = [
    { 
      name: uavState.powerMode === "speed" ? "airspeed" : "pla",
      label: uavState.powerMode === "speed" ? "Airspeed" : "Power",
      unit: uavState.powerMode === "speed" ? "KEAS" : "PLA",
    },
    { name: "heading", label: "Heading", unit: "DEG", min: 1, max: 360 },
    { name: "altitude", label: "Altitude", unit: "MSL" },
    { name: "pitch", label: "Pitch", unit: "DEG", step: 0.1 },
    { 
      name: "bank", 
      label: "Bank", 
      unit: "DEG", 
      step: 1,
      min: -45,
      max: 45,
      validate: (value) => Math.min(Math.max(value, -45), 45)
    }
  ];

  return (
    <section className="flex w-full flex-col -outline-offset-1 bg-black h-full pv overflow-hidden">
      <header className="h-10 flex items-center justify-between border-x border-t border-gray-400">
        <h1 className="font-mono uppercase tracking-tight font-black pl-4">Control Panel</h1>
        <button className="border-l flex items-center size-10 justify-center border-gray-400 cursor-pointer">
          <ArrowLeftIcon className="size-4 text-gray-400" />
        </button>
      </header>

      <div className="flex-1 bg-black">
        <div className="grid grid-cols-3 w-full h-auto grid-rows-3 divide-x divide-y divide-gray-400 border border-gray-400">
          {controls.map(control => (
            <ControlInput
              key={control.name}
              {...control}
              value={uavState[control.name]}
              onChange={(value) => handleInputChange(control.name, value)}
            />
          ))}
          <PowerModeControl
            mode={uavState.powerMode}
            onToggle={() => onStateChange({
              ...uavState,
              powerMode: uavState.powerMode === "speed" ? "pla" : "speed"
            })}
          />
          <GearControl
            position={uavState.gearPosition}
            onToggle={() => onStateChange({
              ...uavState,
              gearPosition: uavState.gearPosition === "up" ? "down" : "up"
            })}
          />

          
        </div>
      </div>

      <footer className="w-full border-t border-gray-400 h-10 flex items-center px-4 text-gray-400 font-mono text-sm">
        Status: Connected
      </footer>
    </section>
  );
}

export default ControlPanel; 