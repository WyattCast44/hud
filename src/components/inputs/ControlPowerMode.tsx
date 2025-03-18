import React from "react";

export default function ControlPowerMode({
    mode, 
    onToggle,
    shortcut,
    className = ''
}: {
    mode: string,
    onToggle: () => void,
    shortcut?: string,
    className?: string
}) {

  return (
    <div
      className={`flex flex-col items-center justify-center aspect-square text-white space-y-2 font-mono last:border-b last:border-gray-400 lg:last:border-r relative ${className}`}
    >
      <label htmlFor="mode" className="uppercase">
        Throttle
      </label>

      {shortcut && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-xs text-gray-400">
          ({shortcut})
        </div>
      )}

      <button type="button" className="border-green-500 border text-xl text-center w-25 text-white font-semibold hover:bg-green-900 focus:bg-green-900 transition-colors bg-black focus:outline-none focus:ring focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800" onClick={onToggle}>
        {mode.toUpperCase()}
      </button>

      <p className="text-sm text-gray-400 uppercase">
        Mode
      </p>
    </div>
  );
}
