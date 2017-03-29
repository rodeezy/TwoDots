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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var spaget = function spaget() {
  return console.log('spaghet');
};
var Board = __webpack_require__(2);
var Game = __webpack_require__(3);

document.addEventListener('DOMContentLoaded', function () {
  window.spaget = spaget;
  var board = new Board();
  board.makeStage();
  window.canvas = document.getElementById('Canvas');
  window.makeCircle = board.makeCircle.bind(board);
  window.board = board;

  // init();
});

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//grid is 12x12
var Board = function () {
  function Board() {
    _classCallCheck(this, Board);

    this.canvas = document.getElementById('Canvas');
    this.stage = new createjs.Stage("Canvas");
    this.colors = ['#fecd6c', '#77c298', '#a4547d', '#e84d60', "DeepSkyBlue"];
    this.circles = [];
    this.lines = [];
  }

  _createClass(Board, [{
    key: 'randColor',
    value: function randColor() {
      return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
  }, {
    key: 'isSelected',
    value: function isSelected() {
      return this.circles.length !== 0;
    }
  }, {
    key: 'makeCircle',
    value: function makeCircle(xPos, yPos) {
      var _this = this;

      var circle = new createjs.Shape();
      circle.graphics.beginFill(this.randColor()).drawCircle(0, 0, 10);
      circle.x = xPos;
      circle.y = yPos;
      this.stage.addChild(circle);
      circle.addEventListener("mousedown", function () {
        if (!_this.isSelected()) {
          _this.circles.push(circle);
        }
      });
      this.stage.update();
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
  }, {
    key: 'moveDown',
    value: function moveDown(startX, startY) {
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
    key: 'moveUp',
    value: function moveUp(startX, startY) {
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
    key: 'dropCircles',
    value: function dropCircles() {
      this.lines.forEach(function (line) {
        line.graphics.clear();
      });

      this.circles.forEach(function (circle) {
        circle.graphics.clear();
      });

      this.stage.update();
    }
  }, {
    key: 'makeStage',
    value: function makeStage() {
      var i = void 0;
      var board = this;
      for (var j = 40; j < this.canvas.height; j += 40) {
        for (i = 40; i < this.canvas.width; i += 40) {
          board.makeCircle(i, j);
        }
      }
      window.onkeydown = function (e) {
        if (board.circles.length !== 0) {
          var circle = board.circles[0];
          switch (e.which) {
            case 38:
              board.moveUp(circle.x, circle.y);
              board.circles.unshift(board.stage.getChildAt(circle.id - 13));
              break;
            case 39:
              board.moveRight(circle.x, circle.y);
              board.circles.unshift(board.stage.getChildAt(circle.id));
              break;
            case 40:
              board.moveDown(circle.x, circle.y);
              board.circles.unshift(board.stage.getChildAt(circle.id + 11));
              break;
            case 37:
              board.moveLeft(circle.x, circle.y);
              board.circles.unshift(board.stage.getChildAt(circle.id - 2));
              break;
            case 13:
              //enter
              board.dropCircles();
              board.circles = [];
          }
        }
      };
    }
  }]);

  return Board;
}();

module.exports = Board;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = __webpack_require__(2);

var Game = function Game() {
  _classCallCheck(this, Game);

  this.board = new Board();
};

module.exports = Game;

/* valid move logic
stage.getChildAt(0).graphics._fill.style===stage.getChildAt(3).graphics._fill.style
(checks color match)
*/

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map