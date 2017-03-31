const Board = require('./board');
class Game {
  constructor(){
    this.board = new Board(this);
    this.grid = this.board.grid;
    this.board.makeStage();
    this.lastMove = '';

    //CONTROLS
    let board = this.board;
    let game = this;
    window.onkeydown = function(e){
      if(board.grid.dropQueue.length !== 0){
        let circle = board.grid.dropQueue[0];
        switch(e.which){
            case 38:
              if (!game.validMove(circle.pos,[circle.pos[0]-1,circle.pos[1]],'up')){
                console.log('invalid move', circle.pos,[circle.pos[0]+1,circle.pos[1]],'up');
                break;
              }
              board.moveUp(circle.x,circle.y);
              board.grid.prependToDrop(board.grid.above(circle));
              game.lastMove = 'up';
              break;
            case 39:
              if (!game.validMove(circle.pos,[circle.pos[0],circle.pos[1]+1],'right')){
                console.log('invalid move', circle.pos,[circle.pos[0]+1,circle.pos[1]],'right');
                break;
              }
              board.moveRight(circle.x,circle.y);
              board.grid.prependToDrop(board.grid.rightOf(circle));
              game.lastMove = 'right';
              break;
            case 40:
              if (!game.validMove(circle.pos,[circle.pos[0]+1,circle.pos[1]],'down')){
                console.log('invalid move', circle.pos,[circle.pos[0]+1,circle.pos[1]],'down');
                break;
              }
              board.moveDown(circle.x,circle.y);
              board.grid.prependToDrop(board.grid.leftOf(circle));
              game.lastMove = 'down';
              break;
            case 37:
              if (!game.validMove(circle.pos,[circle.pos[0],circle.pos[1]-1],'left')){
                console.log('invalid move', circle.pos,[circle.pos[0]+1,circle.pos[1]],'left');
                break;
              }
              board.moveLeft(circle.x,circle.y);
              board.grid.prependToDrop(board.grid.below(circle));
              game.lastMove = 'left';
              break;
            case 13: //enter
              // debugger;
              board.grid.gridAction();
              board.clearLines();
              game.lastMove = '';
              // board.grid.dropQueue = [];
        }
      }
    }
  }

  color(circle){
    return circle.graphics._fill.style;
  }

  getGridPos(circle){
    let xPos = circle.gridPos.x;
    let yPos = circle.gridPos.y;
    return [xPos, yPos];
  }

  backTrace(move){
    switch(this.lastMove){
      case 'right':
        return move === 'left';
        break;
      case 'left':
        return move === 'right';
        break;
      case 'up':
        return move === 'down';
        break;
      case 'down':
        return move === 'up';
        break;
      default:
        return false;
    }
  }

  inBounds(pos){
    let [row, col] = pos;
    let [height, width] = [this.grid.height, this.grid.width];
    return !(row < 0 || row >= height || col < 0 || col >= width);
  }
  //check color match, bounds, already in queue...
  validMove(startPos, nextPos, move){
    let startCircle = this.grid.getCircleAt(startPos);
    let nextCircle = this.grid.getCircleAt(nextPos);
    return (this.inBounds(nextPos)
    && (this.color(startCircle) === this.color(nextCircle))
    && !this.backTrace(move));
    // && !this.grid.dropQueue.includes(nextCircle);
    //last cond needs to be changed for square rule
  }



}

module.exports = Game;

/* valid move logic
stage.getChildAt(0).graphics._fill.style===stage.getChildAt(3).graphics._fill.style
(checks color match)
*/
