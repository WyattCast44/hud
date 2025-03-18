import React from "react";
import { UAVState, DisplayPreferences } from "../../App";
import ControlInput from "../inputs/ControlInput";
import ControlGear from "../inputs/ControlGear";
import ControlPowerMode from "../inputs/ControlPowerMode";
import ControlDownloadHud from "../inputs/ControlDownloadHud";
import ControlBoards from "../inputs/ControlBoards";

type ControlPanelProps = {
  uavState: UAVState;
  displayPreferences: DisplayPreferences;
  onStateChange: (state: UAVState) => void;
};

type Control = {
  name: string;
  label: string;
  unit: string;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  validate: (value: number | string) => number | string;
  type: "number" | "select" | "toggle";
  options?: string[];
  shortcut?: string;
};

const controls: Control[] = [
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
    name: "airspeed",
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
    name: "pitch",
    label: "Gamma",
    unit: "deg",
    defaultValue: 0,
    min: -45,
    max: 45,
    step: 0.1,
    validate: function (value: number | string): number | string {
      const num = Number(value);

      return Math.min(Math.max(num, -45), 45);
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

export default function ControlPanel({
  uavState,
  displayPreferences,
  onStateChange,
}: ControlPanelProps) {
  return (
    <section className="flex w-full flex-col bg-black h-full overflow-y-auto print:hidden">
      <header className="h-10 flex items-center justify-between border-x border-t border-gray-400">
        <h1 className="font-mono uppercase tracking-tight font-black pl-4">
          Control Panel
        </h1>
      </header>

      <main className="flex-1 border border-gray-400">
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
                powerMode: uavState.powerMode === "speed" ? "pla" : "speed",
              })
            }
          />
          
          <ControlGear
            position={uavState.gearPosition}
            shortcut="g"
            onToggle={() =>
              onStateChange({
                ...uavState,
                gearPosition: uavState.gearPosition === "up" ? "down" : "up",
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
        </div>
      </main>

      <footer className="w-full border-x border-b border-gray-400 h-10 flex items-center px-4 text-gray-400 font-mono text-sm">
        <p>Version 0.0.1</p>
      </footer>
    </section>
  );
}

export type { ControlPanelProps };
