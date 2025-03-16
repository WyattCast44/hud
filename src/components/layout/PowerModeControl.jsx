function PowerModeControl({ mode, onToggle }) {
  return (
    <div className="flex items-center justify-center aspect-square flex-col text-white space-y-2">
      <label>Power Mode</label>
      <button
        onClick={onToggle}
        className="border-green-500 border text-xl px-4 py-2 text-white font-semibold hover:bg-green-900 transition-colors bg-black"
      >
        {mode.toUpperCase()}
      </button>
      <p>Mode</p>
    </div>
  );
}

export default PowerModeControl; 