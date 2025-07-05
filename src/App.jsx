import { useEffect,useState} from "react";
import "./App.scss";
import { move } from "./service";
import { DIRECTIONS } from "./constants";
import getRandomShape from "./shapes";

const width = 10
const height = 20;

function App() {
  const [isGameOver, setIsGameOver] = useState(false);

  const initialMiniBoard = Array(5)
    .fill(null)
    .map(() => Array(5).fill(false));

  let indY = 0
  const [downCount, setDownCount] = useState(0);
  const [shape,setShape] = useState(getRandomShape())
  const [nextShape,setNextShape] = useState(getRandomShape())
  const [miniBoard, setMiniBoard] = useState(initialMiniBoard);


  useEffect(() => {
    if(isGameOver) return

    let ind = 0;

    const sortedNextShape = [...nextShape.figure].sort((a , b) => a.i - b.i)
    const newMiniBoard = initialMiniBoard.map((row) => [...row])
    sortedNextShape.forEach(({i,j},rowInd) => {
      newMiniBoard[ind][j] = nextShape.color
      if(rowInd !== nextShape.figure.length - 1 && sortedNextShape[rowInd + 1].i > i) {
        ind++
      } 
    });

    setMiniBoard(newMiniBoard)
  },[nextShape,isGameOver])

  const [board, setBoard] = useState(() =>
    Array(height)
      .fill(null)
      .map(() => Array(width).fill(false))
  );

  function moveDown(board,shape) {
    try {
      const { newBoard ,newShape } = move(
        board,
        shape,
        DIRECTIONS.DOWN
      );
      setBoard(newBoard);
      setShape(newShape);
      setDownCount((prev) => prev + 1);
    } catch (e) {
      const isFinished = shape.figure.some(({ i }) => i <= 0);
      if (!isFinished) {
        const commingShape = getRandomShape()
        setShape(nextShape)
        setNextShape(commingShape)
        moveDown(board,nextShape)
      } else {
        setIsGameOver(true);
        alert("Game Over");
      }
      console.error(e);
    }
  }

  useEffect(() => {
    const eventHandler = ({ key }) => {
      if (key === "ArrowLeft") {
        try {
          const { newBoard, newShape } = move(board, shape, DIRECTIONS.LEFT);
          setBoard(newBoard);
          setShape(newShape);
        } catch (e) {
          console.error(e);
        }
      }

      if (key === "ArrowRight") {
        try {
          const { newBoard, newShape } = move(board, shape, DIRECTIONS.RIGHT);
          setBoard(newBoard);
          setShape(newShape);
        } catch (e) {
          console.error(e);
        }
      }
      

      if (key === "ArrowDown") {
        try {
          const { newBoard, newShape } = move(board, shape, DIRECTIONS.DOWN);
          setBoard(newBoard);
          setShape(newShape);
          setDownCount((prev) => prev + 1);
        } catch (e) {
          console.error(e);
        }
      }
    };

    document.addEventListener("keydown", eventHandler);

    return () => {
      document.removeEventListener("keydown", eventHandler);
    };
  }, [board, shape]);

  useEffect(() => {
    if(isGameOver) return 
    const timer = setTimeout(() => {
      moveDown(board,shape)
    }, 500);

    return () => clearTimeout(timer);
  }, [downCount,isGameOver]);

  return (
    <div style={{ display: "flex" }}>
      <div className="container">
        {board.map((row) => (
          <div className="row">
            {row.map((cell) => (
              <div
                className={`cell`}
                style={{ backgroundColor: cell ? cell : "" }}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="settings">
        <h1>Next Shape</h1>
        <div className="miniboard">
          {miniBoard.map((row) => (
            <div className="miniboard_row">
              {row.map((cell) => (
                <div
                  className='miniboard_row_cell'
                  style={{ backgroundColor: cell ? cell : "",border:cell ? '1px solid gray' : "" }}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <button>Reverse</button>
      </div>
    </div>
  );
}

export default App;