//grid is 12x12
class Board {
  constructor() {
    this.canvas = document.getElementById('Canvas');
    this.stage = new createjs.Stage("Canvas");
    this.colors = ['#fecd6c', '#77c298', '#a4547d', '#e84d60', "DeepSkyBlue"]
    this.circles = [];
    this.lines = [];
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

  dropCircles(){
    this.lines.forEach(line =>{
      line.graphics.clear();
    });

    this.circles.forEach(circle =>{
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
