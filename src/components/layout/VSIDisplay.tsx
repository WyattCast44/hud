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
        <div className="border-gray-400 border h-full aspect-square print:hidden">
            <div className="relative h-full flex w-full ">
                {/* Left side - Aircraft */}
                <div className="w-1/4 flex items-center justify-center">
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
