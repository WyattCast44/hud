import React from 'react';
import { UAVState, DisplayPreferences } from '../../App';
import SideView from '../plane/SideView';

// setup the props
type VSIDisplayProps = {
    uavState: UAVState;
    displayPreferences: DisplayPreferences;
}

export default function VSIDisplay({ uavState, displayPreferences }: VSIDisplayProps) {
    // Convert gamma (flight path angle) to rotation transform
    const rotation = uavState.pitch || 0;
    
    return (
        <div className="flex-1 border-gray-400 border w-full aspect-square print:hidden">
            <div className="relative h-full flex">
                {/* Left side - Aircraft */}
                <div className="w-1/4 flex items-center justify-center">
                    <div 
                        style={{ 
                            transform: `rotate(${rotation}deg)`,
                            transition: 'transform 0.3s ease-out',
                            width: '150px'
                        }}
                    >
                        <SideView />
                    </div>
                </div>

                {/* Right side - Altitude and speed tape */}
                <div className="flex-1 relative">
                    {/* Altitude tape */}
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gray-800 bg-opacity-20">
                        <div className="h-full flex flex-col items-center justify-center text-lg">
                            <div>ALT</div>
                            <div className="font-mono">{Math.round(uavState.altitude)}ft</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
