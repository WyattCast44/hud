import React from 'react';
import { UAVState, DisplayPreferences } from '../../App';
import Plane from '../plane/Plane';
import CompassRose from '../hsi/CompassRose';

// setup the props
type HSIDisplayProps = {
    uavState: UAVState;
    displayPreferences: DisplayPreferences;
}

export default function HSIDisplay({ uavState, displayPreferences }: HSIDisplayProps) {
    return (
        <div className="flex-1 border-gray-400 border w-full print:hidden flex items-center justify-center relative">
            {/* Container for both plane and compass rose */}
            <div className="relative w-[500px] h-[500px]">
                {/* Compass Rose Layer */}
                <div 
                    className="absolute inset-0"
                    style={{
                        transform: displayPreferences.northUp ? 'rotate(0deg)' : `rotate(-${uavState.heading}deg)`,
                        willChange: 'transform',
                    }}
                >
                    <CompassRose 
                        northUp={displayPreferences.northUp} 
                        heading={uavState.heading}
                    />
                </div>

                {/* Aircraft Layer */}
                <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                        transform: displayPreferences.northUp ? `rotate(${uavState.heading}deg)` : 'rotate(0deg)',
                        willChange: 'transform',
                    }}
                >
                    <div style={{ width: '100px' }}>
                        <Plane />
                    </div>
                </div>
            </div>
        </div>
    );
}
