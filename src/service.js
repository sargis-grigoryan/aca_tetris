import { DIRECTIONS } from "./constants";
import {
  validateBoard,
  validateDownMove,
  validateLeftMove,
  validateRightMove,
  validateShape,
} from "./validations";

export const move = (board, shape, direction) => {
  validateBoard(board);
  validateShape(shape);

  if (direction === DIRECTIONS.LEFT) {
    validateLeftMove(board, shape);
    const newBoard = board.map((row) => [...row]);
    const newShape = [];

    // Clear mark from previous ceils
    shape.forEach(({ i, j }) => {
      if (i >= 0) {
        newBoard[i][j] = false;
      }
    });

    // Mark new ceils
    shape.forEach(({ i, j }) => {
      if (i >= 0 && j >= 1) {
        newBoard[i][j - 1] = true;
      }
      newShape.push({ i, j: j - 1 });
    });

    return { newBoard, newShape };
  }
  

  if (direction === DIRECTIONS.RIGHT) {
    validateRightMove(board, shape);

    const newBoard = board.map((row) => [...row]);
    const newShape = [];
    // Clear mark from previous ceils
    shape.forEach(({i , j}) => {
      if(i >= 0) newBoard[i][j] = false
    })

     // Mark new ceils
    shape.forEach(({i , j}) => {
      if(i >= 0) {
        newBoard[i][j + 1] = true
      }
      newShape.push({i,j : j + 1})
    })

    return { newBoard, newShape };
  }

  if (direction === DIRECTIONS.DOWN) {
    const newBoard = board.map((row) => [...row]);
    const newShape = [];
    validateDownMove(board, shape);

    // Clear mark from previous ceils
    shape.forEach(({ i, j }) => {
      if (i >= 0) newBoard[i][j] = false;
    });

    // Mark new ceils
    shape.forEach(({ i, j }) => {
      if (i + 1 >= 0) newBoard[i + 1][j] = true;
      newShape.push({ i: i + 1, j });
    });

    return { newBoard, newShape };
  }
};
