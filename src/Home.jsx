import React, { useState } from "react";

const Home = () => {
  const [winner, setWinner] = useState(null);
  const [turnX, setTurnX] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  console.log(winner)

  const checkWinner = (newBoard) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
          console.log(newBoard[a])
            setWinner(newBoard[a]);
            return;
          }
      }

  };

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    console.log(newBoard)
    newBoard[index] = turnX ? "X" : "O";
    setBoard(newBoard);
    setTurnX(!turnX);
    checkWinner(newBoard);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurnX(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-600 text-white p-4">
      {/* Winner Modal */}
      {winner && (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-70 z-10">
          <p className="text-4xl font-bold text-yellow-300">Winner: {winner}</p>
          <button
            onClick={resetGame}
            className="mt-4 px-6 py-3 bg-gray-900 text-white rounded-lg text-lg"
          >
            New Game
          </button>
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">Tic Tac Toe</h1>

      {/* Tic Tac Toe Grid */}
      <div className="grid grid-cols-3 gap-5 sm:gap-2 w-full max-w-xs sm:max-w-80">
        {board.map((value, index) => (
          <button
            key={index}
            className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center
              ${value === "X" ? "bg-blue-500" : value === "O" ? "bg-yellow-500" : "bg-gray-200"}
              text-red-600 text-4xl font-bold rounded-lg shadow-md transition-all duration-300`}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-lg text-lg cursor-pointer transition hover:bg-gray-700"
      >
        Reset Game
      </button>
    </div>
  );
};

export default Home;
