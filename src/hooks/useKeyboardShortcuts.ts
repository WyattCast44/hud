import { useEffect } from "react";
import hotkeys from "hotkeys-js";
import BoardsPosition from "../types/BoardsPosition";
import { normalizeHeading } from "../utils/math";
import UAVState from '../types/UAVState';
import SimulationControls from '../types/SimulationControls';
import GearPosition from "../types/GearPosition";
import PowerMode from "../types/PowerMode";
type SetUAVState = (callback: (prev: UAVState) => UAVState) => void;

export function useKeyboardShortcuts(
  uavState: UAVState,
  onStateChange: (state: UAVState) => void,
  simulationControls: SimulationControls
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {

      // if an input is focused, don't handle the keydown event
      if (document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLButtonElement) {
        return;
      }

      // Simulation controls
      if (e.key === ' ') { // Spacebar
        if (simulationControls.isRunning) {
          simulationControls.pause();
        } else {
          simulationControls.start();
        }
        return;
      }
      if (e.key === 'r') {
        simulationControls.reset();
        return;
      }

      // Original controls
      const newState = { ...uavState };
      let updated = false;

      switch (e.key) {
        case 'ArrowUp':
          if (e.ctrlKey) {
            newState.pla = Math.min((newState.pla || 0) + 1, 100);
          } else {
            newState.gamma = Math.min((newState.gamma || 0) + .1, 45);
            newState.gamma = parseFloat(newState.gamma.toFixed(2));
          }
          updated = true;
          break;
        case 'ArrowDown':
          if (e.ctrlKey) {
            newState.pla = Math.max((newState.pla || 0) - 1, 0);
          } else {
            newState.gamma = Math.max((newState.gamma || 0) - .1, -45);
            newState.gamma = parseFloat(newState.gamma.toFixed(2));
          }
          updated = true;
          break;
        case 'ArrowLeft':
          newState.bank = Math.max(newState.bank - 1, -45);
          updated = true;
          break;
        case 'ArrowRight':
          newState.bank = Math.min(newState.bank + 1, 45);
          updated = true;
          break;
        case 'g':
          newState.gearPosition = newState.gearPosition === GearPosition.UP ? GearPosition.DOWN : GearPosition.UP;
          updated = true;
          break;
        case 't':
          newState.powerMode = newState.powerMode === PowerMode.SPEED ? PowerMode.PLA : PowerMode.SPEED;
          updated = true;
          break;
        case 'h':
          newState.heading = normalizeHeading(360);
          newState.bank = 0;
          newState.gamma = 0;
          updated = true;
          break;
        case 'b':
          newState.boardsPosition = (() => {
            switch (newState.boardsPosition) {
              case BoardsPosition.IN:
                return BoardsPosition.HALF;
              case BoardsPosition.HALF:
                return BoardsPosition.FULL;
              case BoardsPosition.FULL:
                return BoardsPosition.LOCKED;
              case BoardsPosition.LOCKED:
                return BoardsPosition.IN;
              default:
                return BoardsPosition.IN;
            }
          })();
          updated = true;
          break;
      }


      // need to fix: heading, airspeed, and altitude

      if (updated) {
        onStateChange(newState);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [uavState, onStateChange, simulationControls]);
}
