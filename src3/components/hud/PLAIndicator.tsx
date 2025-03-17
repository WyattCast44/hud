import React from 'react';

export default function PLAIndicator({ pla, powerMode }: { pla: number, powerMode: string }) {
    return (
        <div style={{ 
            top: '35%',
            left: '16%',
            transform: 'translate(-50%, -50%)'
         }} className="absolute border border-green-500 text-green-500 print:text-black print:border-black font-mono text-xl text-center w-20">
            <p className="text-xl">{pla}</p>
            <p className="text-sm">{powerMode}</p>
        </div>
    )
}
