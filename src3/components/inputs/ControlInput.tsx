import React, { useEffect } from "react";

type ControlInputProps = {
  name: string;
  label: string;
  unit: string;
  value: number;
  defaultValue: number;
  onChange: (value: number | string) => void;
  min?: number;
  max?: number;
  step?: number;
  validate: CallableFunction;
  type: "number" | "select" | "toggle";
  options?: string[];
  className?: string;
};

export type { ControlInputProps };

export default function ControlInput({
  name,
  label,
  unit,
  value,
  defaultValue,
  onChange,
  min,
  max,
  step = 1,
  validate,
  type,
  options,
  className,
}: ControlInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (validate) {
      newValue = validate(newValue);
    }

    onChange(newValue);
  };

  const inputType = function (type: string) {
    if (type === "number") {
      return "number";
    }

    if (type === "select") {
      return "select";
    }

    if (type === "toggle") {
      return "button";
    }
  };

  if(value === undefined) {
    value = defaultValue;
  }

  return (
    <div
      className={`flex flex-col items-center justify-center aspect-square text-white space-y-2 font-mono overflow-hidden last:border-b last:border-gray-400 lg:last:border-r ${className}`}
    >
      <label htmlFor={name} className="uppercase">
        {label}
      </label>

      <input
        type={inputType(type)}
        id={name}
        className="border-green-500 text-center border text-xl w-25 text-white font-semibold selection:bg-green-300 selection:text-black bg-black focus:outline-none focus:ring focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
      />
      <p className="text-sm text-gray-400 uppercase">{unit}</p>
    </div>
  );
}
