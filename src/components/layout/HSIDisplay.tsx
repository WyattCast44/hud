import React from 'react';
import { UAVState, DisplayPreferences } from '../../App';
import Planform from '../plane/Planform';
import CompassRose from '../hsi/CompassRose';
import RearView from '../plane/RearView';
// setup the props
type HSIDisplayProps = {
    uavState: UAVState;
    displayPreferences: DisplayPreferences;
}

export default function HSIDisplay({ uavState, displayPreferences }: HSIDisplayProps) {
    return (
        <div className="h-full print:hidden flex items-center justify-center relative flex-1 w-full">
            {/* Container for both plane and compass rose */}
            <div className="relative h-full bg-black border-gray-400 border w-full aspect-square">

                {/* Compass Rose Layer */}
                <div 
                    className="absolute inset-0 text-green-500 print:text-black"
                    style={{
                        transform: displayPreferences.northUp ? 'rotate(0deg)' : `rotate(-${uavState.heading}deg)`,
                        willChange: 'transform',
                    }}
                >
                    <CompassRose 
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
                    <div className='text-gray-700' style={{ width: '100px' }}>
                        <Planform />
                    </div>
                </div>
            </div>
        </div>
    );
}
