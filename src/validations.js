// do not validate positions which is part of the shape
const checkIsShapePart = (shape, newI, newJ) =>
  shape.figure.some(({i , j}) => i === newI && j === newJ);

export const validateBoard = (board) => {
  if (!Array.isArray(board)) {
    throw new Error("Board is not an array");
  }

  const hasInvalidRow = board.some((row) => !Array.isArray(row));

  if (hasInvalidRow) {
    throw new Error("There is a row in the board which is not an array");
  }
};

export const validateShape = (shape) => {
  if (!Array.isArray(shape.figure)) {
    throw new Error("Shape is not an array");
  }

  const hasInvalidCell = shape.figure.some(
    (cell) =>{
      typeof cell !== "object" ||
      !Number.isFinite(cell.i) ||
      !Number.isFinite(cell.j)
    }
  );

  if (hasInvalidCell) {
    throw new Error(
      "There is a cell in the shape which is not an object with 'i' and 'j' numeric values"
    );
  }
};

export const validateLeftMove = (board, shape) => {
  shape.figure.forEach(({i , j}) => {
    const isShapePart = checkIsShapePart(shape,i,j - 1);

    // if some part of the shape is in the first column or the left cell is already occupied
    if (!isShapePart && i >= 0 && (j === 0 || board[i][j - 1])) {
      throw new Error("Left move was failed");
    }
  });
};

export const validateRightMove = (board, shape) => {
  const width = board[0].length;

  shape.figure.forEach(({ i,j }) => {
    const isShapePart = checkIsShapePart(shape, i, j + 1);

    // if some part of the shape is in the last column or the right cell is already occupied
    if (!isShapePart && i >= 0 && (j === width - 1 || board[i][j + 1])) {
      throw new Error("Right move was failed");
    }
  });
};

export const validateDownMove = (board, shape) => {
  const height = board.length;

  shape.figure.forEach(({ i,j }) => {
    const isShapePart = checkIsShapePart(shape, i + 1, j);
    // if some part of the shape is in the bottom or the bellow cell is already occupied
    // i + 1 >= 0 condition means cells already in the board or going to be displayed
    if (!isShapePart && i + 1 >= 0 && (i === height - 1 || board[i + 1][j])) {
      throw new Error("Down move was failed");
    }
  });
};
