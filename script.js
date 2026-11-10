const board = document.getElementById('board');
const CELL_SIZE = 80;

const carsEasy = [
    {row: 2, col: 0, length: 2, horitzontal: true, color: 'red'},
];

function easyMode(){
    board.innerHTML = '';
    carsEasy.forEach(car => {
        div = document.createElement('div');
        div.className = 'car';
        div.style.left = car.col * CELL_SIZE + 'px';
        div.style.top = car.row * CELL_SIZE + 'px';
        div.style.width = (car.horitzontal ? car.length : 1) * CELL_SIZE + 'px';
        div.style.height = (car.horitzontal ? 1 : car.length) * CELL_SIZE + 'px';
        div.style.backgroundColor = car.color;
        board.appendChild(div);
    });
}