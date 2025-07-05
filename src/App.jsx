import { useEffect, useRef, useState } from "react";
import "./App.scss";
import { move } from "./service";
import { DIRECTIONS } from "./constants";
import { SHAPES } from "./shapes";


const width = 10;
const height = 20;

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [downCount,setDownCount] = useState(0)
  const currentShapeRef = useRef(1)
  const [shape, setShape] = useState(SHAPES[0]);

  const [board, setBoard] = useState(() =>
    Array(height)
      .fill(null)
      .map(() => Array(width).fill(false))
  );

  useEffect(() => {
    const eventHandler = ({ key }) => {
        if (key === "ArrowLeft") {
          try {
            const {newBoard,newShape} = move(board,shape,DIRECTIONS.LEFT)
            setBoard(newBoard)
            setShape(newShape)
          }
          catch(e) {
            console.error(e)
          }
      }

      if (key === "ArrowRight") {
        try {
          const {newBoard,newShape} = move(board,shape,DIRECTIONS.RIGHT)
          setBoard(newBoard)
          setShape(newShape)
        }
        catch(e) {
          console.error(e)
        }
      }

      if(key === "ArrowDown") {
        try {
          const {newBoard,newShape} = move(board,shape,DIRECTIONS.DOWN)
          setBoard(newBoard)
          setShape(newShape)
        }
        catch(e) {
          console.error(e)
        }
      }
    
    };

    document.addEventListener("keydown", eventHandler);
    return () => {
      document.removeEventListener("keydown", eventHandler);
    };
  }, [board,shape]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const { newBoard, newShape } = move(board, shape, DIRECTIONS.DOWN);
        setBoard(newBoard);
        setShape(newShape);
    
      } catch (e) {
        const isFinished = shape.figure.some(({i}) => i < 0)
        if(!isFinished) {
          setShape(SHAPES[currentShapeRef.current])
          currentShapeRef.current = (currentShapeRef.current + 1) % SHAPES.length
        }
        else {
          setIsGameOver(true)
          alert("Game Over")
        }
        console.error(e);
      }
    },500)

    return () => clearTimeout(timer)
  },[downCount]);


  function reverseShape() {
   
  }

  return (
    <div style={{display:"flex"}}>
    <div className="container">
      {board.map((row) => (
        <div className="row">
          {row.map((cell) => (
            <div className={`cell`} style={{backgroundColor:cell ? cell : ""}}></div>
          ))}
        </div>
      ))}
    </div>
    <div className="">
      <button onClick={reverseShape}>Reverse</button>
    </div>
    </div>
  );
}

export default App;
