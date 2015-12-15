var conway;
var ctx;
var timer;
var theGrid;
var CELL_SIZE = 3;
var NUM_CELLS = 300 / CELL_SIZE;

function init() {
  theGrid = initGrid();
  conway = document.getElementById("conway");
  ctx = conway.getContext("2d");
  drawGrid(theGrid);
  timer = setInterval(loop, 120);
  return timer;
}

function initGrid() {
  var grid = [];
  for (var x = 0; x < NUM_CELLS; x++) {
    grid.push([]);
    for (var y = 0; y < NUM_CELLS; y++) {
      grid[x].push(Math.round(Math.random()));
    }
  }
  return grid;
}

function loop() {
  theGrid = changeGrid(theGrid);
  drawGrid(theGrid);
}

function drawGrid(grid) {
  ctx.clearRect(0, 0, conway.width, conway.height);
  grid.forEach(function(row, row_index, rows) {
    row.forEach(function(cell, index, cells) {
      if (cell === 0) {
        ctx.fillStyle = "#FFFFFF";
      } else {
        ctx.fillStyle = "#00187A";
      }
      ctx.fillRect(row_index * CELL_SIZE, index * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });
  });
}

function liveNeighbors(x, y, grid) {
  var alive = 0;
  [-1, 0, 1].forEach(function(_x) {
    [-1, 0, 1].forEach(function(_y) {
      if (_x !== 0 || _y !== 0) {
        if (grid[x + _x] !== undefined && grid[x + _x][y + _y] == 1) {
          alive++;
        }
      }
    });
  });
  return alive;
}

function changeGrid(grid) {
  var newGrid = arrayClone(grid);
  grid.forEach(function(row, row_index, rows) {
    row.forEach(function(cell, index, cells) {
      var alive = liveNeighbors(row_index, index, grid);
      if (cell === 1 && (alive < 2 || alive > 3)) {
        newGrid[row_index][index] = 0;
      } else if (cell === 0 && alive === 3) {
        newGrid[row_index][index] = 1;
      }
    });
  });
  return newGrid;
}

/* Helpers */

// nested array clone
function arrayClone( arr ) {
  var i, copy;
  if( Array.isArray( arr ) ) {
    copy = arr.slice( 0 );
    for( i = 0; i < copy.length; i++ ) {
      copy[ i ] = arrayClone( copy[ i ] );
    }
    return copy;
  } else if( typeof arr === 'object' ) {
    throw 'Cannot clone array containing an object!';
  } else {
    return arr;
  }
}
