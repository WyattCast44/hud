import React from "react";
import { UAVState } from "../../App";
import ControlInput from "../inputs/ControlInput";
import ControlGear from "../inputs/ControlGear";
import ControlPowerMode from "../inputs/ControlPowerMode";
import ControlDownloadHud from "../inputs/ControlDownloadHud";
import PowerMode from "../../types/PowerMode";
import ControlBoards from "../inputs/ControlBoards";
import GearPosition from "../../types/GearPosition";
import ControlSimulation from "../inputs/ControlSimulation";
import InputControl from "../../types/InputControl";

interface SimulationControls {
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  pause: () => void;
  reset: () => void;
}

type VehicleStateControlPanelProps = {
  uavState: UAVState;
  onStateChange: (state: UAVState) => void;
  simulationControls: SimulationControls;
};

const controls: InputControl[] = [
  {
    name: "altitude",
    label: "Alt",
    unit: "MSL",
    defaultValue: 16000,
    min: 0,
    max: 100000,
    step: 100,
    validate: function (value: number | string): number | string {
      const num = Number(value);

      return Math.min(Math.max(num, 0), 100_000);
    },
    type: "number",
    shortcut: "z+up/down",
  },
  {
    name: "keas",
    label: "Airspeed",
    unit: "KEAS",
    defaultValue: 150,
    min: 0,
    max: 500,
    step: 1,
    validate: function (value: number | string): number | string {
      const num = Number(value);

      return Math.min(Math.max(num, 0), 500);
    },
    type: "number",
    shortcut: "a+up/down",
  },
  {
    name: "heading",
    label: "Heading",
    unit: "deg",
    defaultValue: 360,
    min: 0,
    max: 360,
    step: 1,
    validate: function (value: number | string): number | string {
      const num = Number(value);

      return Math.min(Math.max(num, 1), 360);
    },
    type: "number",
    shortcut: "h+left/right",
  },
  {
    name: "gamma",
    label: "Gamma",
    unit: "deg",
    defaultValue: 0,
    min: -45,
    max: 45,
    step: 0.1,
    validate: function (value: number | string): number | string {
      let num = Number(value);

      num = Math.min(Math.max(num, -45), 45);

      return parseFloat(num.toFixed(2));
    },
    type: "number",
    shortcut: "up/down",
  },
  {
    name: "bank",
    label: "Bank",
    unit: "deg",
    defaultValue: 0,
    min: -45,
    max: 45,
    step: 1,
    validate: function (value: number | string): number | string {
      const num = Number(value);

      return Math.min(Math.max(num, -45), 45);
    },
    type: "number",
    shortcut: "left/right",
  },
  {
    name: "pla",
    label: "Power",
    unit: "PLA",
    defaultValue: 30,
    min: 0,
    max: 100,
    step: 1,
    type: "number",
    validate: function (value: number | string): number | string {
      const num = Number(value);

      return Math.min(Math.max(num, 0), 100);
    },
    shortcut: "ctrl+up/down",
  },
];

export { controls };

export default function VehicleStateControlPanel({
  uavState,
  onStateChange,
}: VehicleStateControlPanelProps) {
  return (
    <div
          className="
        grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full h-auto divide-x divide-y divide-gray-400
        "
        >
          {controls.map((control) => (
            <ControlInput
              key={control.name}
              {...control}
              value={uavState[control.name]}
              onChange={(value) =>
                onStateChange({
                  ...uavState,
                  [control.name]: value,
                })
              }
            />
          ))}

          <ControlPowerMode
            mode={uavState.powerMode}
            shortcut="t"
            onToggle={() =>
              onStateChange({
                ...uavState,
                powerMode: uavState.powerMode === PowerMode.SPEED ? PowerMode.PLA : PowerMode.SPEED,
              })
            }
          />
          
          <ControlGear
            position={uavState.gearPosition}
            shortcut="g"
            onToggle={() =>
              onStateChange({
                ...uavState,
                gearPosition: uavState.gearPosition === GearPosition.UP ? GearPosition.DOWN : GearPosition.UP,
              })
            }
          />

          <ControlBoards
            position={uavState.boardsPosition}
            shortcut="b"
            onToggle={(position) =>
              onStateChange({
                ...uavState,
                boardsPosition: position,
              })
            }
          />

          <ControlDownloadHud shortcut="ctrl+p" />
          <ControlSimulation shortcut="ctrl+s" />
        </div>

  );
}

export type { VehicleStateControlPanelProps };
