import { useEffect, useState } from 'react';
import './App.scss';
import { move } from './service';
import { DIRECTIONS } from './constants';

const width = 10;
const height = 25;
const initialShape = [
	{
		i: -4,
		j: 5,
	},
	{
		i: -3,
		j: 5,
	},
	{
		i: -2,
		j: 5,
	},
	{
		i: -1,
		j: 5,
	},
];

function App() {
	console.log('Rerendered!');
	const width = 10;
	const height = 20;
	const [selectedRow, setSelectedRow] = useState(0);
	const [board, setBoard] = useState(() =>
		Array(height)
			.fill(null)
			.map(() => Array(width).fill(null))
	);

	let selectedJ = 5;
	setTimeout(() => {
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

			return row;
		});

		setBoard(newBoard);
		setSelectedRow((selectedRow + 1) % height);
	}, 200);

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
