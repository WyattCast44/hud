import { createContext, useContext, useReducer, ReactNode } from 'react';
import { UAVState } from '../types/uav';

type UAVAction = 
  | { type: 'UPDATE_STATE'; payload: Partial<UAVState> }
  | { type: 'TOGGLE_GEAR' }
  | { type: 'TOGGLE_POWER_MODE' }
  | { type: 'UPDATE_BANK'; payload: number }
  | { type: 'UPDATE_PITCH'; payload: number }
  | { type: 'UPDATE_HEADING'; payload: number };

const initialState: UAVState = {
  airspeed: 150,
  altitude: 16000,
  pitch: 0,
  bank: 0,
  heading: 360,
  gearPosition: 'up',
  pla: 125,
  powerMode: 'speed',
};

function uavReducer(state: UAVState, action: UAVAction): UAVState {
  switch (action.type) {
    case 'UPDATE_STATE':
      return { ...state, ...action.payload };
    case 'TOGGLE_GEAR':
      return { ...state, gearPosition: state.gearPosition === 'up' ? 'down' : 'up' };
    case 'TOGGLE_POWER_MODE':
      return { ...state, powerMode: state.powerMode === 'speed' ? 'pla' : 'speed' };
    case 'UPDATE_BANK':
      return { ...state, bank: Math.max(-45, Math.min(45, action.payload)) };
    case 'UPDATE_PITCH':
      return { ...state, pitch: Math.round(action.payload * 10) / 10 };
    case 'UPDATE_HEADING':
      let heading = action.payload;
      if (heading > 360) heading = 1;
      if (heading < 1) heading = 360;
      return { ...state, heading };
    default:
      return state;
  }
}

const UAVContext = createContext<{
  state: UAVState;
  dispatch: React.Dispatch<UAVAction>;
} | undefined>(undefined);

export function UAVProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(uavReducer, initialState);

  return (
    <UAVContext.Provider value={{ state, dispatch }}>
      {children}
    </UAVContext.Provider>
  );
}

export function useUAV() {
  const context = useContext(UAVContext);
  if (context === undefined) {
    throw new Error('useUAV must be used within a UAVProvider');
  }
  return context;
} 