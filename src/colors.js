export default function getRandomColor() {
	const colors = ['red', 'blue', 'green', 'orange', 'purple', 'yellow', 'cyan'];
	return colors[Math.floor(Math.random() * colors.length)];
}
