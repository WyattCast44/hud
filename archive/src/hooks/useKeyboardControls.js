import { useEffect } from 'react';

export function useKeyboardControls(setUavState) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement.tagName === 'INPUT') return;

      const keyActions = {
        ArrowUp: (prev) => ({
          ...prev,
          pitch: Math.round((prev.pitch + 0.1) * 10) / 10,
        }),
        ArrowDown: (prev) => ({
          ...prev,
          pitch: Math.round((prev.pitch - 0.1) * 10) / 10,
        }),
        ArrowLeft: (prev) => ({
          ...prev,
          bank: Math.max(prev.bank - 1, -45),
        }),
        ArrowRight: (prev) => ({
          ...prev,
          bank: Math.min(prev.bank + 1, 45),
        }),
        g: (prev) => ({
          ...prev,
          gearPosition: prev.gearPosition === "up" ? "down" : "up",
        }),
        G: (prev) => ({
          ...prev,
          gearPosition: prev.gearPosition === "up" ? "down" : "up",
        }),
        p: (prev) => ({
          ...prev,
          powerMode: prev.powerMode === "speed" ? "pla" : "speed",
        }),
        P: (prev) => ({
          ...prev,
        }),
      };

      const action = keyActions[e.key];
      if (action) {
        setUavState(action);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setUavState]);
} 