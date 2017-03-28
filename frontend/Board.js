class Board {
  constructor() {
    this.canvas = document.getElementById('Canvas');
    this.stage = new createjs.Stage("Canvas");
    this.colors = ['#fecd6c', '#77c298', '#a4547d', '#e84d60', "DeepSkyBlue"]
  }

  randColor(){
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  makeCircle(xPos, yPos) {
    var circle = new createjs.Shape();
    circle.graphics.beginFill(this.randColor()).drawCircle(0, 0, 10);
    circle.x = xPos;
    circle.y = yPos;
    this.stage.addChild(circle);
    this.stage.update();
  }

  makeStage(){
    for(let i=0;i<this.canvas.width;i+=10){
      this.makeCircle(i, i);
    }
  }
}

module.exports = Board;
