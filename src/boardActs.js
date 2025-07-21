export const getMergedBoard = (board, shape, height, width) => {
  const merged = board.map(row => [...row]);
  shape.forEach(({ i, j, color }) => {
    if (i >= 0 && i < height && j >= 0 && j < width) {
      merged[i][j] = color;
    }
  });
  return merged;
};

export const clearFullLines = (board) => {
  const width = board[0].length;
  const newBoard = board.filter(row => row.some(cell => !cell));
  const linesCleared = board.length - newBoard.length;

  const emptyRows = Array(linesCleared)
    .fill(null)
    .map(() => Array(width).fill(false));

  return {
    board: [...emptyRows, ...newBoard],
    linesCleared
  };
};


