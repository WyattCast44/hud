// this component will be responsible for displaying the
// correct symbology for the airspeed of the UAV
// based on whether the uav has the landing gear down or not
// if it is down, show the Gear Down symbology
// if it is up, show the Gear Up symbology
// create and use seperate components for the gear down and gear up symbology
// take in the airspeed as a prop 
// take the gear position as a prop

function AirspeedDisplayManager({airspeed, gearPosition}) {
    if (gearPosition === "down") {
        return <GearDownSymbology airspeed={airspeed} />
    } else {
        return <GearUpSymbology airspeed={airspeed} />
    }
}

function GearDownSymbology({airspeed}) {
    // when the gear is down, the airspeed is displayed inside a circle
    // the circle is made of hash marks in a circular pattern
    // there are 15 hash marks in the circle
    // but make the number of hash marks a variable so that it can be changed
    // in the center of the circle, display the airspeed
    // use svg to create the circle of hash marks
    // the overall size of the circle is 100px, but make the size a variable so that it can be changed
    return (
        <div>
            <svg width="100px" height="100px">
                <circle cx="50" cy="50" r="40" />
                {Array.from({ length: 15 }).map((_, index) => (
                    <line key={index} x1="50" y1="50" x2="50" y2="40" />
                ))}
                <text x="50" y="50" textAnchor="middle" dominantBaseline="middle">{airspeed}</text>
            </svg>
        </div>
    )
}

function GearUpSymbology({airspeed}) {
    // when the gear is up, the airspeed is displayed inside a rectangle
    // rectangle has a border around it
    // and in the center of the rectangle, display the airspeed
    // use svg to create the rectangle
    // the overall size of the rectangle is 100px, but make the size a variable so that it can be changed
    return (
        <div>
            <svg width="100px" height="100px">
                <rect x="0" y="0" width="100" height="100" />
                <text x="50" y="50" textAnchor="middle" dominantBaseline="middle">{airspeed}</text>
            </svg>
        </div>
    )
}

export default AirspeedDisplayManager;
