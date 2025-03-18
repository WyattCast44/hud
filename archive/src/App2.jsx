import { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function FlightPathMarker({ bank, pitch }) {
  const style = {
    transform: `translate(-50%, -50%) rotate(${bank}deg) translate(0, ${-pitch * 20}px)`
  };

  return (
    <div className="absolute left-1/2 top-1/2 text-green-500" style={style}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" className="text-green-500">
        <circle cx="15" cy="15" r="6" stroke="currentColor" strokeWidth="1" fill="none" />
        <line x1="0" y1="15" x2="9" y2="15" stroke="currentColor" strokeWidth="1" />
        <line x1="21" y1="15" x2="30" y2="15" stroke="currentColor" strokeWidth="1" />
        <line x1="15" y1="0" x2="15" y2="9" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}

function HeadingIndicator({ heading }) {
  const normalizeHeading = (hdg) => {
    hdg = ((hdg - 1) % 360) + 1;
    if (hdg < 1) hdg += 360;
    return hdg;
  };

  const generateTicks = () => {
    const ticks = [];
    const normalizedHeading = normalizeHeading(heading);
    
    for (let offset = -30; offset <= 30; offset++) {
      let tickHeading = normalizeHeading(normalizedHeading + offset);
      
      if (offset === 0) continue;

      const x = offset * 4;
      const tickHeight = tickHeading % 10 === 0 ? 10 : 5;

      ticks.push(
        <g key={offset}>
          <line x1={x} y1={0} x2={x} y2={tickHeight} stroke="currentColor" strokeWidth="1" />
          {tickHeading % 10 === 0 && (
            <text x={x} y={-5} textAnchor="middle" fill="currentColor" fontSize="12" className="font-mono">
              {tickHeading}
            </text>
          )}
        </g>
      );
    }
    return ticks;
  };

  return (
    <div className="absolute left-1/2 top-[3%] -translate-x-1/2 text-green-500">
      <svg width="300" height="50" viewBox="-120 -20 240 40">
        <rect x="-120" y="10" width="240" height="0.5" fill="none" stroke="currentColor" strokeWidth="0.5" />
        {generateTicks()}
        <text x="0" y="-5" textAnchor="middle" fill="currentColor" fontSize="16" className="font-mono">
          {Math.round(normalizeHeading(heading))}
        </text>
        <path d="M 0,-1 L -5,3 L 5,3 Z" fill="currentColor" className="rotate-180" />
      </svg>
    </div>
  );
}

function BankIndicator({ bank, showLabels = false }) {
  const radius = 150;
  const centerX = 200;
  const centerY = 0;

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  const generateTicks = () => {
    const ticks = [];
    [-45, -30, -20, -10, 0, 10, 20, 30, 45].forEach(angle => {
      const tickLength = angle % 45 === 0 ? 15 : (angle % 10 === 0 ? 10 : 7);
      const start = polarToCartesian(centerX, centerY, radius, angle + 90);
      const end = polarToCartesian(centerX, centerY, radius - tickLength, angle + 90);
      
      ticks.push(
        <g key={angle}>
          <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="currentColor" strokeWidth="1" />
          {showLabels && (angle % 10 === 0) && (
            <text
              x={polarToCartesian(centerX, centerY, radius - 25, angle + 90).x}
              y={polarToCartesian(centerX, centerY, radius - 25, angle + 90).y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="currentColor"
              fontSize="12"
            >
              {Math.abs(angle)}
            </text>
          )}
        </g>
      );
    });
    return ticks;
  };

  const bankPointer = () => {
    const basePoint = polarToCartesian(centerX, centerY, radius + 15, 90 + bank);
    const tipPoint = polarToCartesian(centerX, centerY, radius, 90 + bank);
    const leftBase = { x: basePoint.x - 5, y: basePoint.y };
    const rightBase = { x: basePoint.x + 5, y: basePoint.y };
    
    return `M ${tipPoint.x} ${tipPoint.y} L ${leftBase.x} ${leftBase.y} L ${rightBase.x} ${rightBase.y} Z`;
  };

  return (
    <div className="absolute left-1/2 top-[51%] -translate-x-1/2 text-green-500">
      <svg width="400" height="400" viewBox="0 0 400 400" className="scale-75">
        {generateTicks()}
        <path d={bankPointer()} fill="currentColor" />
      </svg>
    </div>
  );
}

function PitchLadder({ bank, gearPosition }) {
  const standardPitchLines = [-10, -5, 0, 5, 10];
  const gearDownPitchLines = [-10, -5, -2.5, 0, 2.5, 5, 10];
  const pitchLines = gearPosition === 'down' ? gearDownPitchLines : standardPitchLines;

  const getLineWidth = (degree) => {
    if (degree === 0) return '400px';
    if (Math.abs(degree) === 2.5) return '150px';
    return '200px';
  };

  const generateEndTicks = (degree) => {
    const isPositive = degree > 0;
    return (
      <>
        <div className="absolute h-[10px] w-[1px] bg-green-500"
          style={{
            left: 0,
            top: isPositive ? 'auto' : 0,
            bottom: isPositive ? 0 : 'auto',
            transform: 'translateX(-1px)'
          }}
        />
        <div className="absolute h-[10px] w-[1px] bg-green-500"
          style={{
            right: 0,
            top: isPositive ? 'auto' : 0,
            bottom: isPositive ? 0 : 'auto',
            transform: 'translateX(1px)'
          }}
        />
      </>
    );
  };

  const formatPitchLabel = (degree) => {
    const absValue = Math.abs(degree).toString().padStart(2, ' ');
    return degree < 0 ? `-${absValue}` : ` ${absValue}`;
  };

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
      style={{ transform: `rotate(${bank}deg)` }}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[1px] w-[400px] bg-green-500"></div>
      </div>
      {pitchLines.map(degree => (
        <div key={degree} className="absolute left-1/2 top-1/2 -translate-x-1/2"
          style={{ transform: `translateY(${-degree * 20}px)` }}>
          {degree !== 0 && (
            <div className="relative flex items-center justify-center">
              <div className="h-[1px] bg-green-500 relative" style={{ width: getLineWidth(degree) }}>
                {generateEndTicks(degree)}
              </div>
              <div className="absolute left-0 transform -translate-x-[35px] text-green-500 font-mono text-sm whitespace-pre">
                {formatPitchLabel(degree)}
              </div>
              <div className="absolute right-0 transform translate-x-[35px] text-green-500 font-mono text-sm whitespace-pre">
                {formatPitchLabel(degree)}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ControlPanel({ uavState, onStateChange }) {
  const handleInputChange = (name, value) => {
    if (name === "heading") {
      let newHeading = parseFloat(value) || 0;
      if (newHeading > 360) {
        newHeading = 1;
      } else if (newHeading < 1) {
        newHeading = 360;
      }
      onStateChange({ ...uavState, [name]: newHeading });
    } else {
      onStateChange({ ...uavState, [name]: parseFloat(value) || 0 });
    }
  };

  const toggleGear = () => {
    onStateChange({
      ...uavState,
      gearPosition: uavState.gearPosition === "up" ? "down" : "up",
    });
  };

  return (
    <div className="flex w-full border border-gray-400 flex-col -outline-offset-1 bg-black h-full pv overflow-hidden">
      <div className="h-10 flex items-center justify-between border-b border-gray-400">
        <h1 className="font-mono uppercase tracking-tight font-black pl-4">Control Panel</h1>
        <button className="border-l flex items-center size-10 justify-center border-gray-400 cursor-pointer">
          <ArrowLeftIcon className="size-4 text-gray-400" />
        </button>
      </div>
      <div className="flex-1 bg-black p-6">
        <div className="grid grid-cols-3 w-full h-auto grid-rows-3 divide-x divide-y divide-gray-400 border border-gray-400">
          {/* Control inputs */}
          {/* ... (similar structure for each input) ... */}
          <div className="flex items-center justify-center aspect-square flex-col text-white space-y-2">
            <label>Heading</label>
            <input
              type="number"
              className="border-green-500 text-center border text-xl w-20 text-white font-semibold selection:bg-green-300 selection:text-black bg-black"
              value={uavState.heading}
              min="1"
              max="360"
              onChange={(e) => handleInputChange("heading", e.target.value)}
            />
            <p>DEG</p>
          </div>
          {/* ... other inputs ... */}
        </div>
      </div>
    </div>
  );
}

function HUDDisplay({ uavState }) {
  return (
    <div className="h-full w-full flex items-center justify-center bg-black border border-gray-400 p-2">
      <div className="relative w-full h-0 pb-[75%] max-h-full max-w-[133.33vh]">
        <div className="absolute inset-0 border border-green-500">
          <HeadingIndicator heading={uavState.heading} />
          <PitchLadder bank={uavState.bank} gearPosition={uavState.gearPosition} />
          <BankIndicator bank={uavState.bank} showLabels={false} />
          <div className="absolute left-[15%] top-[45%] border border-green-500 px-4 py-2">
            <div className="text-green-500 font-mono text-xl">{uavState.airspeed}</div>
          </div>
          <div className="absolute right-[15%] top-[45%]">
            <div className="border border-green-500 px-4 py-2">
              <div className="text-green-500 font-mono text-xl">{uavState.altitude}</div>
            </div>
          </div>
          <FlightPathMarker bank={uavState.bank} pitch={uavState.pitch} />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [uavState, setUavState] = useState({
    airspeed: 150,
    altitude: 16000,
    pitch: 0,
    bank: 0,
    heading: 360,
    gearPosition: "up",
    pla: 125,
  });

  const handleKeyDown = (e) => {
    if (document.activeElement.tagName === 'INPUT') return;

    switch (e.key) {
      case "ArrowUp":
        setUavState((prev) => ({
          ...prev,
          pitch: Math.round((prev.pitch + 0.1) * 10) / 10,
        }));
        break;
      case "ArrowDown":
        setUavState((prev) => ({
          ...prev,
          pitch: Math.round((prev.pitch - 0.1) * 10) / 10,
        }));
        break;
      case "ArrowLeft":
        setUavState((prev) => ({
          ...prev,
          bank: Math.max(prev.bank - 1, -45),
        }));
        break;
      case "ArrowRight":
        setUavState((prev) => ({
          ...prev,
          bank: Math.min(prev.bank + 1, 45),
        }));
        break;
      case "g":
      case "G":
        setUavState((prev) => ({
          ...prev,
          gearPosition: prev.gearPosition === "up" ? "down" : "up",
        }));
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex h-full space-x-1">
        <div className="w-1/3 m-1">
          <ControlPanel uavState={uavState} onStateChange={setUavState} />
        </div>
        <div className="w-2/3 m-1 flex items-center justify-center">
          <HUDDisplay uavState={uavState} />
        </div>
      </div>
    </div>
  );
}

export default App;