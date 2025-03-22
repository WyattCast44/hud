import { useState, useEffect, useCallback } from "react";
import UAVState from "../types/UAVState";
import SimulationControls from "../types/SimulationControls";

const SIMULATION_RATE = 60; // Hz
const TIME_STEP = 1 / SIMULATION_RATE; // seconds

export function useUAVSimulation(
  initialState: UAVState
): [UAVState, SimulationControls] {
  const [state, setState] = useState<UAVState>(initialState);
  const [isRunning, setIsRunning] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<number>(0);

  // Simulation loop
  useEffect(() => {
    let animationFrameId: number;

    const updateSimulation = (timestamp: number) => {
      if (!isRunning) return;

      const deltaTime = timestamp - lastUpdate;
      if (deltaTime >= TIME_STEP * 1000) {
        // Convert to milliseconds
        setState((prevState) => {
          // Basic physics-based updates
          const newState = { ...prevState };

          // Update position based on speed and heading
          if (newState.keas && newState.heading) {
            const speedMetersPerSecond = newState.keas * 0.514444; // Convert knots to m/s
            const headingRadians = (newState.heading * Math.PI) / 180;

            // Simple position update (this is a very basic model)
            if (newState.latitude && newState.longitude) {
              const earthRadius = 6371000; // meters
              const latChange =
                (speedMetersPerSecond * Math.sin(headingRadians) * TIME_STEP) /
                earthRadius;
              const lonChange =
                (speedMetersPerSecond * Math.cos(headingRadians) * TIME_STEP) /
                (earthRadius * Math.cos((newState.latitude * Math.PI) / 180));

              newState.latitude += latChange * (180 / Math.PI);
              newState.longitude += lonChange * (180 / Math.PI);
            }
          }

          // Update altitude based on gamma
          if (newState.gamma) {
            const verticalSpeed =
              newState.keas *
              Math.sin((newState.gamma * Math.PI) / 180) *
              101.268; // ft/min
            newState.altitude += (verticalSpeed * TIME_STEP) / 60; // Convert to feet per second
          }

          // Update heading based on bank angle and speed
          if (newState.bank && newState.keas) {
            const turnRate =
              (9.81 * Math.tan((newState.bank * Math.PI) / 180)) /
              (newState.keas * 0.514444);
            newState.heading += turnRate * TIME_STEP * (180 / Math.PI);
            newState.heading = newState.heading % 360;
          }

          return newState;
        });
        setLastUpdate(timestamp);
      }

      animationFrameId = requestAnimationFrame(updateSimulation);
    };

    if (isRunning) {
      animationFrameId = requestAnimationFrame(updateSimulation);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isRunning, lastUpdate]);

  const start = useCallback(() => setIsRunning(true), []);
  const stop = useCallback(() => setIsRunning(false), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setState(initialState);
    setIsRunning(false);
  }, [initialState]);

  return [state, { isRunning, start, stop, pause, reset }];
}
