import { useEffect, useState } from "react";
import "./App.scss";
import { move } from "./service";
import { DIRECTIONS } from "./constants";
import { getRandomShape } from "./gameHelpers";
import { validateSpawn } from "./validations";
import { getMergedBoard, clearFullLines } from "./boardActions";

const width = 10;
const height = 20;

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [shape, setShape] = useState(() => getRandomShape());
  const [nextShape, setNextShape] = useState(() => getRandomShape());
  const [goDownSteps, setGoDownSteps] = useState(0);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [linesClearedTotal, setLinesClearedTotal] = useState(0);


  const [board, setBoard] = useState(() =>
    Array(height).fill(null).map(() => Array(width).fill(false))
  );

const moveDown = () => {
  try {
    const { newBoard, newShape } = move(board, shape, DIRECTIONS.DOWN);
    setBoard(newBoard);
    setShape(newShape);
  } catch {
  const { board: clearedBoard, linesCleared } = clearFullLines(board);

  if (linesCleared > 0) {
    setLinesClearedTotal((prev) => {
      const newTotal = prev + linesCleared;
      if (Math.floor(newTotal / 10) > level) {
        setLevel(Math.floor(newTotal / 10));
      }
      return newTotal;
    });

    const pointsPerLine = [0, 40, 100, 300, 1200];
    const gained = pointsPerLine[linesCleared] * (level + 1);
    setScore((prev) => prev + gained);
  }

  try {
    validateSpawn(clearedBoard, nextShape);

    const { newBoard: boardWithNewShape, newShape: updatedShape } = move(
      clearedBoard,
      nextShape,
      DIRECTIONS.DOWN
    );

    setBoard(boardWithNewShape);
    setShape(updatedShape);
    setNextShape(getRandomShape());
  } catch {
    setIsGameOver(true);
  }
}
};

  useEffect(() => {
    if (isGameOver || showStartScreen) {
      return;
    }

    moveDown();

    setTimeout(() => {
      setGoDownSteps(goDownSteps + 1);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goDownSteps, isGameOver, showStartScreen]);

  const mergedBoard = getMergedBoard(board, shape, height, width);

const resetGame = (showStart = true) => {
  const firstShape = getRandomShape();
  const upcomingShape = getRandomShape();

  setIsGameOver(false);
  setShowStartScreen(showStart);
  setBoard(
    Array(height)
      .fill(null)
      .map(() => Array(width).fill(false))
  );
  setShape(firstShape);
  setNextShape(upcomingShape);
  setGoDownSteps(0);
  setScore(0);
  setLevel(0);
  setLinesClearedTotal(0);
};

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isGameOver) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        try {
          const { newBoard, newShape } = move(board, shape, DIRECTIONS.LEFT);
          setBoard(newBoard);
          setShape(newShape);
        } catch {}
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        try {
          const { newBoard, newShape } = move(board, shape, DIRECTIONS.RIGHT);
          setBoard(newBoard);
          setShape(newShape);
        } catch {}
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        moveDown();
      } else if (e.key === " ") {
        e.preventDefault();

        let currentBoard = board;
        let currentShape = shape;
        let dropDistance = 0;

        while (true) {
          try {
            const { newBoard, newShape } = move(currentBoard, currentShape, DIRECTIONS.DOWN);
            currentBoard = newBoard;
            currentShape = newShape;
            dropDistance++;
          } catch {
            break;
          }
        }

        const { board: clearedBoard, linesCleared } = clearFullLines(currentBoard);

        if (linesCleared > 0) {
          setLinesClearedTotal((prev) => {
            const newTotal = prev + linesCleared;
            if (Math.floor(newTotal / 10) > level) {
              setLevel(Math.floor(newTotal / 10));
            }
            return newTotal;
          });

          const pointsPerLine = [0, 40, 100, 300, 1200];
          const gained = pointsPerLine[linesCleared] * (level + 1);
          setScore((prev) => prev + gained);
        }

        try {
          validateSpawn(clearedBoard, nextShape);

          const { newBoard: boardWithNewShape, newShape: updatedShape } = move(
            clearedBoard,
            nextShape,
            DIRECTIONS.DOWN
          );

          setBoard(boardWithNewShape);
          setShape(updatedShape);
          setNextShape(getRandomShape());

          setScore((prev) => prev + dropDistance * 1);
        } catch {
          setIsGameOver(true);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board, shape, nextShape, level, isGameOver]);



return (
  <div className="container">
    {isGameOver && (
      <div className="game-over">
        Game Over
        <button onClick={() => resetGame(false)} className="restart-btn">
          Restart
        </button>
        <button onClick={() => resetGame(true)} className="main-menu-btn">
          Main Menu
        </button>
      </div>
    )}

    {showStartScreen && (
      <div className="start-screen">
        <h1>Welcome to Tetris</h1>
        <button onClick={() => setShowStartScreen(false)}>Start Game</button>
      </div>
    )}

    {!showStartScreen && (
      <div className="game-wrapper">
        <div className="game-board">
          {mergedBoard.map((row, i) => (
            <div className="row" key={i}>
              {row.map((cell, j) => (
                <div className={`cell ${cell ? cell : ""}`} key={j}></div>
              ))}
            </div>
          ))}
        </div>

        <div className="stats">
          <h2>Stats</h2>
          <p>Score: {score}</p>
          <p>Level: {level}</p>
          <p>Lines: {linesClearedTotal}</p>

          <div className="next-shape">
            <h3>Next</h3>
            <div className="mini-board">
              {(() => {
                const minI = Math.min(...nextShape.map(b => b.i));
                const minJ = Math.min(...nextShape.map(b => b.j));
                const normalized = nextShape.map(({ i, j, color }) => ({
                  i: i - minI,
                  j: j - minJ,
                  color,
                }));

                return Array(4).fill(null).map((_, i) => (
                  <div className="row" key={i}>
                    {Array(4).fill(null).map((_, j) => {
                      const block = normalized.find(b => b.i === i && b.j === j);
                      return (
                        <div key={j} className={`cell ${block ? block.color : ""}`} />
                      );
                    })}
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
}

export default App;
