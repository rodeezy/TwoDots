const spaget = () => console.log('spaghet');
const Board = require('./board');
const Game = require('./game');


document.addEventListener('DOMContentLoaded', ()=>{
  let board = new Board();
  board.makeStage();
  window.canvas = document.getElementById('Canvas');
  // window.makeCircle = board.makeCircle.bind(board);
  window.board=board;

  // moveCircle(circle);
  // window.circle = circle;
  // window.moveCircle = moveCircle;
});
