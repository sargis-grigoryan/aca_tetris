// import { useState, useEffect, useRef } from "react";
// import "./App.scss";

// function App() {
//   const width = 10;
//   const height = 20;
//   const [board, setBoard] = useState(() =>
//     Array(height).fill(null).map(() => Array(width).fill(null))
//   );

//   const [currentPos, setCurrentPos] = useState({ row: 0, col: 5 });
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     intervalRef.current = setInterval(() => {
//       setBoard(prevBoard => {
//         const { row, col } = currentPos;

//         if (row + 1 >= height || prevBoard[row + 1][col]) {
//           const newBoard = [...prevBoard];
//           newBoard[row][col] = true;

//           setCurrentPos({ row: 0, col: 5 });
//           return newBoard;
//         }

//         setCurrentPos({ row: row + 1, col });

//         return prevBoard;
//       });
//     }, 300);

//     return () => clearInterval(intervalRef.current);
//   }, [currentPos]);

//   return (
//     <div className="container">
//       {board.map((row, rowIndex) => (
//         <div className="row" key={rowIndex}>
//           {row.map((cell, cellIndex) => {
//             const isFalling = currentPos.row === rowIndex && currentPos.col === cellIndex;
//             return (
//               <div
//                 key={cellIndex}
//                 className={`cell ${cell ? "marked" : ""} ${isFalling ? "falling" : ""}`}
//               />
//             );
//           })}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;
 
 
 
 
 
 
 
 
 
import { useState } from "react";
import "./App.scss";

function App() {
  console.log("Rerendered!");
  const width = 10;
  const height = 20;
  const [selectedRow, setSelectedRow] = useState(0);
  const [board, setBoard] = useState(() =>
    Array(height)
      .fill(null)
      .map(() => Array(width).fill(null))
  );

  let selectedJ = 5;
  setTimeout(() => {
    const newBoard = board.map((row, rowIndex) => {      
      if ((rowIndex + 1) % height === selectedRow) {
        return row.fill(false);
      }

      if (rowIndex === selectedRow) {
        return row.map((_, cellIndex) => {
          if (cellIndex === selectedJ) {
            return true;
          }
        });
      }

      return row;
    });

    setBoard(newBoard);
    setSelectedRow((selectedRow + 1) % height);
  }, 200);

  return (
    <div className="container">
      {board.map((row) => (
        <div className="row">
          {row.map((cell) => (
            <div className={`cell ${cell === true ? "marked" : ""}`}></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
