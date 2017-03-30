class Grid {
  constructor() {
    this.width = 12;
    this.height = 12;
    this.grid = [...Array(12).keys()].map(i => Array(12));
  }

  remove(row, col){
    this.grid[row][col] = "NULL";
  }

  add(col){
    this.grid[0][col] = newCircle;
  }

  moveDown(row, col){
    this.grid[row + 1][col] = this.grid[row][col];
  }

  dotAction(row, col) {
    this.remove(row, col);
    this.moveDown(row - 1, col);
    this.add(col);
  }

}

module.exports = Grid;
