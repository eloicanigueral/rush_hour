const board = document.getElementById('board');
const text = document.getElementById('text');
const CELL_SIZE = 80;


// the color of the cars could be random (without the red)??

const carsEasy = [ //it can be changed... is the model like the example implementation
    {row: 2, col: 0, length: 2, horitzontal: true, color: 'red'},
    {row: 3, col: 0, length: 3, horitzontal: false, color: 'green'},
    {row: 0, col: 3, length: 3, horitzontal: false, color: 'yellow'},
    {row: 3, col: 1, length: 3, horitzontal: true, color: 'orange'}
];

const carsInt = [ //it can be changed... is the model like the example implementation
    {row: 2, col: 0, length: 2, horitzontal: true, color: 'red'},
    {row: 3, col: 1, length: 2, horitzontal: true, color: 'blue'},
    {row: 0, col: 2, length: 3, horitzontal: false, color: 'yellow'},
    {row: 0, col: 3, length: 3, horitzontal: true, color: 'green'},
    {row: 1, col: 5, length: 2, horitzontal: false, color: 'purple'},
    {row: 3, col: 5, length: 3, horitzontal: false, color: 'yellow'},
    {row: 5, col: 2, length: 3, horitzontal: true, color: 'green'}
];

const carsHard = [ //it can be changed... is the model like the example implementation
    {row: 2, col: 0, length: 2, horitzontal: true, color: 'red'},
    {row: 3, col: 0, length: 3, horitzontal: false, color: 'green'},
    {row: 3, col: 1, length: 2, horitzontal: false, color: 'blue'},
    {row: 5, col: 1, length: 2, horitzontal: true, color: 'yellow'},
    {row: 3, col: 2, length: 2, horitzontal: false, color: 'purple'},
    {row: 3, col: 3, length: 2, horitzontal: true, color: 'blue'},
    {row: 4, col: 3, length: 2, horitzontal: false, color: 'orange'},
    {row: 0, col: 1, length: 2, horitzontal: false, color: 'purple'},
    {row: 0, col: 2, length: 2, horitzontal: true, color: 'cyan'},
    {row: 0, col: 4, length: 3, horitzontal: false, color: 'orange'},
    {row: 1, col: 2, length: 2, horitzontal: false, color: 'yellow'},
    {row: 1, col: 3, length: 2, horitzontal: false, color: 'green'}
];


//i tried to put all the "exit" cod here, but it only works when there's any mode activated


function mode(type){
    board.innerHTML = '';
    text.innerText = "Drag the red car trough the exit";

    //dont know if should be like this.... :
    exit = document.createElement('div');
    exit.className = "exit"; //i dont know why it doesnt work with the class... i can remove this line and the css....
    exit.style.left = 6 * CELL_SIZE + 'px';
    exit.style.top = 2 * CELL_SIZE + 'px';
    exit.style.width = 40 + 'px'; //40 is the border width
    exit.style.height = CELL_SIZE + 'px';
    exit.style.backgroundColor = "blue"; //change the color for the background color: #ddd (now its for viewing it)
    //upto here, and the last line of the function also

    type.forEach(car => {
        div = document.createElement('div');
        div.className = 'car';
        div.style.left = car.col * CELL_SIZE + 'px';
        div.style.top = car.row * CELL_SIZE + 'px';
        div.style.width = (car.horitzontal ? car.length : 1) * CELL_SIZE + 'px';
        div.style.height = (car.horitzontal ? 1 : car.length) * CELL_SIZE + 'px';
        div.style.backgroundColor = car.color;
        board.appendChild(div);
    });
    board.appendChild(exit); //this one also
}