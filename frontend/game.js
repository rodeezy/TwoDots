const Board = require('./board');
class Game {
  constructor(){
    this.board = new Board();
  }
}

module.exports = Game;

/* valid move logic
stage.getChildAt(0).graphics._fill.style===stage.getChildAt(3).graphics._fill.style
(checks color match)
*/
