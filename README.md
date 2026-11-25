# Rush Hour
Browser implementation of the Rush Hour sliding puzzle in HTML, CSS and JavaScript.


### Authors
- Eloi Cañigueral - u6103316
- Arnau Lloret - u6103315


## How to play
- Choose a level: Easy, Intermediate or Hard.
- Click and drag a car. Cars only move along their orientation
  (horizontal or vertical) and cannot cross walls or other cars.
- When released, a car snaps to the nearest cell.
- The move counter increases each time a car ends in a different cell.
- Reset clears the board and returns to the level selection.

## Implementation
- **Board:** a 6x6 grid. Cell size and board size are defined as
  constants in both CSS (`--cell-size`, `--max-cells`) and JS
  (`CELL_SIZE`, `MAX_CELLS`).
- **Cars:** each car is an object (`row`, `col`, `length`,
  `horitzontal`, `color`). Levels are arrays of these objects.
  Each game works on a copy (`structuredClone`), so restarting a level
  restores the original positions.
- **Movement:** on `mousedown` the limits of the car (walls or other
  cars) are computed in each direction; during `mousemove` the car
  follows the mouse inside those limits; on `mouseup` it snaps to a cell.
- **Collisions:** `freeSpace(row, col, car, level)` checks if a cell is
  occupied by another car.
- **Win condition:** the red car can leave the board only if the path
  to the exit is clear.
- **Exit:** fixed on row 2, where the red car starts in every level.