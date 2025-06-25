import { useEffect, useState } from 'react';
import './App.scss';
import { move } from './service';
import { DIRECTIONS } from './constants';

const width = 10;
const height = 20;

const initialShape = [
	{ i: -4, j: 5 },
	{ i: -3, j: 5 },
	{ i: -2, j: 5 },
	{ i: -1, j: 5 },
];

function App() {
	const [shape, setShape] = useState(initialShape);
	const [board, setBoard] = useState(
		Array(height)
			.fill(null)
			.map(() => Array(width).fill(false))
	);

	useEffect(() => {
		const eventHandler = ({ key }) => {
			let result = null;

			if (key === 'ArrowLeft') {
				result = move(board, shape, DIRECTIONS.LEFT);
			} else if (key === 'ArrowRight') {
				result = move(board, shape, DIRECTIONS.RIGHT);
			} else if (key === 'ArrowDown') {
				result = move(board, shape, DIRECTIONS.DOWN);
			}

			if (result) {
				setShape(result.newShape);
			}
		};

		document.addEventListener('keydown', eventHandler);

		return () => {
			document.removeEventListener('keydown', eventHandler);
		};
	}, [board, shape]);

	useEffect(() => {
		const interval = setInterval(() => {
			setShape(prevShape => {
				try {
					const { newShape } = move(board, prevShape, DIRECTIONS.DOWN);
					return newShape;
				} catch (e) {
					const newBoard = board.map(row => [...row]);
					prevShape.forEach(({ i, j }) => {
						if (i >= 0 && i < height && j >= 0 && j < width) {
							newBoard[i][j] = true;
						}
					});
					setBoard(newBoard);
					return initialShape;
				}
			});
		}, 500);

		return () => clearInterval(interval);
	}, [board]);

	const isCellOccupied = (rowIdx, colIdx) => {
		const inShape = shape.some(({ i, j }) => i === rowIdx && j === colIdx);
		return board[rowIdx][colIdx] || inShape;
	};

	return (
		<div className='container'>
			{board.map((row, rowIdx) => (
				<div key={rowIdx} className='row'>
					{row.map((_, colIdx) => (
						<div
							key={colIdx}
							className={`cell ${
								isCellOccupied(rowIdx, colIdx) ? 'marked' : ''
							}`}
						></div>
					))}
				</div>
			))}
		</div>
	);
}

export default App;
