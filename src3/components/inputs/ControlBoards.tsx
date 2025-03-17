import React from "react";
import { BoardsPosition } from "../../App";

export default function ControlBoards({
    position, 
    onToggle,
    className = ''
}: {
    position: BoardsPosition,
    onToggle: (position: BoardsPosition) => void,
    className?: string
}) {

  function toggleBoards() {
    if(position === BoardsPosition.IN) {
      onToggle(BoardsPosition.HALF);
    } else if(position === BoardsPosition.HALF) {
      onToggle(BoardsPosition.FULL);
    } else {
      onToggle(BoardsPosition.IN);
    }
  }

  return (
    <div
      className={`flex flex-col items-center justify-center aspect-square text-white space-y-2 font-mono last:border-b last:border-gray-400 lg:last:border-r ${className}`}
    >
      <label htmlFor="boards" className="uppercase">
        Boards
      </label>

      <button onClick={toggleBoards} type="button" className="border-green-500 border text-xl text-center w-25 text-white font-semibold hover:bg-green-900 focus:bg-green-900 transition-colors bg-black focus:outline-none focus:ring focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800">
        {position.toUpperCase()}
      </button>

      <p className="text-sm text-gray-400 uppercase">
        Status
      </p>
    </div>
  );
}
