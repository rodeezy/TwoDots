//grid is 12x12
class Board {
  constructor(game) {
    this.canvas = document.getElementById('Canvas');
    this.stage = new createjs.Stage("Canvas");
    this.colors = ['#fecd6c', '#77c298', '#a4547d', '#e84d60', "DeepSkyBlue"]
    this.circles = [];
    this.lines = [];
    this.posGrid = [[]];
    this.grid = [[]];
  }

  randColor(){
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  isSelected(){
    return this.circles.length !== 0;
  }

  makeCircle(xPos, yPos) {
    var circle = new createjs.Shape();
    circle.graphics.beginFill(this.randColor()).drawCircle(0, 0, 10);
    circle.x = xPos;
    circle.y = yPos;
    this.stage.addChild(circle);
    circle.addEventListener("mousedown",()=>{
      console.log(circle.id);
      if(!this.isSelected()){
        this.circles.push(circle);
      }
      }
    );

    this.stage.update();
  }

  drawLine(line, startX, startY) {
    // debugger;
    this.stage.addChild(line);
    line.graphics.setStrokeStyle(3);
    line.graphics.beginStroke('grey');

    line.graphics.moveTo(startX, startY);
    this.lines.push(line);
  }

  moveDown(startX, startY){
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

  moveUp(startX, startY){
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

  moveCircle(circle) {
    createjs.Tween.get(circle)
      .to({y: circle.y + 40}, 250)
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", this.stage);
    // this.stage.swapChildrenAt(circle.id - 1, circle.id + 11);

  }

  genCircles(){

  }

  circleAbove(circle){
    return this.stage.getChildAt(circle.id-13);
  }

  moveCircleColumn(circle){
    // debugger;
    if(!circle){
      return;
    }
    this.moveCircle(circle);
    this.stage.swapChildrenAt(circle.id - 1, circle.id - 13);
    if (circle.y === 40){
      this.makeCircle(circle.x, 40);
      this.stage.swapChildrenAt(this.stage.getChildAt(this.stage.children.length - 1), this.stage.getChildAt(circle.id - 1));
      return;
    }
    else{
      this.moveCircleColumn(this.circleAbove(circle));
    }
  }

  dropCircles(){
    const board = this;
    this.lines.forEach(line =>{
      line.graphics.clear();
    });
    this.circles.forEach(circle =>{
      board.moveCircleColumn(board.stage.getChildAt(circle.id-13));
      // board.stage.swapChildrenAt(circle.id - 1, circle.id - 13);
      circle.graphics.clear();
    });
    this.stage.update();
  }

  makeStage(){
    let i;
    let board = this;
    for(let j=40;j<this.canvas.height;j+=40){
      for(i=40;i<this.canvas.width;i+=40){
        board.makeCircle(i, j);

      }
    }
    window.onkeydown = function(e){
      if(board.circles.length !== 0){
        let circle = board.circles[0];
        switch(e.which){
            case 38:
              board.moveUp(circle.x,circle.y);
              board.circles.unshift(board.stage.getChildAt(circle.id-13));
              break;
            case 39:
              board.moveRight(circle.x,circle.y);
              board.circles.unshift(board.stage.getChildAt(circle.id));
              break;
            case 40:
              board.moveDown(circle.x,circle.y);
              board.circles.unshift(board.stage.getChildAt(circle.id+11));
              break;
            case 37:
              board.moveLeft(circle.x,circle.y);
              board.circles.unshift(board.stage.getChildAt(circle.id-2));
              break;
            case 13: //enter
              board.dropCircles();
              board.circles = [];
        }
      }
    }
  }
}

module.exports = Board;
