import React, { useMemo } from "react";

function generatePoints(radius: number, numPoints: number) {
  let points: { x: number; y: number }[] = [];

  // so the points should be arranged in a circle
  // the first point should be at the top of the circle
  // the second point should be at the angle that equally spaces the points
  // with 11 total points and the first point at the top, the second point should be at 360 / 11 degrees
  // the third point should be at 2 * 360 / 11 degrees
  // and so on until the 11th point which should be at 11 * 360 / 11 degrees

  for (let i = 0; i < numPoints; i++) {
    const angle = (i * 2 * Math.PI) / numPoints; // Convert to radians

    const point = {
      x: radius * Math.cos(angle) + radius, // Translate to center (25,25)
      y: radius * Math.sin(angle) + radius, // Translate to center (25,25)
    };

    points.push(point);
  }

  return points;
}

function drawPoints(
  points: { x: number; y: number }[],
  radius: number,
  airspeed: number
) {
  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      viewBox={`0 0 ${(radius * 2)} ${(radius * 2)}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x={radius}
        y={radius+2}
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="currentColor"
        strokeWidth="0"
        fill="currentColor"
        fontSize="20"
        className="text-green-500 print:text-black"
      >
        {airspeed}
      </text>

      {points.map((point) => (
        <circle
          key={`${point.x}-${point.y}`}
          cx={point.x}
          cy={point.y}
          r={2}
          fill="currentColor"
        />
      ))}

    </svg>
  );
}

export default function GearDownAirspeedIndicator({
  airspeed,
}: {
  airspeed: number;
}) {
  // we need to draw a circle made of 11 equally spread out points
  // the circle should be 40px in diameter
  // the points should be 360 / 11 degrees apart
  // the points should be 10px in length
  // the points should be red
  // the circle should be black
  // the circle should be 1px in width
  // the circle should be centered on the screen
  // the airspeed should be displayed in the center of the circle
  let radius = 30;
  const numPoints = 11;

  const points = useMemo(() => {
    return generatePoints(radius, numPoints);
  }, [radius, numPoints]);

  return (
    <div
      style={{
        top: "55%",
        left: "20%",
        transform: "translate(-50%, -50%)",
      }}
      className="absolute flex items-center justify-center text-green-500 print:text-black print:border-black font-mono text-xl text-center w-20"
    >
      {drawPoints(points, radius, airspeed)}
    </div>
  );
}
