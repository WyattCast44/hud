function BankIndicator({ bank, showLabels = false }) {
  // Arc radius and center point
  const radius = 150;
  const centerX = 200;
  const centerY = 0;

  // Helper function to convert polar to cartesian coordinates
  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  // Generate tick marks
  const generateTicks = () => {
    const ticks = [];
    // Add ticks at -45, -30, -20, -10, 0, 10, 20, 30, 45 degrees
    [-45, -30, -20, -10, 0, 10, 20, 30, 45].forEach(angle => {
      const tickLength = angle % 45 === 0 ? 15 : (angle % 10 === 0 ? 10 : 7);
      const start = polarToCartesian(centerX, centerY, radius, angle + 90);
      const end = polarToCartesian(centerX, centerY, radius - tickLength, angle + 90);
      
      ticks.push(
        <g key={angle}>
          <line
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke="currentColor"
            strokeWidth="1"
          />
          {showLabels && (angle % 10 === 0) && (
            <text
              x={polarToCartesian(centerX, centerY, radius - 25, angle + 90).x}
              y={polarToCartesian(centerX, centerY, radius - 25, angle + 90).y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="currentColor"
              fontSize="12"
            >
              {Math.abs(angle)}
            </text>
          )}
        </g>
      );
    });
    return ticks;
  };

  // Bank pointer triangle - pointing upward, aligned with tick marks
  const bankPointer = () => {
    // Get the base point (center of triangle base)
    const basePoint = polarToCartesian(centerX, centerY, radius + 15, 90 + bank);
    
    // Calculate the tip point (aligned with tick marks)
    const tipPoint = polarToCartesian(centerX, centerY, radius, 90 + bank);
    
    // Calculate the base corners (10px wide base)
    const leftBase = {
      x: basePoint.x - 5,
      y: basePoint.y
    };
    const rightBase = {
      x: basePoint.x + 5,
      y: basePoint.y
    };
    
    return `M ${tipPoint.x} ${tipPoint.y} L ${leftBase.x} ${leftBase.y} L ${rightBase.x} ${rightBase.y} Z`;
  };

  return (
    <div className="absolute left-1/2 top-[51%] -translate-x-1/2 text-green-500">
      <svg width="400" height="400" viewBox="0 0 400 400" className="scale-75">
        
        {/* Tick marks */}
        {generateTicks()}
        
        {/* Bank pointer */}
        <path
          d={bankPointer()}
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export default BankIndicator; 