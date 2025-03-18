import React from 'react';

export default function SideView() {
    return (
        <svg
            viewBox="0 0 600 200"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Main fuselage - more pointed nose and sleeker profile */}
            <path
                d="M 50 100
                   L 100 85  
                   C 200 75, 300 80, 400 85
                   L 500 100
                   L 400 115
                   C 300 120, 200 125, 100 115
                   Z"
                fill="#404040"
                stroke="#202020"
                strokeWidth="1"
            />

            {/* Wing profile - more angular and swept */}
            <path
                d="M 200 100
                   L 350 100
                   L 320 85
                   L 220 85
                   Z"
                fill="#303030"
                stroke="#202020"
                strokeWidth="1"
            />

            {/* Landing gear struts */}
            <line
                x1="150" y1="115"
                x2="150" y2="140"
                stroke="#202020"
                strokeWidth="2"
            />
            <line
                x1="350" y1="115"
                x2="350" y2="140"
                stroke="#202020"
                strokeWidth="2"
            />

            {/* Landing gear wheels */}
            <circle
                cx="150" cy="145"
                r="5"
                fill="#202020"
            />
            <circle
                cx="350" cy="145"
                r="5"
                fill="#202020"
            />

            {/* Canopy/cockpit area */}
            <path
                d="M 150 85
                   C 180 75, 220 75, 250 85"
                fill="none"
                stroke="#202020"
                strokeWidth="1"
            />
        </svg>
    );
}
