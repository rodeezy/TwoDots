/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _animations = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = __webpack_require__(3);
var Game = __webpack_require__(1);

//consider making circle class
var Board = function () {
  //grid is 12x12
  function Board(game) {
    _classCallCheck(this, Board);

    this.stage = new createjs.Stage("Canvas");
    this.colors = ['#fecd6c', '#77c298', '#a4547d', '#e84d60', "DeepSkyBlue"];
    this.colorNames = { '#a4547d': 'purple', '#fecd6c': 'yellow',
      "DeepSkyBlue": 'blue', '#e84d60': 'red', '#77c298': 'green' };
    // this.circles = [];
    this.lines = [];
    this.grid = new Grid(this);
    this.game = game;
    this.validMove = this.game.validMove;
  }

  _createClass(Board, [{
    key: 'randColor',
    value: function randColor() {
      return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
  }, {
    key: 'isSelected',
    value: function isSelected() {
      return this.grid.dropQueue.length !== 0;
    }
  }, {
    key: 'makeCircle',
    value: function makeCircle(row, col) {
      var circle = this.grid.createCircle(row, col);
      // circle.x = xPos;
      // circle.y = yPos;

      // circle.addEventListener("mousedown",()=>{
      //   console.log('click!');
      //   if(!this.isSelected()){
      //     //add game logic and other logic
      //     this.grid.dropQueue.push(circle);
      //   }}
      // );
      //
      // this.stage.update();
    }
  }, {
    key: 'drawLine',
    value: function drawLine(line, startX, startY) {
      // debugger;
      this.stage.addChild(line);
      line.graphics.setStrokeStyle(3);
      line.graphics.beginStroke('grey');

      line.graphics.moveTo(startX, startY);
      this.lines.push(line);
    }

    //move[Direction] refers to line move

  }, {
    key: 'moveDown',
    value: function moveDown(startX, startY) {
      //can change numbers to attributes
      // let startPos = [this.toGridLoc(startY),this.toGridLoc(startX)];
      // let nextPos = [this.toGridLoc(startY)+1,this.toGridLoc(startX)];
      // if(!this.game.validMove(startPos, nextPos)){
      //   return;
      // }
      startY += 10;
      var line = new createjs.Shape();
      this.drawLine(line, startX, startY);
      var i = 0;
      while (i < 20) {
        startY++;
        line.graphics.lineTo(startX, startY);
        i++;
      }
      line.graphics.endStroke();
      this.stage.update();
    }
  }, {
    key: 'toGridLoc',
    value: function toGridLoc(pos) {
      return pos / 40 - 1;
    }
  }, {
    key: 'moveUp',
    value: function moveUp(startX, startY) {
      // let startPos = [this.toGridLoc(startY),this.toGridLoc(startX)];
      // let nextPos = [this.toGridLoc(startY)-1,this.toGridLoc(startX)];
      // if(!this.game.validMove(startPos, nextPos)){
      //   return;
      // }
      startY -= 10;
      var line = new createjs.Shape();
      this.drawLine(line, startX, startY);
      var i = 0;
      while (i < 20) {
        startY--;
        line.graphics.lineTo(startX, startY);
        i++;
      }
      line.graphics.endStroke();
      this.stage.update();
    }
  }, {
    key: 'moveLeft',
    value: function moveLeft(startX, startY) {
      // let startPos = [this.toGridLoc(startY),this.toGridLoc(startX)];
      // let nextPos = [this.toGridLoc(startY),this.toGridLoc(startX)-1];
      // if(!this.game.validMove(startPos, nextPos)){
      //   return;
      // }
      startX -= 10;
      var line = new createjs.Shape();
      this.drawLine(line, startX, startY);
      var i = 0;
      while (i < 20) {
        startX--;
        line.graphics.lineTo(startX, startY);
        i++;
      }
      line.graphics.endStroke();
      this.stage.update();
    }
  }, {
    key: 'moveRight',
    value: function moveRight(startX, startY) {
      // let startPos = [this.toGridLoc(startY),this.toGridLoc(startX)];
      // let nextPos = [this.toGridLoc(startY),this.toGridLoc(startX)+1];
      // if(!this.game.validMove(startPos, nextPos)){
      //   return;
      // }
      startX += 10;
      var line = new createjs.Shape();
      this.drawLine(line, startX, startY);
      var i = 0;
      while (i < 20) {
        startX++;
        line.graphics.lineTo(startX, startY);
        i++;
      }
      line.graphics.endStroke();
      this.stage.update();
    }
  }, {
    key: 'clearLines',
    value: function clearLines() {
      this.lines.forEach(function (line) {
        line.graphics.clear();
      });
      this.stage.update();
    }
  }, {
    key: 'makeStage',
    value: function makeStage() {
      var col = void 0;
      var board = this;
      for (var row = 0; row < this.grid.height; row++) {
        for (col = 0; col < this.grid.width; col++) {
          board.makeCircle(row, col);
        }
      }
    }
  }]);

  return Board;
}();

module.exports = Board;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _animations = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = __webpack_require__(0);
var HtmlUpdate = __webpack_require__(2);

var Game = function () {
  function Game(difficulty) {
    _classCallCheck(this, Game);

    this.board = new Board(this);
    this.grid = this.board.grid;
    this.board.makeStage();
    this.lastMove = '';
    this.colorsDown = { 'red': 0, 'green': 0, 'blue': 0, 'yellow': 0, 'purple': 0 };
    this.difficultyCount = { hard: 50, medium: 40, easy: 30 };
    this.count = this.difficultyCount[difficulty];
    this.difficultyMoves = { hard: 20, medium: 25, easy: 30 };
    window.difficulty = difficulty;
    window.difficultyMoves = this.difficultyMoves;
    this.totalMoves = this.difficultyMoves[difficulty];
    this.movesMade = 0;
    this.htmlUpdate = new HtmlUpdate(this);
    //CONTROLS
    var board = this.board;
    var game = this;
    window.onkeydown = function (e) {
      if (board.grid.dropQueue.length !== 0) {
        var circle = board.grid.dropQueue[0];
        switch (e.which) {
          case 38:
            if (!game.validMove(circle.pos, [circle.pos[0] - 1, circle.pos[1]], 'up')) {
              // console.log('invalid move', circle.pos,[circle.pos[0]+1,circle.pos[1]],'up');
              break;
            }
            board.moveUp(circle.x, circle.y);
            board.grid.prependToDrop(board.grid.above(circle));
            (0, _animations.colorAnimate)(board.grid.above(circle), board.stage);
            game.lastMove = 'up';
            break;
          case 39:
            if (!game.validMove(circle.pos, [circle.pos[0], circle.pos[1] + 1], 'right')) {
              // console.log('invalid move', circle.pos,[circle.pos[0]+1,circle.pos[1]],'right');
              break;
            }
            board.moveRight(circle.x, circle.y);
            board.grid.prependToDrop(board.grid.rightOf(circle));
            (0, _animations.colorAnimate)(board.grid.rightOf(circle), board.stage);
            game.lastMove = 'right';
            break;
          case 40:
            if (!game.validMove(circle.pos, [circle.pos[0] + 1, circle.pos[1]], 'down')) {
              // console.log('invalid move', circle.pos,[circle.pos[0]+1,circle.pos[1]],'down');
              break;
            }
            board.moveDown(circle.x, circle.y);
            board.grid.prependToDrop(board.grid.leftOf(circle));
            (0, _animations.colorAnimate)(board.grid.leftOf(circle), board.stage);
            game.lastMove = 'down';
            break;
          case 37:
            if (!game.validMove(circle.pos, [circle.pos[0], circle.pos[1] - 1], 'left')) {
              // console.log('invalid move', circle.pos,[circle.pos[0]+1,circle.pos[1]],'left');
              break;
            }
            board.moveLeft(circle.x, circle.y);
            board.grid.prependToDrop(board.grid.below(circle));
            (0, _animations.colorAnimate)(board.grid.below(circle), board.stage);
            game.lastMove = 'left';
            break;
          case 13:
            //enter
            var _board$grid$gridActio = board.grid.gridAction(),
                _board$grid$gridActio2 = _slicedToArray(_board$grid$gridActio, 2),
                dropColor = _board$grid$gridActio2[0],
                dropCount = _board$grid$gridActio2[1];

            console.log(dropColor);
            board.clearLines();
            game.lastMove = '';
            game.colorsDown[board.colorNames[dropColor]] += dropCount;
            game.movesMade += 1;
            game.htmlUpdate.update();
            if (!game.checkWin()) {
              game.checkLose();
            };

          // board.grid.dropQueue = [];
        }
      }
    };
  }

  _createClass(Game, [{
    key: 'checkWin',
    value: function checkWin() {
      var _this = this;

      var won = true;
      Object.values(this.colorsDown).forEach(function (count) {
        if (count < _this.count) {
          won = false;
        }
      });
      if (won) {
        this.htmlUpdate.displayWin();
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'checkLose',
    value: function checkLose() {
      if (this.movesMade < this.totalMoves) {
        return false;
      } else {
        this.htmlUpdate.displayLose();
        return true;
      }
    }
  }, {
    key: 'color',
    value: function color(circle) {
      return circle.graphics._fill.style;
    }
  }, {
    key: 'getGridPos',
    value: function getGridPos(circle) {
      var xPos = circle.gridPos.x;
      var yPos = circle.gridPos.y;
      return [xPos, yPos];
    }
  }, {
    key: 'backTrace',
    value: function backTrace(move) {
      switch (this.lastMove) {
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
  }, {
    key: 'inBounds',
    value: function inBounds(pos) {
      var _pos = _slicedToArray(pos, 2),
          row = _pos[0],
          col = _pos[1];

      var _ref = [this.grid.height, this.grid.width],
          height = _ref[0],
          width = _ref[1];

      return !(row < 0 || row >= height || col < 0 || col >= width);
    }
    //check color match, bounds, already in queue...

  }, {
    key: 'validMove',
    value: function validMove(startPos, nextPos, move) {
      var startCircle = this.grid.getCircleAt(startPos);
      var nextCircle = this.grid.getCircleAt(nextPos);
      return this.inBounds(nextPos) && this.color(startCircle) === this.color(nextCircle) && !this.backTrace(move);
      // && !this.grid.dropQueue.includes(nextCircle);
      //last cond needs to be changed for square rule
    }
  }]);

  return Game;
}();

module.exports = Game;

/* valid move logic
stage.getChildAt(0).graphics._fill.style===stage.getChildAt(3).graphics._fill.style
(checks color match)
*/

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HtmlUpdate = function () {
  function HtmlUpdate(game) {
    _classCallCheck(this, HtmlUpdate);

    this.game = game;
    this.info = document.createElement('div');
    this.setup(game);
  }

  _createClass(HtmlUpdate, [{
    key: 'setup',
    value: function setup(game) {
      var _this = this;

      var diff = game.difficulty;
      this.info.id = 'info';
      this.moveHeader = document.createElement('h2');
      this.moveText = document.createTextNode(game.movesMade + '/' + game.totalMoves + ' moves left');
      this.moveHeader.id = 'moveHeader';
      this.body = document.getElementsByTagName('body')[0];
      this.body.appendChild(this.info);
      this.info.appendChild(this.moveHeader);
      this.moveHeader.appendChild(this.moveText);

      // colors
      this.colors = game.colorsDown;
      this.colorHeader = document.createElement('div');
      this.colorHeader.id = 'colorHeader';
      var colorP = void 0;
      Object.keys(this.colors).forEach(function (color) {
        colorP = document.createTextNode(color + ': ' + _this.colors[color] + '/' + game.count);
        _this.colorHeader.appendChild(colorP);
        _this.colorHeader.appendChild(document.createElement('br'));
      });
      this.body.appendChild(this.colorHeader);
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      document.getElementById('moveHeader').innerHTML = this.game.movesMade + '/' + this.game.totalMoves + ' moves left';
      var colorP = void 0;
      var colorHeader = document.getElementById('colorHeader');
      colorHeader.innerHTML = '';
      Object.keys(this.colors).forEach(function (color) {
        colorP = document.createTextNode(color + ': ' + _this2.colors[color] + '/' + _this2.game.count);
        colorHeader.appendChild(colorP);
        colorHeader.appendChild(document.createElement('br'));
      });
    }
  }, {
    key: 'displayWin',
    value: function displayWin() {
      var h1 = document.getElementsByTagName('h1')[0];
      h1.innerHTML = 'You Win!';
    }
  }, {
    key: 'displayLose',
    value: function displayLose() {
      var h1 = document.getElementsByTagName('h1')[0];
      h1.innerHTML = 'You Lose!';
    }
  }]);

  return HtmlUpdate;
}();

module.exports = HtmlUpdate;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _animations = __webpack_require__(5);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = __webpack_require__(0);

//consider changing names to avoid "Board.grid.grid"
var Grid = function () {
  function Grid(board) {
    var _this = this;

    _classCallCheck(this, Grid);

    this.width = 12;
    this.height = 12;
    this.spacing = 40;
    this.circleRadius = 10;
    this.coloredCircles = { '#fecd6c': [], '#77c298': [], '#a4547d': [], '#e84d60': [], "DeepSkyBlue": [] };
    this.grid = [].concat(_toConsumableArray(Array(this.height).keys())).map(function (i) {
      return Array(_this.width);
    });
    this.dropQueue = [];
    //sort drop Queue appropriately before drop
    this.board = board;
    this.stage = board.stage;
    this.squareColor = '';
    //prob only keep one of above two lines
  }

  _createClass(Grid, [{
    key: 'fallAnimation',
    value: function fallAnimation(circle) {
      createjs.Tween.get(circle).to({ y: circle.y + this.spacing }, 250);
      createjs.Ticker.setFPS(60);
      createjs.Ticker.addEventListener("tick", this.stage);
    }
  }, {
    key: 'columnFallAnimation',
    value: function columnFallAnimation(circle) {}

    //think about where to throw stage.update()'s

  }, {
    key: 'createCircle',
    value: function createCircle(row, col) {
      var _this2 = this;

      var circle = new createjs.Shape();
      //this.setFallAnimation(circle);
      circle.pos = [row, col];
      this.pushAt(circle, row, col);
      this.updateGridPos(circle, row, col);
      var circleColor = this.board.randColor();

      circle.graphics.beginFill(circleColor).drawCircle(0, 0, this.circleRadius);
      //consider diff place to import color from
      this.mapCircletoStage(circle);
      this.stage.addChild(circle);
      //circle.stageId = this.stage.children.length - 1;

      circle.addEventListener("mousedown", function () {
        // console.log(this.color(circle));
        if (_this2.dropQueue.length === 0) {
          //add game logic and other logic
          _this2.prependToDrop(circle);
          (0, _animations.colorAnimate)(circle, _this2.stage);
        }
      });

      this.stage.update();

      return circle;
    }
  }, {
    key: 'mapCircletoStage',
    value: function mapCircletoStage(circle) {
      var xPos = (circle.gridPos.col + 1) * this.spacing;
      var yPos = (circle.gridPos.row + 1) * this.spacing;
      circle.x = xPos;
      circle.y = yPos;
      this.stage.update();
    }
  }, {
    key: 'mapGridtoStage',
    value: function mapGridtoStage() {
      var _this3 = this;

      function flatten(arr) {
        return [].concat.apply([], arr);
      }
      this.grid.flatten.forEach(function (circle) {
        return _this3.mapCircletoStage(circle);
      });
    }

    //accepts 1 arg as coord array or 2 args as coords

  }, {
    key: 'getCircleAt',
    value: function getCircleAt(pos) {
      var _pos = _slicedToArray(pos, 2),
          row = _pos[0],
          col = _pos[1];

      return this.grid[row][col];
    }

    // SINGLE DOT LIFE CYCLE

  }, {
    key: 'remove',
    value: function remove(row, col) {
      // debugger;
      var circle = this.grid[row][col];
      this.stage.removeChild(circle);
      //consider implement of removeChildAt for speed (poss mem tradeoff by assigning attr)
      this.grid[row][col] = "NULL";
    }
  }, {
    key: 'add',
    value: function add(col) {
      // debugger;

      //insert new animation
      var circle = this.createCircle(0, col);
      this.grid[0][col] = circle;
      this.updateGridPos(circle, 0, col);
    }

    //move circ at row,col to row+1,col (row+1 here is row in (add and) remove)

  }, {
    key: 'moveDown',
    value: function moveDown(row, col) {
      // debugger;

      //insert animation
      var circle = this.grid[row][col];
      this.grid[row + 1][col] = circle;
      // this.fallAnimation(circle);
      this.stage.update();
      this.updateGridPos(circle, row + 1, col);
      this.mapCircletoStage(circle, row + 1, col);
    }

    //remove sequence

  }, {
    key: 'dotAction',
    value: function dotAction(row, col) {
      // debugger;
      this.remove(row, col);
      this.columnFall(row - 1, col);
      this.add(col);
    }
    // END SINGLE DOT LIFE CYCLE

  }, {
    key: 'columnFall',
    value: function columnFall(row, col) {
      if (row < 0) {
        return;
      } else {
        this.moveDown(row, col);
        // this.fallAnimation(this.getCircleAt(row,col));
        this.columnFall(row - 1, col);
      }
    }
    //loop dotAction appropriately

  }, {
    key: 'gridAction',
    value: function gridAction() {
      var _this4 = this;

      if (this.squareColor) {
        this.grid.forEach(function (row) {
          return row.forEach(function (circle) {
            if (_this4.color(circle) === _this4.squareColor) {
              _this4.prependToDrop(circle);
            }
          });
        });
      }
      this.sortDropQueue();
      var output = [this.squareColor || this.color(this.dropQueue[0]), this.dropQueue.length];
      this.dropQueue.forEach(function (circle) {
        return _this4.dotAction(circle.gridPos.row, circle.gridPos.col);
      });
      this.dropQueue = [];
      this.squareColor = '';
      return output;
    }
  }, {
    key: 'updateGridPos',
    value: function updateGridPos(circle, row, col) {
      circle.gridPos = { 'row': row, 'col': col };
      circle.pos = [row, col];
    }
  }, {
    key: 'sortDropQueue',
    value: function sortDropQueue() {
      function compare(a, b) {
        if (a.gridPos.row < b.gridPos.row) {
          return -1;
        }
        if (a.gridPos.row > b.gridPos.row) {
          return 1;
        }
        return 0;
      }
      this.dropQueue.sort(compare);
    }
  }, {
    key: 'color',
    value: function color(circle) {
      return circle.graphics._fill.style;
    }

    //push to dropQueue

  }, {
    key: 'prependToDrop',
    value: function prependToDrop(circle) {
      //colorAnimate(circle, this.stage);
      if (this.dropQueue.includes(circle)) {
        this.squareColor = this.color(circle);
      } else {
        this.dropQueue.unshift(circle);
      }
    }
  }, {
    key: 'pushAt',
    value: function pushAt(circle, row, col) {
      this.grid[row][col] = circle;
    }

    //POSITION HELPERS

  }, {
    key: 'above',
    value: function above(circle) {
      return this.grid[circle.gridPos.row - 1][circle.gridPos.col];
    }
  }, {
    key: 'leftOf',
    value: function leftOf(circle) {
      return this.grid[circle.gridPos.row + 1][circle.gridPos.col];
    }
  }, {
    key: 'below',
    value: function below(circle) {
      return this.grid[circle.gridPos.row][circle.gridPos.col - 1];
    }
  }, {
    key: 'rightOf',
    value: function rightOf(circle) {
      return this.grid[circle.gridPos.row][circle.gridPos.col + 1];
    }
    //END POSITION HELPERS

  }]);

  return Grid;
}();

module.exports = Grid;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var spaget = function spaget() {
  return console.log('spaghet');
};
var Game = __webpack_require__(1);
var Board = __webpack_require__(0);
var HtmlUpdate = __webpack_require__(2);

document.addEventListener('DOMContentLoaded', function () {
  var game = new Game('medium');
  window.canvas = document.getElementById('Canvas');
  // window.makeCircle = board.makeCircle.bind(board);
  window.board = game.board;

  // moveCircle(circle);
  // window.circle = circle;
  // window.moveCircle = moveCircle;
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var colorAnimate = exports.colorAnimate = function colorAnimate(circle, stage) {
    var filter = new createjs.ColorFilter(1, 1.5, 1, 1);
    circle.filters = [filter];
    circle.cache(-20, -20, 40, 40);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function (event) {
        //console.log('tick');
        circle.updateCache();
        stage.update(event);
    });

    var tween = createjs.Tween.get(filter, { loop: true }).to({ redMultiplier: 0, greenMultiplier: .7 }, 1000).to({ redMultiplier: 1, greenMultiplier: 1.5 }, 1000);
};

//loop on attribute to reduce memory fuck up

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map