import React from "react";

export default function CommandedPitchIndicator({
  pitch,
  bank,
  width,
}: {
  pitch: number;
  bank: number;
  width: number;
}) {
  let label = pitch.toFixed(1);

  if (pitch >= 0) {
    label = "+" + label;
  } else {
    // add the html entity for the minus sign
    label = "−" + Math.abs(pitch).toFixed(1);
  }

  return (
    <div
      id="commanded-pitch-indicator"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: `${width * 1.2}px`,
      }}
    >
      {/* Left side indicator */}
      <div
        className="absolute right-0 flex items-center h-5 -translate-y-1/2"
        style={{ transform: `translateY(${-pitch * 20}px)`, willChange: "transform" }}
      >
        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-green-500 print:border-r-black" />
        <span className="text-green-500 print:text-black ml-2 text-sm font-mono">{label}</span>
      </div>

      {/* Right side indicator */}
      <div
        className="absolute left-0 flex items-center h-5 -translate-y-1/2"
        style={{ transform: `translateY(${-pitch * 20}px)`, willChange: "transform" }}
      >
        <span className="text-green-500 print:text-black mr-2 text-sm font-mono">{label}</span>
        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-green-500 print:border-l-black" />
      </div>
    </div>
  );
}
