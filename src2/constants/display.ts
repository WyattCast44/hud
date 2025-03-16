export const DISPLAY_CONSTANTS = {
  COLOR: {
    PRIMARY: 'rgb(34 197 94)', // green-500
    BACKGROUND: '#000000',
    BORDER: 'rgb(156 163 175)', // gray-400
  },
  SCALE: {
    PITCH_DEGREE_TO_PIXELS: 20,
    HEADING_DEGREE_TO_PIXELS: 4,
  },
  DIMENSIONS: {
    ASPECT_RATIO: 4/3,
    MAX_WIDTH: '133.33vh',
  },
} as const;

export const HUD_ELEMENTS = {
  PITCH_LADDER: {
    STANDARD_ANGLES: [-10, -5, 0, 5, 10],
    GEAR_DOWN_ANGLES: [-10, -5, -2.5, 0, 2.5, 5, 10],
    LINE_WIDTHS: {
      CENTER: 400,
      STANDARD: 200,
      HALF_DEGREE: 150,
    },
  },
  BANK_INDICATOR: {
    RADIUS: 150,
    CENTER: { X: 200, Y: 0 },
    ANGLES: [-45, -30, -20, -10, 0, 10, 20, 30, 45],
  },
} as const; 