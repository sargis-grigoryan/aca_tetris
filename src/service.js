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

  const newBoard = board.map((row) => [...row]);
  const newShape = [];

  const clearShapeFromBoard = () => {
    shape.forEach(({ i, j }) => {
      if (i >= 0 && i < board.length && j >= 0 && j < board[0].length) {
        newBoard[i][j] = false;
      }
    });
  };

  if (direction === DIRECTIONS.LEFT) {
    validateLeftMove(board, shape);

    clearShapeFromBoard();

    shape.forEach(({ i, j, color }) => {
      const newJ = j - 1;
      if (i >= 0 && newJ >= 0) {
        newBoard[i][newJ] = color;
      }
      newShape.push({ i, j: newJ, color });
    });

    return { newBoard, newShape };
  }

  if (direction === DIRECTIONS.RIGHT) {
    validateRightMove(board, shape);

    clearShapeFromBoard();

    shape.forEach(({ i, j, color }) => {
      const newJ = j + 1;
      if (i >= 0 && newJ < board[0].length) {
        newBoard[i][newJ] = color;
      }
      newShape.push({ i, j: newJ, color });
    });

    return { newBoard, newShape };
  }

  if (direction === DIRECTIONS.DOWN) {
    validateDownMove(board, shape);

    const sortedShape = [...shape].sort((a, b) => b.i - a.i);

    clearShapeFromBoard();

    sortedShape.forEach(({ i, j, color }) => {
      const newI = i + 1;
      if (newI >= 0 && newI < board.length) {
        newBoard[newI][j] = color;
      }
      newShape.push({ i: newI, j, color });
    });

    return { newBoard, newShape };
  }

  throw new Error("Unknown move direction");
};

