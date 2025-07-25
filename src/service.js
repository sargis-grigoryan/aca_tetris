import { DIRECTIONS } from "./constants";
import {
  validateBoard,
  validateDownMove,
  validateLeftMove,
  validateRightMove,
  validateShape,
  validateRotation,
} from "./validations";

const clearShapeFromBoard = (board, shape) => {
  shape.forEach(({ i, j }) => {
    if (i >= 0 && i < board.length && j >= 0 && j < board[0].length) {
      board[i][j] = false;
    }
  });
};

export const rotateShape = (board, shape) => {
  const pivot = shape[1];
  const rotated = shape.map(({ i, j, color }) => {
    return {
      i: pivot.i - (j - pivot.j),
      j: pivot.j + (i - pivot.i),
      color,
    };
  });

  const newBoard = board.map(row => [...row]);
  shape.forEach(({ i, j }) => {
    if (i >= 0 && i < board.length && j >= 0 && j < board[0].length) {
      newBoard[i][j] = false;
    }
  });
  rotated.forEach(({ i, j, color }) => {
    if (i >= 0 && i < board.length && j >= 0 && j < board[0].length) {
      newBoard[i][j] = color;
    }
  });

  return { newBoard, newShape: rotated };
};


export const move = (board, shape, direction) => {
  validateBoard(board);
  validateShape(shape);

  const newBoard = board.map((row) => [...row]);
  const newShape = [];

  if (direction === DIRECTIONS.LEFT) {
    validateLeftMove(board, shape);
    clearShapeFromBoard(newBoard, shape);

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
    clearShapeFromBoard(newBoard, shape);

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
    clearShapeFromBoard(newBoard, shape);

    const sortedShape = [...shape].sort((a, b) => b.i - a.i);

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


