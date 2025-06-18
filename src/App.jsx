import { useState, useEffect } from 'react';
import './App.scss';

let isTrue = false;
let lastRow = 20;

function App() {
	const width = 10;
	const height = 20;
	const [selectedRow, setSelectedRow] = useState(0);
	const [board, setBoard] = useState(() =>
		Array(height)
			.fill(null)
			.map(() => Array(width).fill(null))
	);

	let selectedJ = 5;
	let timeoutID = setTimeout(() => {
		const newBoard = board.map((row, rowIndex) => {
			if ((rowIndex + 1) % height === selectedRow) {
				return row.fill(false);
			}

			if (rowIndex === selectedRow) {
				return row.map((_, cellIndex) => {
					if (cellIndex === selectedJ) {
						return true;
					}
				});
			}

			if (rowIndex >= lastRow && isTrue) {
				return row.map((_, cellIndex) => {
					if (cellIndex === selectedJ) {
						return true;
					}
				});
			}

			if (selectedRow + 1 === lastRow) {
				isTrue = true;
				lastRow--;
			}

			return row;
		});
		setBoard(newBoard);

		setSelectedRow((selectedRow + 1) % num);
	}, 500);

	if (lastRow === 2) {
		clearTimeout(timeoutID);
		alert('game over');

		return;
	}

	return (
		<div className='container'>
			{board.map(row => (
				<div className='row'>
					{row.map(cell => (
						<div className={`cell ${cell === true ? 'marked' : ''}`}></div>
					))}
				</div>
			))}
		</div>
	);
}

export default App;
