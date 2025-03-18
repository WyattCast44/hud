import { useEffect } from 'react';
import { UAVState } from '../types/uav';

type Dispatch = (action: any) => void;

export function useKeyboardControls(dispatch: Dispatch) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement instanceof HTMLInputElement) return;

      const keyActions: Record<string, () => void> = {
        ArrowUp: () => dispatch({ type: 'UPDATE_PITCH', payload: 0.1 }),
        ArrowDown: () => dispatch({ type: 'UPDATE_PITCH', payload: -0.1 }),
        ArrowLeft: () => dispatch({ type: 'UPDATE_BANK', payload: -1 }),
        ArrowRight: () => dispatch({ type: 'UPDATE_BANK', payload: 1 }),
        g: () => dispatch({ type: 'TOGGLE_GEAR' }),
        G: () => dispatch({ type: 'TOGGLE_GEAR' }),
      };

      const action = keyActions[e.key];
      if (action) {
        e.preventDefault();
        action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);
} 