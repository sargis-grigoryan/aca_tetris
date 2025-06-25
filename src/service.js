import { DIRECTIONS } from './constants';
import {
	validateBoard,
	validateDownMove,
	validateLeftMove,
	validateRightMove,
	validateShape,
} from './validations';

export const move = (board, shape, direction) => {
	validateBoard(board);
	validateShape(shape);

	const newBoard = board.map(row => [...row]);
	const newShape = [];

	if (direction === DIRECTIONS.LEFT) {
		validateLeftMove(board, shape);

		shape.forEach(({ i, j }) => {
			if (i >= 0) {
				newBoard[i][j] = false;
			}
			newShape.push({ i, j: j - 1 });
		});
	}
	if (direction === DIRECTIONS.RIGHT) {
		validateRightMove(board, shape);

		shape.forEach(({ i, j }) => {
			if (i >= 0) {
				newBoard[i][j] = false;
			}
			newShape.push({ i, j: j + 1 });
		});
	}
	if (direction === DIRECTIONS.DOWN) {
		validateDownMove(board, shape);

		shape.forEach(({ i, j }) => {
			newShape.push({ i: i + 1, j });
		});
	}

	newShape.forEach(({ i, j }) => {
		if (i >= 0 && i < newBoard.length && j >= 0 && j < newBoard[0].length) {
			newBoard[i][j] = true;
		}
	});

	return { newBoard, newShape };
};
