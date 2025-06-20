import { useState, useEffect } from 'react';
import './App.scss';

function App() {
	const width = 10;
	const height = 20;
	const [current, setCurrent] = useState({ row: 0, col: 5 });
	const [board, setBoard] = useState(() =>
		Array.from({ length: height }, (_, row) =>
			Array.from({ length: width }, (_, col) =>
				row === 0 && col === 5 ? true : null
			)
		)
	);

	useEffect(() => {
		const handleKeyDown = e => {
			setBoard(prev => {
				const newBoard = prev.map(row => [...row]);
				newBoard[current.row][current.col] = null;

				let newCol = current.col;
				if (e.key === 'ArrowLeft' && current.col > 0) {
					newCol--;
				}
				if (e.key === 'ArrowRight' && current.col < width - 1) {
					newCol++;
				}

				newBoard[current.row][newCol] = true;
				setCurrent({ ...current, col: newCol });

				return newBoard;
			});
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [current]);

	useEffect(() => {
		const interval = setInterval(() => {
			setBoard(prev => {
				const newBoard = prev.map(row => [...row]);

				if (current.row < height) {
					newBoard[current.row][current.col] = null;
				}

				if (
					current.row + 1 === height ||
					newBoard[current.row + 1][current.col] === true
				) {
					newBoard[current.row][current.col] = true;
					setCurrent({ row: 0, col: 5 });
					return newBoard;
				}
				const newRow = current.row + 1;
				newBoard[newRow][current.col] = true;
				setCurrent({ row: newRow, col: current.col });

				return newBoard;
			});
		}, 500);

		return () => clearInterval(interval);
	}, [current]);

	console.log(board[19]);

	return (
		<div className='container'>
			{board.map((row, rowIndex) => (
				<div className='row' key={rowIndex}>
					{row.map((cell, cellIndex) => (
						<div
							key={cellIndex}
							className={`cell ${cell === true ? 'marked' : ''}`}
						></div>
					))}
				</div>
			))}
		</div>
	);
}

export default App;
