const spaget = () => console.log('spaghet');
const Board = require('./board');
const Game = require('./game');

document.addEventListener('DOMContentLoaded', ()=>{
  window.spaget = spaget;
  let board = new Board();
  board.makeStage();
  window.canvas = document.getElementById('Canvas');
  window.makeCircle = board.makeCircle.bind(board);
  window.board=board;

  // init();
});
