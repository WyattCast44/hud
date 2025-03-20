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
    const rotation = -uavState.pitch || 0;
    
    return (
        <div className="border-gray-400 border w-full h-1/2 print:hidden bg-neutral-900">
            <div className="relative flex w-full h-full bg-black">
                {/* Left side - Aircraft */}
                <div className="w-1/4 flex items-center justify-center h-auto">
                    <div 
                        className='text-gray-700'
                        style={{ 
                            transform: `rotate(${rotation}deg)`,
                            transition: 'transform 0.3s ease-out',
                            width: '150px'
                        }}
                    >
                        <SideView />
                    </div>
                </div>

            </div>
        </div>
    );
}
