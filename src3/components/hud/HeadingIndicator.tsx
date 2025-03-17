import React from "react";
import { normalizeHeading } from "../../utils/math";

const INDICATOR_WIDTH = 300;
const INDICATOR_HEIGHT = 50;
const TICK_SPACING = INDICATOR_WIDTH / 60; // 60 ticks for 360 degrees
const TICK_HEIGHT = -5;
const TICK_HEIGHT_MAJOR = -8;

function generateTicks(heading: number) {
  const ticks: React.ReactNode[] = [];

  // normalize the starting / center heading
  let normalizedHeading = normalizeHeading(heading);

  // generate ticks for ±30 degrees off center
  for (let offset = -30; offset <= 30; offset++) {
    let tickHeading = normalizedHeading + offset;

    // normalize the tick heading, ensuring it's within 1-360
    tickHeading = normalizeHeading(tickHeading);

    if (offset === 0) continue; // skip the current heading

    // calculate the x position of the tick
    const x = offset * TICK_SPACING;

    // determine the height of the tick based on the heading
    const tickHeight = tickHeading % 10 === 0 ? TICK_HEIGHT_MAJOR : TICK_HEIGHT;

    let tick = (
      <g key={offset}>
        {/* Tick mark */}
        <line
          x1={x}
          y1={0}
          x2={x}
          y2={tickHeight}
          stroke="currentColor"
          strokeWidth="1"
        />

        {/* Label for multiples of 10 */}
        {/* dont add labels for the current heading */}
        {/* dont add labels in the value is with 5 degrees of the center heading */}
        {tickHeading % 10 === 0 && offset !== 0 && Math.abs(offset) > 5 && (
          <text
            x={x}
            y={-10}
            textAnchor="middle"
            fill="currentColor"
            fontSize="10"
            className="font-mono"
          >
            {tickHeading}
          </text>
        )}
      </g>
    );

    // add the tick to the list
    ticks.push(tick);
  }

  return ticks;
}

export default function HeadingIndicator({ heading }: { heading: number }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 text-green-500 print:text-black top-[3%] z-10">
      <svg
        width={INDICATOR_WIDTH}
        height={INDICATOR_HEIGHT}
        viewBox="-120 -20 240 40"
      >
        <rect
          x={-120}
          y={-20}
          width={INDICATOR_WIDTH}
          height={INDICATOR_HEIGHT+20}
          fill="black"
          fillOpacity={100}
          id="heading-indicator-background"
          className="print:fill-white"
        />

        {/* Tick marks and labels */}
        {generateTicks(heading)}

        {/* Current heading */}
        <text
          x={0}
          y={-10}
          textAnchor="middle"
          fill="currentColor"
          fontSize="14"
          className="font-mono"
        >
          {Math.round(normalizeHeading(heading))}
        </text>

        {/* Center marker */}
        <path
          d="M 0,-1 L -5,3 L 5,3 Z"
          fill="currentColor"
          className="rotate-180"
        />
      </svg>
    </div>
  );
}
