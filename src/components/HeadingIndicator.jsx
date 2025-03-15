function HeadingIndicator({ heading }) {
  // Ensure heading is between 1 and 360
  const normalizeHeading = (hdg) => {
    hdg = ((hdg - 1) % 360) + 1;
    if (hdg < 1) hdg += 360;
    return hdg;
  };

  // Generate ticks and labels for ±30 degrees around current heading
  const generateTicks = () => {
    const ticks = [];
    const normalizedHeading = normalizeHeading(heading);
    
    // Generate ticks for ±30 degrees
    for (let offset = -30; offset <= 30; offset++) {
      let tickHeading = normalizedHeading + offset;
      tickHeading = normalizeHeading(tickHeading);
      
      if (offset === 0) continue; // Skip current heading

      const x = offset * 4; // 4px spacing between ticks
      const tickHeight = tickHeading % 10 === 0 ? 10 : 5; // Longer ticks for multiples of 10

      ticks.push(
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
          {tickHeading % 10 === 0 && (
            <text
              x={x}
              y={-5}
              textAnchor="middle"
              fill="currentColor"
              fontSize="12"
              className="font-mono"
            >
              {tickHeading}
            </text>
          )}
        </g>
      );
    }
    return ticks;
  };

  return (
    <div className="absolute left-1/2 top-[3%] -translate-x-1/2 text-green-500">
      <svg width="300" height="50" viewBox="-120 -20 240 40">
        {/* Background */}
        <rect
          x="-120"
          y="10"
          width="240"
          height="0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        
        {/* Tick marks and labels */}
        {generateTicks()}
        
        {/* Current heading */}
        <text
          x="0"
          y="-5"
          textAnchor="middle"
          fill="currentColor"
          fontSize="16"
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

export default HeadingIndicator; 