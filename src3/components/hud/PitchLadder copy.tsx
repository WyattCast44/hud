import React from "react";

const STANDARD_PITCH_LINE_WIDTH = 200;
const GEAR_DOWN_PITCH_LINE_WIDTH = 150;
const ZERO_PITCH_LINE_WIDTH = 400;
// we are leaving a gap in the center of the zero pitch line for the flight path marker
const ZERO_PITCH_LINE_CENTER_GAP_WIDTH = 50;

const STANDARD_PITCH_LINES = [
  -45, -35, -30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 45,
];

const GEAR_DOWN_PITCH_LINES = [
  -45, -35, -30, -25, -20, -15, -10, -5, -2.5, 0, 2.5, 5, 10, 15, 20, 25, 30,
  35, 45,
];

function getPitchLineWidth(degree: number) {
  if (degree === 0) return `${ZERO_PITCH_LINE_WIDTH}px`;
  if (Math.abs(degree) === 2.5) return `${GEAR_DOWN_PITCH_LINE_WIDTH}px`;
  return `${STANDARD_PITCH_LINE_WIDTH}px`;
}

export default function PitchLadder({
  bank,
  gearPosition,
}: {
  bank: number;
  gearPosition: string;
}) {
  const pitchLines =
    gearPosition === "down" ? GEAR_DOWN_PITCH_LINES : STANDARD_PITCH_LINES;

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
      style={{
        transform: `rotate(${bank}deg)`,
      }}
    >
      {/* Center Line */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="h-[1px] bg-green-500"
          style={{
            width: getPitchLineWidth(0),
          }}
        ></div>
      </div>
    </div>
  );
}
