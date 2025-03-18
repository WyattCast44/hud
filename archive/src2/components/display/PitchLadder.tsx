import { memo } from 'react';
import { HUD_ELEMENTS, DISPLAY_CONSTANTS } from '../../constants/display';
import { formatPitchLabel } from '../../utils/math';

interface PitchLadderProps {
  bank: number;
  gearPosition: 'up' | 'down';
}

function PitchLine({ 
  degree, 
  width 
}: { 
  degree: number; 
  width: number;
}) {
  const isPositive = degree > 0;
  const lineStyle = {
    width: `${width}px`,
    height: '1px',
    ...(degree < 0 ? {
      backgroundImage: `linear-gradient(to right, ${DISPLAY_CONSTANTS.COLOR.PRIMARY} 50%, transparent 50%)`,
      backgroundSize: '10px 1px',
      backgroundRepeat: 'repeat-x',
    } : {
      backgroundColor: DISPLAY_CONSTANTS.COLOR.PRIMARY,
    }),
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="relative" style={lineStyle}>
        {/* Ticks */}
        {['left', 'right'].map(side => (
          <div
            key={side}
            className="absolute h-[10px] w-[1px] bg-green-500"
            style={{
              [side]: 0,
              top: isPositive ? 'auto' : 0,
              bottom: isPositive ? 0 : 'auto',
              transform: `translateX(${side === 'left' ? -1 : 1}px)`,
            }}
          />
        ))}
      </div>
      
      {/* Labels */}
      {['left', 'right'].map(side => (
        <div
          key={side}
          className="absolute text-green-500 font-mono text-sm whitespace-pre"
          style={{
            [side]: 0,
            transform: `translateX(${side === 'left' ? -35 : 35}px)`,
          }}
        >
          {formatPitchLabel(degree)}
        </div>
      ))}
    </div>
  );
}

const PitchLadder = memo(function PitchLadder({ bank, gearPosition }: PitchLadderProps) {
  const pitchLines = gearPosition === 'down' 
    ? HUD_ELEMENTS.PITCH_LADDER.GEAR_DOWN_ANGLES 
    : HUD_ELEMENTS.PITCH_LADDER.STANDARD_ANGLES;

  const getLineWidth = (degree: number): number => {
    if (degree === 0) return HUD_ELEMENTS.PITCH_LADDER.LINE_WIDTHS.CENTER;
    if (Math.abs(degree) === 2.5) return HUD_ELEMENTS.PITCH_LADDER.LINE_WIDTHS.HALF_DEGREE;
    return HUD_ELEMENTS.PITCH_LADDER.LINE_WIDTHS.STANDARD;
  };

  return (
    <div 
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
      style={{ transform: `rotate(${bank}deg)` }}
    >
      {/* Center Line */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div 
          className="h-[1px] bg-green-500"
          style={{ width: `${HUD_ELEMENTS.PITCH_LADDER.LINE_WIDTHS.CENTER}px` }}
        />
      </div>

      {/* Pitch Lines */}
      {pitchLines.map(degree => (
        degree !== 0 && (
          <div 
            key={degree}
            className="absolute left-1/2 top-1/2 -translate-x-1/2"
            style={{ 
              transform: `translateY(${-degree * DISPLAY_CONSTANTS.SCALE.PITCH_DEGREE_TO_PIXELS}px)` 
            }}
          >
            <PitchLine degree={degree} width={getLineWidth(degree)} />
          </div>
        )
      ))}
    </div>
  );
});

export default PitchLadder; 