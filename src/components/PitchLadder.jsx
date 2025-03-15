function PitchLadder({ bank, gearPosition }) {
  // Define all pitch angles, including conditional 2.5° lines
  const standardPitchLines = [-10, -5, 0, 5, 10];
  const gearDownPitchLines = [-10, -5, -2.5, 0, 2.5, 5, 10];
  const pitchLines = gearPosition === 'down' ? gearDownPitchLines : standardPitchLines;

  // Helper function to determine line width
  const getLineWidth = (degree) => {
    if (degree === 0) return '400px';
    if (Math.abs(degree) === 2.5) return '150px';
    return '200px';
  };

  // Helper function to generate end ticks
  const generateEndTicks = (degree) => {
    const tickLength = 10;
    const isPositive = degree > 0;
    
    return (
      <>
        {/* Left tick */}
        <div 
          className="absolute h-[10px] w-[1px] bg-green-500"
          style={{
            left: 0,
            top: isPositive ? 'auto' : 0,
            bottom: isPositive ? 0 : 'auto',
            transform: 'translateX(-1px)'
          }}
        />
        {/* Right tick */}
        <div 
          className="absolute h-[10px] w-[1px] bg-green-500"
          style={{
            right: 0,
            top: isPositive ? 'auto' : 0,
            bottom: isPositive ? 0 : 'auto',
            transform: 'translateX(1px)'
          }}
        />
      </>
    );
  };

  // Helper function to format pitch label
  const formatPitchLabel = (degree) => {
    const absValue = Math.abs(degree).toString().padStart(2, ' ');
    return degree < 0 ? `-${absValue}` : ` ${absValue}`;
  };

  return (
    <div 
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
      style={{ 
        transform: `rotate(${bank}deg)`
      }}
    >
      {/* Center Line */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[1px] w-[400px] bg-green-500"></div>
      </div>

      {/* Pitch Lines */}
      {pitchLines.map(degree => {
        const width = getLineWidth(degree);
        return (
          <div 
            key={degree} 
            className="absolute left-1/2 top-1/2 -translate-x-1/2"
            style={{ 
              transform: `translateY(${-degree * 20}px)`,
            }}
          >
            {degree !== 0 && (
              <div className="relative flex items-center justify-center">
                {/* Main line */}
                <div 
                  className="h-[1px] bg-green-500 relative"
                  style={{ width }}
                >
                  {/* End ticks */}
                  {generateEndTicks(degree)}
                </div>

                {/* Pitch value labels */}
                <div className="absolute left-0 transform -translate-x-[35px] text-green-500 font-mono text-sm whitespace-pre">
                  {formatPitchLabel(degree)}
                </div>
                <div className="absolute right-0 transform translate-x-[35px] text-green-500 font-mono text-sm whitespace-pre">
                  {formatPitchLabel(degree)}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PitchLadder; 