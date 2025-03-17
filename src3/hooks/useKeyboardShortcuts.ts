import { useEffect } from "react";
import hotkeys from "hotkeys-js";
import { BoardsPosition, UAVState } from "./../App";
import { normalizeHeading } from "../utils/math";
type SetUAVState = (callback: (prev: UAVState) => UAVState) => void;

export function useKeyboardShortcuts(setUavState: SetUAVState) {
  useEffect(() => {
    // Prevent shortcuts when focused on input elements
    hotkeys.filter = (event) => {
      return !(event.target instanceof HTMLInputElement);
    };

    // Define shortcuts
    hotkeys("up", (event) => {
      event.preventDefault();
      setUavState((prev) => ({
        ...prev,
        pitch: Math.round((prev.pitch + 0.1) * 10) / 10,
      }));
    });

    hotkeys("down", (event) => {
      event.preventDefault();
      setUavState((prev) => ({
        ...prev,
        pitch: Math.round((prev.pitch - 0.1) * 10) / 10,
      }));
    });

    hotkeys("left", (event) => {
      event.preventDefault();
      setUavState((prev) => ({
        ...prev,
        bank: Math.max(prev.bank - 1, -45),
      }));
    });

    hotkeys("right", (event) => {
      event.preventDefault();
      setUavState((prev) => ({
        ...prev,
        bank: Math.min(prev.bank + 1, 45),
      }));
    });

    hotkeys("g", () => {
      setUavState((prev) => ({
        ...prev,
        gearPosition: prev.gearPosition === "up" ? "down" : "up",
      }));
    });

    hotkeys("p", () => {
      setUavState((prev) => ({
        ...prev,
        powerMode: prev.powerMode === "speed" ? "pla" : "speed",
      }));
    });

    // p+up, p+down = pla
    hotkeys("ctrl+up", () => {
      setUavState((prev) => ({
        ...prev,
        pla: Math.min(prev.pla + 1, 100),
      }));
    });

    hotkeys("p+down", () => {
      setUavState((prev) => ({
        ...prev,
        pla: Math.max(prev.pla - 1, 0),
      }));
    });

    hotkeys("h+left", () => {
      setUavState((prev) => ({
        ...prev,
        heading: normalizeHeading(prev.heading - 1),
      }));
    });

    hotkeys("h+right", () => {
      setUavState((prev) => ({
        ...prev,
        heading: normalizeHeading(prev.heading + 1),
      }));
    });

    hotkeys("a+up", () => {
      setUavState((prev) => ({
        ...prev,
        airspeed: Math.min(prev.airspeed + 1, 500),
      }));
    });

    hotkeys("a+down", () => {
      setUavState((prev) => ({
        ...prev,
        airspeed: Math.max(prev.airspeed - 1, 0),
      }));
    });

    // z+up, z+down = altitude
    hotkeys("z+up", () => {
      setUavState((prev) => ({
        ...prev,
        altitude: Math.min(prev.altitude + 100, 100000),
      }));
    });

    hotkeys("z+down", () => {
      setUavState((prev) => ({
        ...prev,
        altitude: Math.max(prev.altitude - 100, 0),
      }));
    });

    // ctrl+h
    hotkeys("ctrl+h", (event) => {
      event.preventDefault();

      setUavState((prev) => ({
        ...prev,
        heading: normalizeHeading(360),
        bank: 0,
        pitch: 0,
      }));
    });

    hotkeys("b", () => {
      setUavState((prev) => ({
        ...prev,
        boardsPosition: (() => {
          switch (prev.boardsPosition) {
            case BoardsPosition.IN:
              return BoardsPosition.HALF;
            case BoardsPosition.HALF:
              return BoardsPosition.FULL;
            case BoardsPosition.FULL:
              return BoardsPosition.IN;
            default:
              return BoardsPosition.IN;
          }
        })(),
      }));
    });

    // Cleanup
    return () => {
      hotkeys.unbind(
        "up,down,left,right,g,p,ctrl+up,ctrl+down,h+left,h+right,a+up,a+down,z+up,z+down,b"
      );
    };
  }, [setUavState]);
}
