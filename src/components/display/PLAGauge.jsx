function PLAGauge({ pla, position = { x: 0, y: 10 }, showLabel = true }) {
  // Create tick marks for the circular gauge
  const generateTicks = () => {
    const ticks = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30) * (Math.PI / 180);
      const x1 = Math.cos(angle) * 20;
      const y1 = Math.sin(angle) * 20;
      const x2 = Math.cos(angle) * 25;
      const y2 = Math.sin(angle) * 25;
      
      ticks.push(
        <line
          key={i}
          x1={25 + x1}
          y1={25 + y1}
          x2={25 + x2}
          y2={25 + y2}
          stroke="currentColor"
          strokeWidth="1"
        />
      );
    }
    return ticks;
  };

  return (
    <div 
      className="absolute text-green-500"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`
      }}
    >
      <svg width="50" height="60" viewBox="0 0 50 60">
        {/* Circular gauge background */}
        <circle
          cx="25"
          cy="25"
          r="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        
        {/* Tick marks */}
        {generateTicks()}
        
        {/* PLA value */}
        <text
          x="25"
          y="28"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="currentColor"
          fontSize="12"
          className="font-mono"
        >
          {Math.round(pla)}
        </text>

        {/* PLA label */}
        {showLabel && (
          <text
            x="25"
            y="50"
            textAnchor="middle"
            fill="currentColor"
            fontSize="12"
            className="font-mono"
          >
            PLA
          </text>
        )}
      </svg>
    </div>
  );
}

export default PLAGauge; 