import React from "react";

export default function CommandedGammaIndicator({
    pitch,
}: {
    pitch: number
}) {
    return (
        <div className="absolute left-1/2 -translate-x-1/2 text-green-500 print:text-black top-[3%] z-10">
            <svg width={300} height={50} viewBox="-150 -25 300 50">
                
            </svg>
        </div>
    )
}
