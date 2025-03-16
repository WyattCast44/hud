function ControlInput({ name, label, unit, value, onChange, min, max, step = 1, validate }) {
  const handleChange = (e) => {
    let newValue = e.target.value;
    if (validate) {
      newValue = validate(newValue);
    }
    onChange(newValue);
  };

  return (
    <div className="flex items-center justify-center aspect-square flex-col text-white space-y-2">
      <label htmlFor={name}>{label}</label>
      <input
        type="number"
        id={name}
        className="border-green-500 text-center border text-xl w-20 text-white font-semibold selection:bg-green-300 selection:text-black bg-black"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
      />
      <p>{unit}</p>
    </div>
  );
}

export default ControlInput; 