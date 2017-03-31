const spaget = () => console.log('spaghet');
const Game = require('./game');
const Board = require('./board');
const HtmlUpdate = require('./html_update');


document.addEventListener('DOMContentLoaded', ()=>{
  let game = new Game('medium');
  window.canvas = document.getElementById('Canvas');
  // window.makeCircle = board.makeCircle.bind(board);
  window.board=game.board;

  // moveCircle(circle);
  // window.circle = circle;
  // window.moveCircle = moveCircle;
});
