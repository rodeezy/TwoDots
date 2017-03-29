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

  moveCircle(circle) {
    createjs.Tween.get(circle)
      // .to({x: 400}, 1000, createjs.Ease.getPowInOut(4))
      .to({y: circle.y + 40}, 250)
      // .to({alpha: 0, y: 125}, 100)
      // .to({alpha: 1, y: 100}, 500, createjs.Ease.getPowInOut(2))
      // .to({x: 100}, 800, createjs.Ease.getPowInOut(2));
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", this.stage);
  }

  dropCircles(){
    const board = this;
    this.lines.forEach(line =>{
      line.graphics.clear();
    });

    this.circles.forEach(circle =>{
      this.moveCircle(board.stage.getChildAt(circle.id-13));
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
