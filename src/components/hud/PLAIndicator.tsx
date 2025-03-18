import React from "react";

export default function PLAIndicator({
  pla,
  powerMode,
}: {
  pla: number;
  powerMode: string;
}) {
  // Convert PLA (0-100) to degrees (270° arc, from 0° to 270°)
  const angle = pla * 2.7; // Maps 0-100 to 0° to 270°

  return (
    <div
      style={{
        top: "35%",
        left: "16%",
        transform: "translate(-50%, -50%)",
      }}
      className="absolute font-mono text-green-500 print:text-black w-20"
    >
      <svg viewBox="0 0 100 150" className="w-full">
        {/* Arc background */}
        <path
          d="M 50 10 A 40 40 0 1 1 10 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />

        {/* Arc start vertical line */}
        <line
          x1="50"
          y1="10"
          x2="50"
          y2="5"
          stroke="currentColor"
          strokeWidth="1"
        />

        {/* Arc end horizontal line */}
        <line
          x1="10"
          y1="50"
          x2="5"
          y2="50"
          stroke="currentColor"
          strokeWidth="1"
        />

        {/* Pointer */}
        <g transform={`rotate(${angle}, 50, 50)`}>
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="15"
            stroke="currentColor"
            strokeWidth="1"
          />
          {/* Arrow head */}
          <path
            d="M 45,20 L 50,15 L 55,20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          />
        </g>

        {/* Center text with background */}
        <circle
          cx="50"
          cy="50"
          r="15"
          fill="black"
          className="print:fill-white"
        />
        <text
          x="50"
          y="60"
          fontSize="24"
          fill="currentColor"
          fillOpacity="1"
          textAnchor="middle"
          stroke="currentColor"
          strokeWidth="1"
        >
          {pla}
        </text>

        {/* Mode text */}
        {powerMode === "pla" && (
          <text
            x="50"
            y="125"
            textAnchor="middle"
            fontSize="24"
            className="uppercase"
            fill="currentColor"
            fillOpacity="1"
            stroke="currentColor"
            strokeWidth="1"
          >
            {powerMode}
          </text>
        )}
      </svg>
    </div>
  );
}
