// Do not validate positions which are part of the shape
const checkIsShapePart = (shape, newI, newJ) =>
  shape.some((cell) => cell.i === newI && cell.j === newJ);

export const validateSpawn = (board, shape) => {
  shape.forEach(({ i, j }) => {
    if (
      i >= 0 &&
      i < board.length &&
      j >= 0 &&
      j < board[0].length &&
      board[i][j] !== false
    ) {
      throw new Error("Cannot spawn shape — position occupied");
    }
  });
};

export const validateRotation = (board, rotatedShape) => {
  const height = board.length;
  const width = board[0].length;

  for (const { i, j } of rotatedShape) {
    if (i < 0) continue;

    if (
      i >= height ||
      j < 0 ||
      j >= width ||
      board[i][j] !== false
    ) {
      throw new Error("Rotation blocked");
    }
  }
};


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
  if (!Array.isArray(shape)) {
    throw new Error("Shape is not an array");
  }

  const hasInvalidCell = shape.some(
    (cell) =>
      typeof cell !== "object" ||
      !Number.isFinite(cell.i) ||
      !Number.isFinite(cell.j)
  );

  if (hasInvalidCell) {
    throw new Error(
      "There is a cell in the shape which is not an object with 'i' and 'j' numeric values"
    );
  }
};

export const validateLeftMove = (board, shape) => {
  shape.forEach(({ i, j }) => {
    const isShapePart = checkIsShapePart(shape, i, j - 1);

    if (
      !isShapePart &&
      (j === 0 || board[i][j - 1] !== false)
    ) {
      throw new Error("Left move was failed");
    }
  });
};

export const validateRightMove = (board, shape) => {
  const width = board[0].length;

  shape.forEach(({ i, j }) => {
    const isShapePart = checkIsShapePart(shape, i, j + 1);

    if (
      !isShapePart &&
      (j === width - 1 || board[i][j + 1] !== false)
    ) {
      throw new Error("Right move was failed");
    }
  });
};

export const validateDownMove = (board, shape) => {
  const height = board.length;

  shape.forEach(({ i, j }) => {
    const isShapePart = checkIsShapePart(shape, i + 1, j);

    if (
      !isShapePart &&
      i + 1 >= 0 &&
      (i === height - 1 || board[i + 1][j] !== false)
    ) {
      throw new Error("Down move was failed");
    }
  });
};


