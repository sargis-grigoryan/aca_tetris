import { useEffect, useState } from "react";
import "./App.scss";
import { move } from "./service";
import { DIRECTIONS } from "./constants";
import { shapes, generateRandomShape } from "./shapes";
import ShapePreview from "./Preview";

const width = 10;
const height = 25;


function App() {
  const initialShape = shapes[generateRandomShape(shapes)];
  const initialNextShape = generateRandomShape(shapes);
  
  const [isGameOver, setIsGameOver] = useState(false);
  const [shape, setShape] = useState(initialShape);
  const [nextShape, setNextShape] = useState(initialNextShape);
  const [goDownSteps, setGoDownSteps] = useState(0);

  const [board, setBoard] = useState(() =>
    Array(height)
      .fill(null)
      .map(() => Array(width).fill(false))
  );

  // useEffect(() => {
  //   const eventHandler = ({ key }) => {
  //     if (key === "ArrowLeft") {
  //       if (selectedColumn > 0) {
  //         setSelectedColumn(selectedColumn - 1);
  //       }
  //     }

  //     if (key === "ArrowRight") {
  //       if (selectedColumn < width - 1) {
  //         setSelectedColumn(selectedColumn + 1);
  //       }
  //     }
  //   };

  //   document.addEventListener("keydown", eventHandler);

  //   return () => {
  //     document.removeEventListener("keydown", eventHandler);
  //   };
  // }, []);

  const moveDown = () => {
    try {
      const { newBoard, newShape } = move(board, shape, DIRECTIONS.DOWN);
      setBoard(newBoard);
      setShape(newShape);
    } catch (e) {
      const unfinishedShape = shape.some(({ i }) => i < 0);
      if (unfinishedShape) {
        setIsGameOver(true);
      } else {
        setNextShape(generateRandomShape(shapes));
        const { newBoard, newShape } = move(
          board,
          shapes[nextShape],
          DIRECTIONS.DOWN
        );
        setBoard(newBoard);
        setShape(newShape);
      }
      console.error(e);
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
  }, [goDownSteps, isGameOver]);

  return (
    <>
    <ShapePreview shape={nextShape} />
    <div className="container">
      {board.map((row) => (
        <div className="row">
          {row.map((cell) => (
            <div className={`cell ${cell === true ? "marked" : ""}`}></div>
          ))}
        </div>
      ))}
    </div>
    </>
  );
}

export default App;
