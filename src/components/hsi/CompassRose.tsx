import React from 'react';

export default function CompassRose({
    northUp = false,
    heading = 0,
}: {
    northUp: boolean;
    heading: number;
}) {
    const cardinalPoints = [
        { label: 'N', angle: 0 },
        { label: 'E', angle: 90 },
        { label: 'S', angle: 180 },
        { label: 'W', angle: 270 }
    ];

    const tickMarks = Array.from({ length: 72 }, (_, i) => i * 5); // Create tick marks every 5 degrees

    return (
        <svg
            viewBox="-250 -250 500 500"
            className="compass-rose"
        >
            {/* Outer circle */}
            <circle
                r="200"
                fill="none"
                stroke="#404040"
                strokeWidth="2"
            />

            {/* Tick marks */}
            {tickMarks.map((angle) => {
                const isMajor = angle % 30 === 0;
                const length = isMajor ? 20 : 10;
                const strokeWidth = isMajor ? 2 : 1;
                const radians = (angle * Math.PI) / 180;
                const x1 = Math.sin(radians) * 200;
                const y1 = -Math.cos(radians) * 200;
                const x2 = Math.sin(radians) * (200 - length);
                const y2 = -Math.cos(radians) * (200 - length);

                return (
                    <line
                        key={angle}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#404040"
                        strokeWidth={strokeWidth}
                    />
                );
            })}

            {/* Cardinal points */}
            {cardinalPoints.map(({ label, angle }) => {
                const radians = (angle * Math.PI) / 180;
                const x = Math.sin(radians) * 170;
                const y = -Math.cos(radians) * 170;

                return (
                    <text
                        key={label}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#404040"
                        fontSize="24"
                    >
                        {label}
                    </text>
                );
            })}
        </svg>
    );
}
