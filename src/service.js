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
    const newShape = {figure : []}

    // Clear mark from previous ceils
    shape.figure.forEach(({i , j}) => {
        if (i >= 0) {
          newBoard[i][j] = false;
        }
    });

    // Mark new ceils
    shape.figure.forEach(({i , j}) => {
        if (i >= 0 && j >= 1) {
          newBoard[i][j - 1] = shape.color;
        }
        newShape.figure.push({ i, j: j - 1});
        newShape.color = shape.color
      })

    return { newBoard, newShape };
  }
  

  if (direction === DIRECTIONS.RIGHT) {
    validateRightMove(board, shape);

    const newBoard = board.map((row) => [...row]);
    const newShape = {figure : []}
    // Clear mark from previous ceils
    shape.figure.forEach(({i,j}) => {
        if(i >= 0) newBoard[i][j] = false
    })

     // Mark new ceils
    shape.figure.forEach(({i,j}) => {
        if(i >= 0) {
          newBoard[i][j + 1] = shape.color
      }
        newShape.figure.push({i,j : j + 1})
        newShape.color = shape.color
    })

    return { newBoard, newShape };
  }

  if (direction === DIRECTIONS.DOWN) {
    const newBoard = board.map((row) => [...row]);
    const newShape = {figure : []}
    validateDownMove(board, shape);

    // Clear mark from previous ceils
    shape.figure.forEach(({ i , j }) => {
        if (i >= 0) newBoard[i][j] = false;
    }); 

    // Mark new ceils
    shape.figure.forEach(({i,j}) => {
        if (i + 1 >= 0) newBoard[i + 1][j] = shape.color;
        newShape.figure.push({ i: i + 1, j });
        newShape.color = shape.color
    });

    return { newBoard, newShape };
  }
};