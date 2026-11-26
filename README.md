# Rush Hour
Browser implementation of the Rush Hour sliding puzzle in HTML, CSS and JavaScript.

**Github Pages**: https://eloicanigueral.github.io/rush_hour/

### Authors
- Eloi Cañigueral - u6103316
- Arnau Lloret - u6103315


## How to play
- Choose a level: Easy, Intermediate or Hard
- Click and drag a car. Cars only move along their orientation (horizontal or vertical) and cannot cross walls or other cars
- When released, a car snaps to the nearest cell
- The move counter increases each time a car ends in a different cell
- Reset clears the board and returns to the level selection

## Implementation
- **Board:** a 6x6 grid. Cell size and board size are defined as constants in both CSS (`--cell-size`, `--max-cells`) and JS (`CELL_SIZE`, `MAX_CELLS`)
- **Cars:** each car is an object (`row`, `col`, `length`, `horitzontal`, `color`). Levels are arrays of these objects. Each game works on a copy (`structuredClone`), so restarting a level restores the original positions
- **Movement:** on `mousedown` the limits of the car (walls or other cars) are computed in each direction; during `mousemove` the car follows the mouse inside those limits; on `mouseup` it snaps to a cell
- **Collisions:** `freeSpace(row, col, car, level)` checks if a cell is occupied by another car
- **Win condition:** the red car can leave the board only if the path to the exit is clear
- **Exit:** fixed on row 2, where the red car starts in every level

## Extras
- **Random car colors:** double-clicking a car (except the red one) changes its color to a random one from the `COLORS` array in `script.js`
- **Dynamic message:** the text below the title changes depending on the state of the game:
  - On page load, or after pressing "Reset", it asks the player to choose a level
  - Once a level is chosen, it shows the level name followed by the instruction to drag the **red** car to the exit (with "red" written in red)

### Future
- [ ] Let the user choose the color of the main car (using a constant and excluding it from the `COLORS` array)
- [ ] Add a slider to change the board and the cars size, using the existing constants for the cell sizes
- [ ] Random initial colors for the cars (reusing the function that changes the colors)
- [ ] Implement touch (for mobile interaction)
- [ ] A timer to show how long the player takes to finish a leve
- [ ] Show a win message on the page instead of an `alert`
