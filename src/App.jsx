import { useEffect, useState } from "react";
import "./App.scss";
import { move } from "./service";
import { DIRECTIONS } from "./constants";
import { SHAPES } from "./shapes";

const width = 10;
const height = 20;

function getRandomShape() {
  const shapeKeys = Object.keys(SHAPES);
  const randomKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
  return SHAPES[randomKey];
}


function getMergedBoard(board, shape) {
  const merged = board.map((row) => [...row]);
  shape.forEach(({ i, j }) => {
    if (i >= 0 && i < height && j >= 0 && j < width) {
      merged[i][j] = true;
    }
  });
  return merged;
}

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [shape, setShape] = useState(() => getRandomShape());
  const [goDownSteps, setGoDownSteps] = useState(0);

  const [board, setBoard] = useState(() =>
    Array(height)
      .fill(null)
      .map(() => Array(width).fill(false))
  );

  const moveDown = () => {
    try {
      const { newBoard, newShape } = move(board, shape, DIRECTIONS.DOWN);
      setBoard(newBoard);
      setShape(newShape);
    } catch {
      const unfinishedShape = shape.some(({ i }) => i < 0);
      if (unfinishedShape) {
        setIsGameOver(true);
      } else {
        try {
          const newShapeRandom = getRandomShape();

          const { newBoard, newShape } = move(
            board,
            newShapeRandom,
            DIRECTIONS.DOWN
        );
          setBoard(newBoard);
          setShape(newShape);
        } catch {
          setIsGameOver(true);
        }
      }
    }
  };

  useEffect(() => {
    if (isGameOver) {
      return;
    }

    moveDown();

    setTimeout(() => {
      setGoDownSteps(goDownSteps + 1);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goDownSteps, isGameOver]);

  const mergedBoard = getMergedBoard(board, shape);

useEffect(() => {
  const handleKeyDown = (e) => {
    if (isGameOver) return;

    let direction = null;
    if (e.key === "ArrowLeft") direction = DIRECTIONS.LEFT;
    else if (e.key === "ArrowRight") direction = DIRECTIONS.RIGHT;
    else if (e.key === "ArrowDown") direction = DIRECTIONS.DOWN;

    if (direction) {
      try {
        const { newBoard, newShape } = move(board, shape, direction);
        setBoard(newBoard);
        setShape(newShape);
      } catch {
        console.error("Invalid move!!!");
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [board, shape, isGameOver]);


  return (
    <div className="container">
      {isGameOver && <div className="game-over">Game Over</div>}

      {mergedBoard.map((row, i) => (
        <div className="row" key={i}>
          {row.map((cell, j) => (
            <div className={`cell ${cell ? "marked" : ""}`} key={j}></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
