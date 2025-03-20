import React from "react";
import { normalizeHeading } from "../../utils/math";

const INDICATOR_WIDTH = 300;
const INDICATOR_HEIGHT = 50;
const TICK_SPACING = INDICATOR_WIDTH / 60; // 60 ticks for 360 degrees
const TICK_HEIGHT = -4;
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

    // calculate the x position of the tick
    const x = offset * TICK_SPACING;

    // determine the height of the tick based on the heading
    const tickHeight = tickHeading % 10 === 0 ? TICK_HEIGHT_MAJOR : TICK_HEIGHT;

    const elements: React.ReactNode[] = [];

    if (tickHeading % 5 === 0 || tickHeading % 10 === 0) {
      elements.push(
        <line
          x1={x}
          y1={0}
          x2={x}
          y2={tickHeight}
          stroke="currentColor"
          strokeWidth="1"
          id={`heading-indicator-tick-${offset}`}
        />
      );
    }

    if (tickHeading % 10 === 0 && offset !== 0 && Math.abs(offset) > 2) {
      elements.push(
        <text
          x={x}
          y={-10}
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          className="font-mono"
        >
          {tickHeading.toString().slice(0, 2)}
        </text>
      );
    }

    if (elements.length > 0) {
      ticks.push(<g key={`heading-indicator-tick-${offset}`}>{elements}</g>);
    }
  }

  return ticks;
}

export default function HeadingIndicator({ heading }: { heading: number }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 text-green-500 print:text-black top-[3%] z-10">
      <svg
        width={INDICATOR_WIDTH}
        height={INDICATOR_HEIGHT}
        viewBox="-120 -30 240 50"
      >
        <rect
          x={-120}
          y={-30}
          width={INDICATOR_WIDTH}
          height={INDICATOR_HEIGHT + 30}
          fillOpacity={100}
          id="heading-indicator-background"
          className="print:fill-white fill-black"
        />

        {/* Tick marks and labels */}
        {generateTicks(heading)}

        {/* Background rectangle for heading */}
        <rect
          x={-25}
          y={-23}
          width={50}
          height={16}
          stroke="currentColor"
          className="fill-black print:fill-white"
          strokeWidth={1}
        />
        <text
          x={0}
          y={-11}
          textAnchor="middle"
          fill="currentColor"
          fontSize="14"
          className="font-mono"
        >
          {normalizeHeading(heading).toString().padStart(3, "0")}
        </text>
      </svg>
    </div>
  );
}
