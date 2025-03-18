import React from "react";
import { BoardsPosition } from "../../App";

export default function FlightPathMarker({
  bank,
  pitch,
  boardsPosition,
}: {
  bank: number;
  pitch: number;
  boardsPosition: BoardsPosition;
}) {
  const style = {
    transform: `
            translate(-50%, -50%) 
            rotate(${bank}deg)
            translate(0, ${-pitch * 20}px)
        `,
  };

  return (
    <div className="absolute left-1/2 top-1/2 text-green-500 print:text-black" style={style}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" className="text-green-500 print:text-black">
        {/* Circle */}
        <circle 
          cx="15" 
          cy="15" 
          r="6" 
          stroke="currentColor" 
          strokeWidth="1" 
          fill="none"
        />
        
        {/* Horizontal lines */}
        <line 
          x1="0" 
          y1="15" 
          x2="9" 
          y2="15" 
          stroke="currentColor" 
          strokeWidth="1"
        />
        <line 
          x1="21" 
          y1="15" 
          x2="30" 
          y2="15" 
          stroke="currentColor" 
          strokeWidth="1"
        />
        
        {/* Vertical line */}
        <line 
          x1="15" 
          y1="0" 
          x2="15" 
          y2="9" 
          stroke="currentColor" 
          strokeWidth="1"
        />

        {/* Boards position */}
        {boardsPosition != BoardsPosition.IN && boardsPosition != BoardsPosition.LOCKED && (
          <line
            x1="5"
            y1="15"
            x2="5"
            y2={boardsPosition === BoardsPosition.HALF ? "25" : "45"}
            stroke="currentColor"
            strokeWidth="1.5"
          />
        )}
        
      </svg>
    </div>
  );
}
