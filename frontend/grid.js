const Board = require('./board');
//consider changing names to avoid "Board.grid.grid"
class Grid {
  constructor(board) {
    this.width = 12;
    this.height = 12;
    this.spacing = 40;
    this.circleRadius = 10;

    this.grid = [...Array(this.height).keys()].map(i => Array(this.width));
    this.dropQueue = [];
    //sort drop Queue appropriately before drop
    this.board = board;
    this.stage = board.stage;
    this.squareColor = '';
    //prob only keep one of above two lines
  }

  fallAnimation(circle){
    createjs.Tween.get(circle)
      .to({y: circle.y + this.spacing}, 250)
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", this.stage);
  }

  columnFallAnimation(circle){

  }

  //think about where to throw stage.update()'s

  createCircle(row, col){
    let circle = new createjs.Shape();
    //this.setFallAnimation(circle);
    circle.pos=[row,col];
    this.pushAt(circle, row, col);
    this.updateGridPos(circle, row, col);
    circle.graphics.beginFill(this.board.randColor()).drawCircle(0, 0, this.circleRadius);
    //consider diff place to import color from
    this.mapCircletoStage(circle);
    this.stage.addChild(circle);

    circle.addEventListener("mousedown",()=>{
      // console.log(this.color(circle));
      if(this.dropQueue.length === 0){
        //add game logic and other logic
        this.prependToDrop(circle);
      }}
    );

    this.stage.update();

    return circle;
  }

  mapCircletoStage(circle){
    let xPos = (circle.gridPos.col + 1) * this.spacing;
    let yPos = (circle.gridPos.row + 1) * this.spacing;
    circle.x = xPos;
    circle.y = yPos;
    this.stage.update();
  }

  mapGridtoStage(){
    function flatten(arr){
      return [].concat.apply([],arr);
    }
    this.grid.flatten.forEach(circle => this.mapCircletoStage(circle));
  }

  //accepts 1 arg as coord array or 2 args as coords
  getCircleAt(pos){
    let [row, col] = pos;
    return this.grid[row][col];
  }

// SINGLE DOT LIFE CYCLE
  remove(row, col){
    // debugger;
    let circle = this.grid[row][col];
    this.stage.removeChild(circle);
    //consider implement of removeChildAt for speed (poss mem tradeoff by assigning attr)
    this.grid[row][col] = "NULL";
  }

  add(col){
    // debugger;

    //insert new animation
    let circle = this.createCircle(0, col);
    this.grid[0][col] = circle;
    this.updateGridPos(circle, 0, col);
  }

  //move circ at row,col to row+1,col (row+1 here is row in (add and) remove)
  moveDown(row, col){
    // debugger;

    //insert animation
    let circle = this.grid[row][col];
    this.grid[row + 1][col] = circle;
    // this.fallAnimation(circle);
    this.stage.update();
    this.updateGridPos(circle, row + 1, col);
    this.mapCircletoStage(circle, row + 1, col);
  }

  //remove sequence
  dotAction(row, col) {
    // debugger;
    this.remove(row, col);
    this.columnFall(row - 1, col);
    this.add(col);
  }
// END SINGLE DOT LIFE CYCLE
  columnFall(row, col){
    if (row < 0){
      return;
    }
    else{
      this.moveDown(row, col);
      // this.fallAnimation(this.getCircleAt(row,col));
      this.columnFall(row -1, col);
    }
  }
  //loop dotAction appropriately
  gridAction(){
    if (this.squareColor){
      this.grid.forEach(row => row.forEach(circle => {
        if(this.color(circle) === this.squareColor){
            this.prependToDrop(circle);
        }
      }))
    }
    this.sortDropQueue();
    let output = [this.squareColor||this.color(this.dropQueue[0]), this.dropQueue.length];
    this.dropQueue.forEach(circle => this.dotAction(circle.gridPos.row, circle.gridPos.col));
    this.dropQueue = [];
    this.squareColor = '';
    return output;
  }

  updateGridPos(circle, row, col) {
    circle.gridPos = {'row': row, 'col': col};
    circle.pos = [row,col];
  }

  sortDropQueue(){
    function compare(a, b) {
      if (a.gridPos.row < b.gridPos.row) {
        return -1;
      }
      if (a.gridPos.row > b.gridPos.row) {
        return 1;
      }
      return 0;
    }
    this.dropQueue.sort(compare);
  }

  color(circle){
    return circle.graphics._fill.style;
  }

  //push to dropQueue
  prependToDrop(circle){
    if(this.dropQueue.includes(circle)){
      this.squareColor = this.color(circle);
    }
    else{
      this.dropQueue.unshift(circle);
    }
  }

  pushAt(circle, row, col){
    this.grid[row][col] = circle;
  }

  //POSITION HELPERS
  above(circle){
    return this.grid[circle.gridPos.row - 1][circle.gridPos.col];
  }

  leftOf(circle){
    return this.grid[circle.gridPos.row + 1][circle.gridPos.col];
  }

  below(circle){
    return this.grid[circle.gridPos.row][circle.gridPos.col - 1];
  }

  rightOf(circle){
    return this.grid[circle.gridPos.row][circle.gridPos.col + 1];
  }
  //END POSITION HELPERS
}

module.exports = Grid;
