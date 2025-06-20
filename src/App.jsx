import { useState, useEffect, useRef } from 'react';
import './App.scss';

function App() {
	const width = 10;
	const height = 20;
	const [selectedRow, setSelectedRow] = useState(0);
	const [selectedJ, setSelectedJ] = useState(5);
	// const [lastRow, setLastRow] = useState(height);
	// const [isTrue, setIsTrue] = useState(false);
	const [board, setBoard] = useState(() =>
		Array(height)
			.fill(null)
			.map(() => Array(width).fill(null))
	);

	useEffect(() => {
		const handleKeyDown = e => {
			if (e.key === 'ArrowLeft') {
				setSelectedJ(prev => Math.max(prev - 1, 0));
			}
			if (e.key === 'ArrowRight') {
				setSelectedJ(prev => Math.min(prev + 1, width - 1));
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, []);

	useEffect(() => {
		// if (lastRow <= 1) return;

		const timeoutID = setTimeout(() => {
			const newBoard = board.map((row, rowIndex) => {
				if ((rowIndex + 1) % height === selectedRow) {
					return row.fill(false);
				}

				if (rowIndex === selectedRow) {
					return row.map((_, cellIndex) =>
						cellIndex === selectedJ ? true : false
					);
				}

				// if (rowIndex >= lastRow && isTrue) {
				// 	return row.map((_, cellIndex) =>
				// 		cellIndex === selectedJ ? true : false
				// 	);
				// }

				return row;
			});

			// if (selectedRow + 1 === lastRow) {
			// 	setIsTrue(true);
			// 	setLastRow(prev => prev - 1);
			// }

			setBoard(newBoard);
			setSelectedRow((selectedRow + 1) % height);
		}, 200);

		return () => clearTimeout(timeoutID);
	}, [board, selectedRow, selectedJ]);

	// useEffect(() => {
	// 	if (lastRow <= 1) {
	// 		alert('Game over');
	// 	}
	// }, [lastRow]);

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
