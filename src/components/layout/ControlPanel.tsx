import React, { useState } from "react";
import VehicleStateControlPanel from "./VehicleStateControlPanel";
import { UAVState } from "../../App";
import CalculatedStatePanel from "./CalculatedStatePanel";

interface SimulationControls {
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  pause: () => void;
  reset: () => void;
}

interface ControlPanelProps {
  uavState: UAVState;
  onStateChange: (state: UAVState) => void;
  simulationControls: SimulationControls;
}

export default function ControlPanel({
  uavState,
  onStateChange,
  simulationControls,
}: ControlPanelProps) {
  const [activeTab, setActiveTab] = useState<
    "vehicle" | "simulation" | "calculations"
  >("vehicle");

  return (
    <section className="flex w-full flex-col bg-black h-full print:hidden border border-gray-400 overflow-hidden">
      <header className="h-10 flex items-center justify-between border-x border-b border-gray-400">
        <h1 className="font-mono uppercase tracking-tight font-black pl-4">
          Control Panel
        </h1>
      </header>

      <main className="flex-1">
        {activeTab === "vehicle" && (
          <VehicleStateControlPanel
            uavState={uavState}
            onStateChange={onStateChange}
            simulationControls={simulationControls}
          />
        )}

        {activeTab === "calculations" && (
          <CalculatedStatePanel />
        )}
      </main>

      <footer className="h-10 flex items-center justify-center border-t border-gray-400">
        <div className="flex items-center justify-center border-gray-400 border-x divide-x divide-gray-400">
          <button
            onClick={() => setActiveTab("vehicle")}
            className={`h-10 px-4 font-mono text-lg hover:bg-neutral-800 cursor-pointer ${
              activeTab === "vehicle" ? "bg-neutral-800" : ""
            }`}
          >
            Vehicle
          </button>

          <button
            onClick={() => setActiveTab("calculations")}
            className={`h-10 px-4 font-mono text-lg hover:bg-neutral-800 cursor-pointer ${
              activeTab === "calculations" ? "bg-neutral-800" : ""
            }`}
          >
            Calculations
          </button>
        </div>
      </footer>
    </section>
  );
}

export type { ControlPanelProps };
{
  /* <div className="w-1/2">
        <div className="mt-4 p-4 border border-gray-400">
          <h2 className="text-lg font-bold mb-2">Simulation Controls</h2>
          <div className="flex space-x-2">
            <button
              onClick={simulationControls.start}
              disabled={simulationControls.isRunning}
              className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
            >
              Start
            </button>
            <button
              onClick={simulationControls.stop}
              disabled={!simulationControls.isRunning}
              className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
            >
              Stop
            </button>
            <button
              onClick={simulationControls.pause}
              disabled={!simulationControls.isRunning}
              className="px-4 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
            >
              Pause
            </button>
            <button
              onClick={simulationControls.reset}
              className="px-4 py-2 bg-gray-600 text-white rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </div> */
}
