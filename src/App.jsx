import { useState, useEffect, useRef } from "react";
import "./App.scss";

function App() {
  const width = 10;
  const height = 20;
  const [board, setBoard] = useState(() =>
    Array(height).fill(null).map(() => Array(width).fill(null))
  );

  const [currentPos, setCurrentPos] = useState({ row: 0, col: 5 });
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setBoard(prevBoard => {
        const { row, col } = currentPos;

        if (row + 1 >= height || prevBoard[row + 1][col]) {
          const newBoard = [...prevBoard];
          newBoard[row][col] = true;
          setCurrentPos({ row: 0, col: 5 });
          return newBoard;
        }

        setCurrentPos({ row: row + 1, col });
        return prevBoard;
      });
    }, 300);

    return () => clearInterval(intervalRef.current);
  }, [currentPos]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setCurrentPos(prevPos => {
        const { row, col } = prevPos;
        let newCol = col;

        if (e.key === "ArrowLeft" && col > 0 && !board[row][col - 1]) {
          newCol = col - 1;
        }

        if (e.key === "ArrowRight" && col < width - 1 && !board[row][col + 1]) {
          newCol = col + 1;
        }

        return { row, col: newCol };
      });
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [board]);

  return (
    <div className="container">
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, cellIndex) => {
            const isFalling = currentPos.row === rowIndex && currentPos.col === cellIndex;
            return (
              <div
                key={cellIndex}
                className={`cell ${cell ? "marked" : ""} ${isFalling ? "falling" : ""}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default App; 




