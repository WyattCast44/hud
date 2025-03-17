import React from 'react';

export default function AirspeedIndicator({ airspeed }: { airspeed: number }) {
    return (
        <div style={{ 
            top: '55%',
            left: '20%',
            transform: 'translate(-50%, -50%)'
         }} className="absolute border border-green-500 text-green-500 print:text-black print:border-black font-mono text-xl text-center w-20">
            <p className="text-xl">{airspeed}</p>
        </div>
    )
}
