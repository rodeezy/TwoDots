const spaget = () => console.log('spaghet');
const Game = require('./game');
const Board = require('./board');


document.addEventListener('DOMContentLoaded', ()=>{
  let game = new Game();
  window.canvas = document.getElementById('Canvas');
  // window.makeCircle = board.makeCircle.bind(board);
  window.board=game.board;

  // moveCircle(circle);
  // window.circle = circle;
  // window.moveCircle = moveCircle;
});
