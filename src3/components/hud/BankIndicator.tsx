import React from "react";
import { polarToCartesian } from "../../utils/math";

const BANK_INDICATOR_RADIUS = 150;
const BANK_INDICATOR_CENTER_X = 200;
const BANK_INDICATOR_CENTER_Y = 0;

function generateTicks(bank: number) {
    const ticks: React.ReactNode[] = [];

    // Add ticks at -45, -30, -20, -10, 0, 10, 20, 30, 45 degrees
    let angles = [-45, -30, -20, -10, 0, 10, 20, 30, 45];

    angles.forEach((angle) => {
        // calculate the tick length
        // if the angle is a multiple of 45, use 15px
        // if the angle is a multiple of 10, use 10px
        // otherwise, use 7px
        let tickLength = angle % 45 === 0 ? 15 : (angle % 10 === 0 ? 10 : 7);

        // dont show 45 and -45 ticks unless the bank is above +/- 30
        if(angle === 45 || angle === -45) {
            if(bank < 30 && bank > -30) {
                tickLength = 0;
            }
        }

        // calc the start point of the tick
        let start = polarToCartesian(BANK_INDICATOR_CENTER_X, BANK_INDICATOR_CENTER_Y, BANK_INDICATOR_RADIUS, angle + 90);

        // calculate the end point of the tick
        let end = polarToCartesian(BANK_INDICATOR_CENTER_X, BANK_INDICATOR_CENTER_Y, BANK_INDICATOR_RADIUS - tickLength, angle + 90);

        let tick = (
            <g key={angle}>
                <line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="currentColor"
                    strokeWidth="1"
                />
            </g>
        )

        ticks.push(tick);
    })

    return ticks;
}

function bankPointer(bank: number) {
   const angle = 90 + bank;
   // Get the tip point
   const tipPoint = polarToCartesian(
       BANK_INDICATOR_CENTER_X, 
       BANK_INDICATOR_CENTER_Y, 
       BANK_INDICATOR_RADIUS, 
       angle
   );
   
   // Get the base points using slightly different angles (±5 degrees from base)
   const leftBase = polarToCartesian(
       BANK_INDICATOR_CENTER_X,
       BANK_INDICATOR_CENTER_Y,
       BANK_INDICATOR_RADIUS + 10,
       angle - 3
   );
   
   const rightBase = polarToCartesian(
       BANK_INDICATOR_CENTER_X,
       BANK_INDICATOR_CENTER_Y,
       BANK_INDICATOR_RADIUS + 10,
       angle + 3
   );

   return (
    <path
        d={`M ${tipPoint.x} ${tipPoint.y} L ${leftBase.x} ${leftBase.y} L ${rightBase.x} ${rightBase.y} Z`}
        fill="currentColor"
    />
   );
}

export default function BankIndicator({ bank }: { bank: number }) {
  return (<div id="bank-indicator" className="absolute left-1/2 bottom-[4%] print:bottom-[6%] -translate-x-1/2 text-green-500 print:text-black">
    <svg width="400" height="150" viewBox="0 0 400 200" className="scale-100">
        {/* Tick marks */}
        {generateTicks(bank)}

        {/* Bank pointer */}
        {bankPointer(bank)}
    </svg>
  </div>);
}
