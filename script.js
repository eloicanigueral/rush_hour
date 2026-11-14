const board = document.getElementById('board');
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


const exit = document.createElement('div');
exit.className = "exit"; //no m'acaba d agradar.. pq si el vermell canvia d llco allo es queda igual.. peroo revisar...
board.appendChild(exit); 

function mode(type){
    board.innerHTML = '';
    text.innerText = "Drag the red car trough the exit";
    board.appendChild(exit); //is the exit on the "border"....

    const level = structuredClone(type); //AI gave us this not to edit the original object/cars
    level.forEach(car => board.appendChild(createCar(car)));
}

function createCar(car){
    const div = document.createElement('div');
    div.className = 'car'; //not used here in the js, only in the css. The "car"s here are the var entered on the function

    //positioning the car by its values:
    div.style.left = car.col * CELL_SIZE + 'px';
    div.style.top = car.row * CELL_SIZE + 'px';
    div.style.width = (car.horitzontal ? car.length : 1) * CELL_SIZE  -4 + 'px';  //the -4 is to ad like a gap between elements.. sure i can put a gap without doing this..., bc it does nothing to the left...
    div.style.height = (car.horitzontal ? 1 : car.length) * CELL_SIZE -4 + 'px';  //or maybe i can change it in the css adding a border??... not sure
    
    //"paint" the car:
    div.style.backgroundColor = car.color;

    div.addEventListener('dblclick', () => selectCar(div, car)); //by now quite useless... but its cool

    div.addEventListener('mousedown', (click) => { //mousedown is like the start of the click...  //click is the var name for what the browser returns when clicking == its position
        console.log(click); //it can be deleted.. is for knowing the properties

        //where was the mouse when clicking
        const Xi = click.clientX; //starting mouse X
        const Yi = click.clientY; //starting mouse Y

        //where was the car when clicking
        const Li = div.offsetLeft; //starting car left
        const Ti = div.offsetTop; //starting car top
        

        function move(mouse){ //i need this functions to be able to remove the listener... //the "mouse" var is the current and moving position of the mouse, to be able to move the div...

            if (car.horitzontal){
                //div.style.left = Li + (mouse.clientX - Xi) + 'px'; //the current X position is, where it started (left side) + where the mouse has moved (== its actual position - where the mouse started (initial position))
                let x = Li + (mouse.clientX - Xi);
                if (car.color === "red"){
                    x = Math.max(0, Math.min(x, (MAX_CELLS)*CELL_SIZE)); //the position is the gratest number beteween the left wall (0), and the right wall (the minumum number between the right wall and the car place)
                } else {
                    x = Math.max(0, Math.min(x, (MAX_CELLS - car.length) * CELL_SIZE)); //the position is the gratest number beteween the left wall (0), and the right wall (the minumum number between the right wall and the car place)
                    
                }
                div.style.left = x + 'px';
            } 
            else{
                //div.style.top = Ti + (mouse.clientY - Yi) + 'px'; //same for the vertical axis

                let y = Ti + (mouse.clientY - Yi);
                y = Math.max(0, Math.min(y, (MAX_CELLS - car.length) * CELL_SIZE));
                div.style.top = y + 'px';
            } 
        }
        
        function quit() { //i need this functions to be able to remove the listener...

            if (car.horitzontal){ //this if is to drop the car in a cell (in a safe and correct place)... not wherever the user has drop it
                car.col = Math.round(div.offsetLeft / CELL_SIZE); //in which cell the car is (offsetLeft / cellsize), rounded to get exactly one 
                div.style.left = car.col * CELL_SIZE + 'px'; //we saved that in car.col to update the car data -> would be easier to check colisions
                if (car.color === "red" && car.col >= MAX_CELLS){
                    alert("HAS GUANYAT!");
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

function selectCar(div, car){ /////////ouuuuuuuuuuuuuu as an extra we could change car colors... (without having the red option...)
    selected = div;
    let original = car.color;
    if (selected.style.backgroundColor !== original) selected.style.backgroundColor = original;
    else selected.style.backgroundColor = "black";
    
    console.log('Clic al cotxe', car); //we can delete this... was mainly for debugging
}

function reset(){
    board.innerHTML = '';
    text.innerText = "Choose the level mode:";
    board.appendChild(exit);
}