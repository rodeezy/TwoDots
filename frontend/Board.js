const Grid = require('./grid');
const Game = require('./game');
//consider making circle class
class Board {
  //grid is 12x12
  constructor(game) {
    this.stage = new createjs.Stage("Canvas");
    this.colors = ['#fecd6c', '#77c298', '#a4547d', '#e84d60', "DeepSkyBlue"]
    // this.circles = [];
    this.lines = [];
    this.grid = new Grid(this);
    this.game = game;
    this.validMove = this.game.validMove;
  }

  randColor(){
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  isSelected(){
    return this.grid.dropQueue.length !== 0;
  }

  makeCircle(row, col) {
    let circle = this.grid.createCircle(row, col);
    // circle.x = xPos;
    // circle.y = yPos;

    // circle.addEventListener("mousedown",()=>{
    //   console.log('click!');
    //   if(!this.isSelected()){
    //     //add game logic and other logic
    //     this.grid.dropQueue.push(circle);
    //   }}
    // );
    //
    // this.stage.update();
  }


  drawLine(line, startX, startY) {
    // debugger;
    this.stage.addChild(line);
    line.graphics.setStrokeStyle(3);
    line.graphics.beginStroke('grey');

    line.graphics.moveTo(startX, startY);
    this.lines.push(line);
  }

  //move[Direction] refers to line move

  moveDown(startX, startY){
    //can change numbers to attributes
    // let startPos = [this.toGridLoc(startY),this.toGridLoc(startX)];
    // let nextPos = [this.toGridLoc(startY)+1,this.toGridLoc(startX)];
    // if(!this.game.validMove(startPos, nextPos)){
    //   return;
    // }
    startY+=10;
    var line = new createjs.Shape();
    this.drawLine(line, startX, startY);
    let i = 0;
    while(i<20){
      startY++;
      line.graphics.lineTo(startX, startY);
      i++;
    }
    line.graphics.endStroke();
    this.stage.update();
  }

  toGridLoc(pos){
    return pos/40 - 1;
  }

  moveUp(startX, startY){
    // let startPos = [this.toGridLoc(startY),this.toGridLoc(startX)];
    // let nextPos = [this.toGridLoc(startY)-1,this.toGridLoc(startX)];
    // if(!this.game.validMove(startPos, nextPos)){
    //   return;
    // }
    startY-=10;
    var line = new createjs.Shape();
    this.drawLine(line, startX, startY);
    let i = 0;
    while(i<20){
      startY--;
      line.graphics.lineTo(startX, startY);
      i++;
    }
    line.graphics.endStroke();
    this.stage.update();
  }

  moveLeft(startX, startY){
    // let startPos = [this.toGridLoc(startY),this.toGridLoc(startX)];
    // let nextPos = [this.toGridLoc(startY),this.toGridLoc(startX)-1];
    // if(!this.game.validMove(startPos, nextPos)){
    //   return;
    // }
    startX-=10;
    var line = new createjs.Shape();
    this.drawLine(line, startX, startY);
    let i = 0;
    while(i<20){
      startX--;
      line.graphics.lineTo(startX, startY);
      i++;
    }
    line.graphics.endStroke();
    this.stage.update();
  }

  moveRight(startX, startY){
    // let startPos = [this.toGridLoc(startY),this.toGridLoc(startX)];
    // let nextPos = [this.toGridLoc(startY),this.toGridLoc(startX)+1];
    // if(!this.game.validMove(startPos, nextPos)){
    //   return;
    // }
    startX+=10;
    var line = new createjs.Shape();
    this.drawLine(line, startX, startY);
    let i = 0;
    while(i<20){
      startX++;
      line.graphics.lineTo(startX, startY);
      i++;
    }
    line.graphics.endStroke();
    this.stage.update();
  }

  clearLines() {
    this.lines.forEach(line =>{
      line.graphics.clear();
    });
    this.stage.update();
  }

  makeStage(){
    let col;
    let board = this;
    for(let row=0;row<this.grid.height;row++){
      for(col=0;col<this.grid.width;col++){
        board.makeCircle(row, col);
      }
    }
  }

}

module.exports = Board;
