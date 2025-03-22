type SimulationControls = {
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  pause: () => void;
  reset: () => void;
};

export default SimulationControls;
