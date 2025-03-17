import React from 'react';

export default function AltitudeIndicator({ altitude }: { altitude: number }) {
    return (
        <div style={{ 
            top: '55%',
            right: '13%',
            transform: 'translate(-50%, -50%)'
         }} className="absolute border border-green-500 text-green-500 font-mono text-xl text-center w-20 print:text-black print:border-black">
            <p className="text-xl">{altitude}</p>
        </div>
    )
}
