const cars = document.getElementById('cars');
const text = document.getElementById('text');
const CELL_SIZE = 80;
const MAX_CELLS = 6; //maximum number of columns/rows == board size
var selected = null;

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


function mode(type){
    cars.innerHTML = '';
    text.innerText = "Drag the red car trough the exit";

    const level = structuredClone(type); //AI gave us this not to edit the original object/cars
    level.forEach(car => cars.appendChild(createCar(car, level)));
}

function createCar(car, level){
    const div = document.createElement('div');
    div.className = 'car'; //not used here in the js, only in the css. The "car"s here are the var entered on the function

    //positioning the car by its values:
    div.style.left = car.col*CELL_SIZE + 'px';
    div.style.top = car.row*CELL_SIZE + 'px';
    div.style.width = (car.horitzontal ? car.length : 1)*CELL_SIZE + 'px';  //the -4 is to ad like a gap between elements.. sure i can put a gap without doing this..., bc it does nothing to the left...
    div.style.height = (car.horitzontal ? 1 : car.length)*CELL_SIZE + 'px';  //or maybe i can change it in the css adding a border??... not sure
    
    //"paint" the car:
    div.style.backgroundColor = car.color;

    div.addEventListener('dblclick', () => selectCar(div, car)); //by now quite useless... but its cool

    div.addEventListener('mousedown', (click) => { //mousedown is like the start of the click...  //click is the var name for what the browser returns when clicking == its position
        //console.log(click); //it can be deleted.. is for knowing the properties

        //where was the mouse when clicking
        const Xi = click.clientX; //starting mouse X
        const Yi = click.clientY; //starting mouse Y

        //where was the car when clicking
        const Li = div.offsetLeft; //starting car left
        const Ti = div.offsetTop; //starting car top
        
        const maxX = rightLimit(car, level);
        const minX = leftLimit(car, level); 
        const maxY = bottomLimit(car, level);
        const minY = topLimit(car, level);

        function move(mouse){ //i need this functions to be able to remove the listener... //the "mouse" var is the current and moving position of the mouse, to be able to move the div...

            if (car.horitzontal){
                let x = Li + (mouse.clientX - Xi);  //the current X position is, where it started (left side) + where the mouse has moved (== its actual position - where the mouse started (initial position))
                x = Math.max(minX, Math.min(x, maxX)); //the position is the gratest number beteween the minimum X (wall or car at the left), and the maximum X (the minumum number between the actual position and the next car or wall at the right)
                div.style.left = x + 'px';
            } 
            else{
                let y = Ti + (mouse.clientY - Yi); //same for the vertical axis
                y = Math.max(minY, Math.min(y, maxY));
                div.style.top = y + 'px';
            } 
        }
        
        function quit() { //i need this functions to be able to remove the listener...

            if (car.horitzontal){ //this if is to drop the car in a cell (in a safe and correct place)... not wherever the user has drop it
                car.col = Math.round(div.offsetLeft / CELL_SIZE); //in which cell the car is (offsetLeft / cellsize), rounded to get exactly one 
                div.style.left = car.col * CELL_SIZE + 'px'; //we saved that in car.col to update the car data -> would be easier to check colisions
                if (car.color === "red" && car.col >= MAX_CELLS-1){
                    alert("YOU WIN!");
                    reset();
                }
            } else {
                car.row = Math.round(div.offsetTop / CELL_SIZE); //in which cell the car is (offsetTop / cellsize), rounded to get exactly one
                div.style.top = car.row * CELL_SIZE + 'px';
            }

            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', quit);
        };

        document.addEventListener('mousemove', move); //i dont know if div or document
        document.addEventListener('mouseup', quit); //i dont know if div or document
    });

    return div; //if we dont return, the car isn't created
}

function rightLimit(car, level){ //to know the maximum right limit (including walls)
    let col = car.col;
    while (col+car.length < MAX_CELLS && freeSpace(car.row, col+car.length, car, level)) col++;
    if (car.color === "red" && col+car.length === MAX_CELLS) col = MAX_CELLS+1; //if its the red, and it can arrive to the "door", it can pass it
    return col*CELL_SIZE;   // pixels limit
}

function leftLimit(car, level){ //to know the maximum left limit
    let col = car.col;
    while (col>0 && freeSpace(car.row, col-1, car, level)) col--;
    return col*CELL_SIZE;
}

function bottomLimit(car, level){ //to know the maximum bottom limit
    let row = car.row;
    while (row+car.length<MAX_CELLS && freeSpace(row+car.length, car.col, car, level)) row++;
    return row*CELL_SIZE;
}

function topLimit(car, level){ //to know the maximum top limit (including walls)
    let row = car.row;
    while (row>0 && freeSpace(row-1, car.col, car, level)) row--;
    return row*CELL_SIZE;   // pixels limit
}

function freeSpace(row, col, car, level){
    for (const other of level){
        if (other === car) continue;
        if (other.horitzontal){
            if (other.row === row && other.col <= col && col < other.col + other.length) return false;
        } else {
            if (other.col === col && other.row <= row && row < other.row + other.length) return false;
        }
    }
    return true;
}


function selectCar(div, car){ /////////ouuuuuuuuuuuuuu as an extra we could change car colors... (without having the red option...)
    selected = div;
    let original = car.color;
    if (selected.style.backgroundColor !== original) selected.style.backgroundColor = original;
    else selected.style.backgroundColor = "black";
    
    //console.log('car clicked', car); //we can delete this... was mainly for debugging
}

function reset(){
    cars.innerHTML = '';
    text.innerText = "Choose the level mode:";
}