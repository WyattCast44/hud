import { useState, useEffect } from 'react'
import './App.css'
import AirspeedDisplayManager from './components/AirspeedDisplayManager'

function App() {
  const [uavState, setUavState] = useState({
    airspeed: 150,
    altitude: 16000,
    pitch: -5,
    bank: 0,
    heading: 911,
    gearPosition: 'up',
    pla: 125 // Power Lever Angle
  });

  const handleKeyDown = (e) => {
    switch(e.key) {
      case 'ArrowUp':
        setUavState(prev => ({ ...prev, pitch: Math.min(prev.pitch + 1, 30) }));
        break;
      case 'ArrowDown':
        setUavState(prev => ({ ...prev, pitch: Math.max(prev.pitch - 1, -30) }));
        break;
      case 'ArrowLeft':
        setUavState(prev => ({ ...prev, bank: Math.max(prev.bank - 1, -45) }));
        break;
      case 'ArrowRight':
        setUavState(prev => ({ ...prev, bank: Math.min(prev.bank + 1, 45) }));
        break;
      case 'G':
        setUavState(prev => ({ 
          ...prev, 
          gearPosition: prev.gearPosition === 'up' ? 'down' : 'up' 
        }));
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUavState(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="hud-container">
        <div className="hud">
          {/* Heading display */}
          <div className="heading-display">{uavState.heading}</div>

          {/* Scale markers */}
          <div className="scale-marker scale-10">10</div>
          <div className="scale-marker scale-5">5</div>

          {/* PLA indicator */}
          <div className="pla-indicator">
            <div className="pla-circle">
              <div className="pla-label">PLA</div>
              <div className="pla-value">{uavState.pla}</div>
            </div>
          </div>

          {/* Center attitude indicator */}
          <div className="attitude-indicator">
            <div className="pitch-ladder" style={{ 
              transform: `rotate(${uavState.bank}deg) translateY(${uavState.pitch * 4}px)`
            }}>
              {[-10, -5, 0, 5, 10].map(degree => (
                <div key={degree} className="pitch-line" style={{ 
                  transform: `translateY(${-degree * 4}px)`,
                  width: degree === 0 ? '300px' : '200px'
                }}>
                  <div className="pitch-label">{degree}</div>
                  <div className="line"></div>
                </div>
              ))}
            </div>
            <div className="flight-path-marker">+</div>
          </div>

          {/* Airspeed display */}
          <div className="airspeed-display">
            <AirspeedDisplayManager 
              airspeed={uavState.airspeed} 
              gearPosition={uavState.gearPosition}
            />
          </div>

          {/* Altitude display */}
          <div className="altitude-display">
            <div className="value">{Math.round(uavState.altitude)}</div>
          </div>
        </div>
      </div>

      <div className="controls">
        <div className="input-group">
          <label>Airspeed (kts):</label>
          <input
            type="number"
            name="airspeed"
            value={uavState.airspeed}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label>Altitude (ft):</label>
          <input
            type="number"
            name="altitude"
            value={uavState.altitude}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label>PLA:</label>
          <input
            type="number"
            name="pla"
            value={uavState.pla}
            onChange={handleInputChange}
          />
        </div>
        <div className="status">
          <p>Pitch: {uavState.pitch.toFixed(1)}°</p>
          <p>Bank: {uavState.bank.toFixed(1)}°</p>
          <p>Gear: {uavState.gearPosition.toUpperCase()}</p>
        </div>
      </div>
    </div>
  )
}

export default App
