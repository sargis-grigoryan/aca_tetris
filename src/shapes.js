export const SHAPES = [
	[
		{ i: -1, j: 3 },
		{ i: -1, j: 4 },
		{ i: -1, j: 5 },
		{ i: -1, j: 6 },
	],
	[
		{ i: -2, j: 3 },
		{ i: -2, j: 4 },
		{ i: -2, j: 5 },
		{ i: -1, j: 4 },
	],
	[
		{ i: -4, j: 5 },
		{ i: -3, j: 5 },
		{ i: -2, j: 5 },
		{ i: -1, j: 5 },
	],

	[
		{ i: -2, j: 4 },
		{ i: -1, j: 4 },
		{ i: -2, j: 5 },
		{ i: -1, j: 5 },
	],

	[
		{ i: -2, j: 4 },
		{ i: -1, j: 4 },
		{ i: -1, j: 5 },
		{ i: -1, j: 6 },
	],

	[
		{ i: -3, j: 5 },
		{ i: -2, j: 5 },
		{ i: -2, j: 4 },
		{ i: -1, j: 4 },
	],
];

export default function getRandomShape() {
	const shapeInd = Math.floor(Math.random() * SHAPES.length);

	return SHAPES[shapeInd];
}
