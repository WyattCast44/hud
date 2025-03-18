function DataDisplay({ label, value, position = 'left' }) {
  const positionClass = position === 'left' ? 'left-[15%]' : 'right-[15%]';
  
  return (
    <div className={`absolute ${positionClass} top-[45%] border border-green-500 px-4 py-2`}>
      <div className="text-green-500 font-mono text-xl">
        {value}
      </div>
    </div>
  );
}

export default DataDisplay; 