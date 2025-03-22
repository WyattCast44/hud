import BoardsPosition from "./BoardsPosition";
import GearPosition from "./GearPosition";
import PowerMode from "./PowerMode";

type UAVState = {
  // airspeeds
  keas: number;
  ktas: number | null | undefined;
  mach: number | null | undefined;

  // altitude
  altitude: number;
  altitudeMeters: number | null;

  // attitude
  gamma: number; // - down, + up
  commandedGamma: number | null;
  bank: number; // + right, - left
  commandedBank: number | null;
  heading: number; // 0-360
  commandedHeading: number | null;

  // course
  course: number | null;

  // gear
  gearPosition: GearPosition;  
  commandedGearPosition: GearPosition | null;

  // boards
  boardsPosition: BoardsPosition;
  commandedBoardsPosition: BoardsPosition | null;

  // power mode
  pla: number;
  powerMode: PowerMode;
  commandedSpeed: number | null;
  commandedPLA: number | null;

  // position
  longitude: number | null;
  latitude: number | null;  
}

export default UAVState;
