import { useEffect, useState, useRef } from 'react';
import './App.scss';
import { move } from './service';
import { DIRECTIONS } from './constants';
import getRandomShape from './shapes';
import getRandomColor from './colors';

const width = 10;
const height = 20;

function getMergedBoard(board, shape, color) {
	const merged = board.map(row => [...row]);
	shape.forEach(({ i, j }) => {
		if (i >= 0 && i < height && j >= 0 && j < width) {
			merged[i][j] = color;
		}
	});
	return merged;
}

function App() {
	const [isGameOver, setIsGameOver] = useState(false);
	const [shapeState, setShapeState] = useState({
		shape: getRandomShape(),
		color: getRandomColor(),
	});
	const [shape, setShape] = useState(shapeState.shape);

	const [board, setBoard] = useState(() =>
		Array(height)
			.fill(null)
			.map(() => Array(width).fill(false))
	);

	const shapeRef = useRef(shape);
	const boardRef = useRef(board);
	const timeoutID = useRef(null);

	useEffect(() => {
		shapeRef.current = shape;
		boardRef.current = board;
	}, [shape, board]);

	useEffect(() => {
		const tick = () => {
			try {
				const { newBoard, newShape } = move(
					boardRef.current,
					shapeRef.current,
					DIRECTIONS.DOWN,
					shapeState.color
				);

				setBoard(newBoard);
				setShape(newShape);
				timeoutID.current = setTimeout(tick, 200);
			} catch (e) {
				const updatedBoard = boardRef.current.map(row => [...row]);

				shapeRef.current.forEach(({ i, j }) => {
					console.log(shapeState.color);

					if (i >= 0 && i < height && j >= 0 && j < width) {
						updatedBoard[i][j] = shapeState.color;
					}
				});

				const nextShape = getRandomShape();
				const blocked = nextShape.some(({ i, j }) => {
					if (i < 0) return false;
					return updatedBoard[i]?.[j];
				});
				if (blocked) {
					console.log('Game over!');
					setIsGameOver(true);
					clearTimeout(timeoutID.current);
					return;
				}
				setShapeState({
					shape: getRandomShape(),
					color: getRandomColor(),
				});
				setBoard(updatedBoard);

				boardRef.current = updatedBoard;

				setShape(nextShape);
				shapeRef.current = nextShape;

				timeoutID.current = setTimeout(tick, 100);
			}
		};

		timeoutID.current = setTimeout(tick, 100);
		return () => clearTimeout(timeoutID.current);
	}, [shapeState.color]);

	const mergedBoard = getMergedBoard(board, shape, shapeState.color);

	return (
		<div className='container'>
			{isGameOver && <div className='game-over'>Game Over</div>}

			{mergedBoard.map((row, i) => (
				<div className='row' key={i}>
					{row.map((cell, j) => (
						<div
							className='cell'
							style={{ backgroundColor: cell || 'transparent' }}
							key={j}
						/>
					))}
				</div>
			))}
		</div>
	);
}

export default App;
