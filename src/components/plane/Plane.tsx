import React from 'react';


// This component will the top down view of the plane, i.e the planform view
export default function Plane() {
    return (
        <div className="plane-container">
            <svg
                viewBox="0 0 1000 600"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Main wing body - using path for the complex shape */}
                <path
                    d="M 500 150 
                       L 150 450
                       L 200 500
                       L 450 450
                       L 500 500
                       L 550 450
                       L 800 500
                       L 850 450 Z"
                    fill="#404040"
                    stroke="#202020"
                    strokeWidth="2"
                />
                
                {/* Central body details */}
                <path
                    d="M 460 200
                       L 460 450
                       L 540 450
                       L 540 200
                       Z"
                    fill="#303030"
                    stroke="#202020"
                    strokeWidth="1"
                />
                
                {/* Engine intake */}
                <rect
                    x="475"
                    y="300"
                    width="50"
                    height="100"
                    fill="#202020"
                />
            </svg>
        </div>
    );
}
