import React from 'react';
import { UAVState } from '../../App';
import SideView from '../plane/SideView';

// setup the props
type VSIDisplayProps = {
    uavState: UAVState;
}

export default function VSIDisplay({ uavState }: VSIDisplayProps) {
    // Convert gamma (flight path angle) to rotation transform
    const rotation = -uavState.gamma || 0;
    
    return (
        <div className="border-gray-400 border w-full print:hidden bg-neutral-900">
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
