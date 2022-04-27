const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = 'black';

let color = DEFAULT_COLOR;

const blackButton = document.getElementById('black');
const randomButton = document.getElementById('random');
const gradientButton = document.getElementById('gradient');
const clearButton = document.getElementById('clear');
const grid = document.getElementById('grid');

function random(max) {
	return Math.floor(Math.random() * max);
}

function colorCell(element, color) {
	if (color === 'random') {
		element.style.backgroundColor =
				`rgb(${random(256)},${random(256)},${random(256)})`;
		element.style.opacity = 1;
	} else if (color === 'black') {
		element.style.backgroundColor = color;
		element.style.opacity = 1;
	} else if (color === 'gradient') {
		element.counter++;
		element.style.opacity = 0.1 * element.counter;
		element.style.backgroundColor = 'black';
	}
}

function loadGrid(size) {
	grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
	grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`

	for(let i = 0; i < size * size; i++) {
		const gridCell = document.createElement('div');
		gridCell.counter = 0;
		gridCell.addEventListener('mouseenter',
				event => colorCell(event.target, color));
		grid.appendChild(gridCell);
	}
}

function clearGrid() {
	grid.querySelectorAll('div').forEach(child => child.remove());
	let size = +prompt('Grid size (0 - 100): ');

	size = size > 100 ? 100 : size;
	
	loadGrid(size);
}

blackButton.addEventListener('click', () => color = 'black');
randomButton.addEventListener('click', () => color = 'random');
gradientButton.addEventListener('click', () => color = 'gradient');
clearButton.addEventListener('click', clearGrid);

window.onload = loadGrid(DEFAULT_SIZE);