import React from "react";

const STANDARD_PITCH_LINE_WIDTH = 250;
const GEAR_DOWN_PITCH_LINE_WIDTH = 150;
const ZERO_PITCH_LINE_WIDTH = 325;
// we are leaving a gap in the center of all pitch lines for the flight path marker
const PITCH_LINE_CENTER_GAP_WIDTH = 100;

const STANDARD_PITCH_LINES = [
  -45, -35, -30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 45,
];

const GEAR_DOWN_PITCH_LINES = [
  -45, -35, -30, -25, -20, -15, -10, -5, -2.5, 0, 2.5, 5, 10, 15, 20, 25, 30,
  35, 45,
];

function getPitchLineWidth(degree: number) {
  let totalWidth;
  if (degree === 0) {
    totalWidth = ZERO_PITCH_LINE_WIDTH;
  } else if (Math.abs(degree) === 2.5) {
    totalWidth = GEAR_DOWN_PITCH_LINE_WIDTH;
  } else {
    totalWidth = STANDARD_PITCH_LINE_WIDTH;
  }
  // Return half width since we're splitting the line in two
  return `${(totalWidth / 2) - (PITCH_LINE_CENTER_GAP_WIDTH / 2)}px`;
}

function getLineStyle(degree: number, isLeft: boolean) {
  const baseStyle = {
    width: getPitchLineWidth(degree),
    height: "0.5px",
    transform: `
      translateX(${isLeft ? -PITCH_LINE_CENTER_GAP_WIDTH/2 : PITCH_LINE_CENTER_GAP_WIDTH/2}px)
      rotate(${isLeft ? degree : -degree}deg)
    `,
    transformOrigin: isLeft ? "right center" : "left center",
  };

  if (degree < 0) {
    return {
      ...baseStyle,
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
      {/* Pitch Lines */}
      {pitchLines.map((degree) => (
        <div
          key={degree}
          id={`pitch-line-${degree}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 flex items-center justify-center"
          style={{ transform: `translateY(${-degree * 20}px)` }}
        >
          {/* Left half of the line */}
          <div 
            className={`relative ${degree > 0 ? "print-bg-black" : "print-bg-black-dotted"}`} 
            style={getLineStyle(degree, true)}
          />
          {/* Right half of the line */}
          <div 
            className={`relative ${degree > 0 ? "print-bg-black" : "print-bg-black-dotted"}`} 
            style={getLineStyle(degree, false)}
          />
        </div>
      ))}
    </div>
  );
}
