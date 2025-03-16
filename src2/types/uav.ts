export interface UAVState {
  airspeed: number;
  altitude: number;
  pitch: number;
  bank: number;
  heading: number;
  gearPosition: 'up' | 'down';
  pla: number;
  powerMode: 'speed' | 'pla';
}

export interface Position2D {
  x: number;
  y: number;
}

export interface DisplayConfig {
  color: string;
  scale: number;
  position?: Position2D;
} 