import React from "react";

const STANDARD_PITCH_LINE_WIDTH = 250;
const GEAR_DOWN_PITCH_LINE_WIDTH = 150;
const ZERO_PITCH_LINE_WIDTH = 325;
// we are leaving a gap in the center of the zero pitch line for the flight path marker
const ZERO_PITCH_LINE_CENTER_GAP_WIDTH = 100;

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

function getLineStyle(degree: number) {
  const baseStyle = {
    width: getPitchLineWidth(degree),
    height: "0.5px",
  };

  if (degree < 0) {
    return {
      ...baseStyle,
      // we want the line to always start and end with a solid color that way it can match up with the tick marks
      backgroundImage:
        "linear-gradient(to right, rgb(34 197 94) 50%, transparent 50%)",
      backgroundSize: "10px 1px",
      backgroundRepeat: "repeat-x",
    };
  }

  return {
    ...baseStyle,
    backgroundColor: "rgb(34 197 94)", // green-500 in RGB
  };
}

export default function PitchLadder({
  bank,
  gearPosition,
  pitch,
}: {
  bank: number;
  gearPosition: string;
  pitch: number;
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
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        {/* build the center line from two lines, so that we have the gap for the flight path marker */}
        <div
          className="h-px bg-green-500 print:bg-black"
          style={{
            width: ZERO_PITCH_LINE_WIDTH/2 - ZERO_PITCH_LINE_CENTER_GAP_WIDTH/2 + "px",
            transform: `translateX(-${ZERO_PITCH_LINE_CENTER_GAP_WIDTH/2}px)`,
          }}
        ></div>
        <div
          className="h-px bg-green-500 print:bg-black"
          style={{
            width: ZERO_PITCH_LINE_WIDTH/2 - ZERO_PITCH_LINE_CENTER_GAP_WIDTH/2 + "px",
            transform: `translateX(${ZERO_PITCH_LINE_CENTER_GAP_WIDTH/2}px)`,
          }}
        ></div>

      
      </div>

      {/* Pitch Lines */}
      {pitchLines.map((degree) => {
        if (degree === 0) return null;

        return (
          <div
            key={degree}
            id={`pitch-line-${degree}`}
            className="absolute left-1/2 top-1/2 -translate-x-1/2"
            // why is this -degree * 20?
            // because we want to move the line up or down based on the degree
            // and we want to move it 20px for each degree
            // and we want to move it up if the degree is negative and down if the degree is positive
            // so we multiply the degree by -20 to move it up or down
            style={{ transform: `translateY(${-degree * 20}px)` }}
          >
            {/* Main line */}
            <div className={`relative ${degree >0 ? "print-bg-black" : "print-bg-black-dotted"}`} style={getLineStyle(degree)}></div>
          </div>
        );
      })}
    </div>
  );
}
