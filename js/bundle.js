/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const soundChomp = new Audio('./assets/pacman_chomp.wav');
const soundEatFruit = new Audio('./assets/pacman_eatfruit.wav');
const soundEatGhost = new Audio('./assets/pacman_eatghost.wav');
const soundDeath = new Audio('./assets/pacman_death.wav');
const soundBeginning = new Audio('./assets/pacman_beginning.wav');

const playSound = (volume=true,sound) =>{
  if (volume) {
    switch (sound) {
      case 'chomp':
        soundChomp.play();
        break;
      case 'eatfruit':
        soundEatFruit.play();
        break;
      case 'eatghost':
        soundEatGhost.play();
        break;
      case 'death':
        soundDeath.play();
        break;
      case 'beginning':
        soundBeginning.play();
    }
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = playSound;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const randomNumber = n => {
  return Math.floor(Math.random()*n);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = randomNumber;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sounds_js__ = __webpack_require__(0);



const game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */]();

document.addEventListener('DOMContentLoaded', () =>{
  document.getElementById('root').appendChild(game.canvas);
});

document.addEventListener('keydown', (e)=>{
  game.keyClick[e.keyCode]=true;
  game.move(game.keyClick);
  game.togglePause(e.keyCode);
},false);


document.addEventListener('keyup', (e)=>{
  delete game.keyClick[e.keyCode];
},false);


 document.volumeClick = () =>{
  const volume = document.getElementById('volume');
  if (game.isVolume) {
    volume.classList.remove("ion-android-volume-up");
    volume.classList.add("ion-android-volume-off");
  } else {
    volume.classList.remove("ion-android-volume-off");
    volume.classList.add("ion-android-volume-up");
  }
  game.isVolume = !game.isVolume;
};

 document.clickPlay = () => {
  if (game.isGameOver){
    game.gscore = 0;
    game.score = 0;
    game.isGameOver = false;
    game.isStart = true;
  }
    if (game.isPaused){
      game.isPaused = false; 
      game.playGame();
    }
};

document.clickPause = () => {
  if (!game.isPaused){
    game.isPaused = true; 
    game.playGame();
  }
};
  
  document.resetGame = () => {
    game.gscore = 0;
    game.score = 0;
    game.isGameOver = false;
    game.isStart = true;
    game.isPaused = true;
    Object(__WEBPACK_IMPORTED_MODULE_1__sounds_js__["a" /* playSound */])(game.isVolume,'beginning');
    game.render();
  };


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sounds_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_objects__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_js__ = __webpack_require__(1);




class Game {
  constructor(volume=true) {
    this.render = this.render.bind(this);
    this.playGame = this.playGame.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.isPaused = true;
    this.isStart = true;
    this.isGameOver = false;
    this.isVolume = volume;
    this.score = 0;
    this.gscore = 0; 
    this.ghost = false;
    this.keyClick = {};
    this.loadGame();
    this.createCanvas();
    this.canvas.height = 400;
    this.canvas.width = 600;
    }
  
  
  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.height = 400;
    this.canvas.width = 600;
    this.context = this.canvas.getContext("2d");
    this.context.fillStyle = "black";
    this.context.fillRect(0,0,this.canvas.width, this.canvas.height);
    this.context.font = '20px Verdana';
    this.context.fillStyle = '#fff';
    this.context.fillText('Pacman: ' + this.score + 
    ' Ghost: ' + this.gscore, 2,18 );
  }
  
   move(keyObject){

    if (37 in keyObject) {
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].X -= __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].speed; __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].imgPositionY = 64;
    }
    if (38 in keyObject) {
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].Y -= __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].speed; __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].imgPositionY = 96;
    }
    if (39 in keyObject) {
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].X += __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].speed; __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].imgPositionY = 0;
    }
    if (40 in keyObject) {
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].Y += __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].speed; __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].imgPositionY = 32;
    }
    if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].X >= (this.canvas.width-32)) {
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].X = 0;
    }
    if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].Y >= (this.canvas.height-32)) {
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].Y = 0;
    }
    if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].X < 0) {
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].X = (this.canvas.width - 32);
    }
    if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].Y < 0) {
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].Y = (this.canvas.height - 32);
    }
    
    if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].imgPositionX === 320)  {
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].imgPositionX = 352;
    } else {
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].imgPositionX = 320;
    }
    // this.render();
  }
  
  togglePause(key){
    if (key === 32) {
      if (this.isGameOver){
        this.gscore = 0;
        this.score = 0;
        this.isGameOver = false;
        this.isStart = true;
      } else {
        this.isStart = false;
        this.isPaused = ! this.isPaused;
        this.playGame();        
      }
    }
  }
  
  playGame() {
    this.render();
    if (!this.isPaused) {
      requestAnimationFrame(this.playGame);
    } else {
      cancelAnimationFrame(this.playGame);
    }
  }
  
  loadGame(){
    this.mainImage = new Image();
    this.mainImage.src = "./assets/pac.png";
    this.mainImage.onload = () => {
      this.render();
    };
    Object(__WEBPACK_IMPORTED_MODULE_0__sounds_js__["a" /* playSound */])(this.isVolume,'beginning');
  }
  
  drawPacman() {
    this.context.drawImage(
      this.mainImage,
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].imgPositionX,
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].imgPositionY,
      32,
      32,
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].X,
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].Y,
      32,
      32
    );
  }
  
  drawEnemy(){
    this.context.drawImage(
      this.mainImage,
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].ghostNum,
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].flash,
      32,
      32,
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].X,
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].Y,
      32,
      32
    );
  }
  
  setupPowerball(){
    if (! __WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].visible && __WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].pcountdown < 5) {
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].X = Object(__WEBPACK_IMPORTED_MODULE_2__utils_js__["a" /* randomNumber */])(420) + 30;
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].Y = Object(__WEBPACK_IMPORTED_MODULE_2__utils_js__["a" /* randomNumber */])(250) + 30;
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].visible = true;
    }
  }
  
  drawPowerball(){
    if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].visible) {
      this.context.fillStyle = "#fff";
      this.context.beginPath();
      this.context.arc(__WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].X,__WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].Y, 10, 0, Math.PI * 2, true);
      this.context.closePath();
      this.context.fill();
    }
  }
  
  generateEnemyMovements(){
    if(__WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].movingTime < 0) {
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].movingTime = (Object(__WEBPACK_IMPORTED_MODULE_2__utils_js__["a" /* randomNumber */]) (20) * 3) + Object(__WEBPACK_IMPORTED_MODULE_2__utils_js__["a" /* randomNumber */])(1);
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].speed = Object(__WEBPACK_IMPORTED_MODULE_2__utils_js__["a" /* randomNumber */]) (3) + 1 ;
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].dirX = 0;
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].dirY = 0;
      
      if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].ghostEat) {
        __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].speed = __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].speed * -1;
      }
      
      if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].movingTime % 2) {
        if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].X < __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].X) {
          __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].dirX = -__WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].speed;
        } else {
          __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].dirX = __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].speed;
        }
      } else {
        if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].Y < __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].Y) {
          __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].dirY = -__WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].speed;
        } else {
          __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].dirY = __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].speed;
        }
      }
    }
    __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].movingTime--;
    __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].X = __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].X + __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].dirX;
    __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].Y = __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].Y + __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].dirY;
    
    if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].X >= (this.canvas.width-32)) {
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].X = 0;
    }
    if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].Y >= (this.canvas.height-32)) {
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].Y = 0;
    }
    if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].X < 0) {
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].X = (this.canvas.width - 32);
    }
    if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].Y < 0) {
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].Y = (this.canvas.height - 32);
    }
  }
  
  detectEnemyCollision() {
    if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].X <= (__WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].X + 26) && 
        __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].X <= (__WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].X + 26) && 
        __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].Y <= (__WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].Y + 26) && 
        __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].Y <= (__WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].Y + 32)
      ) {
          if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].ghostEat) {
            this.score++;
            Object(__WEBPACK_IMPORTED_MODULE_0__sounds_js__["a" /* playSound */])(this.isVolume,'eatghost');
          } else {
            this.gscore++;
            Object(__WEBPACK_IMPORTED_MODULE_0__sounds_js__["a" /* playSound */])(this.isVolume,'death');
          }
          __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].X = Object(__WEBPACK_IMPORTED_MODULE_2__utils_js__["a" /* randomNumber */])(100)+50;
          __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].Y = Object(__WEBPACK_IMPORTED_MODULE_2__utils_js__["a" /* randomNumber */])(200)+50;
          __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].X = Object(__WEBPACK_IMPORTED_MODULE_2__utils_js__["a" /* randomNumber */])(200)+30;
          __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].Y = Object(__WEBPACK_IMPORTED_MODULE_2__utils_js__["a" /* randomNumber */])(300)+30;
          // Powerball.ghostEat = false;
          __WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].pcountdown = 0;
        }
        if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].flash === 0){
          __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].flash = 32;
        } else {
          __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].flash = 0;
        }  
  }
  
  detectPowerballCollision() {
    if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].X <= (__WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].X) && 
        __WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].X <= (__WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].X + 32) && 
        __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].Y <= (__WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].Y) && 
        __WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].Y <= (__WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].Y + 32  )
      ) {
          Object(__WEBPACK_IMPORTED_MODULE_0__sounds_js__["a" /* playSound */])(this.isVolume,'eatfruit');
          this.score++;
          __WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].visible = false;
          __WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].pcountdown = 500;
          __WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].ghostNum = __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].ghostNum;
          __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].ghostNum = 384;
          __WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].X = 0;
          __WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].Y = 0;
          __WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].ghostEat = true;
          __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].speed = 18;
        }
    if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].ghostEat) {
      __WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].pcountdown--;
      if (__WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].pcountdown <= 0) {
        __WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].ghostEat = false;
        __WEBPACK_IMPORTED_MODULE_1__game_objects__["a" /* Enemy */].ghostNum = __WEBPACK_IMPORTED_MODULE_1__game_objects__["c" /* Powerball */].ghostNum;
        __WEBPACK_IMPORTED_MODULE_1__game_objects__["b" /* Pacman */].speed = 5;
      }
    }  
  }
  
  drawNotifications(){
    this.context.fillStyle = '#FFF';
    this.context.font = '20px Verdana';
      this.context.fillText('PACMAN: ' + 
      this.score + ' GHOST: ' + this.gscore, 2,18 );
      if (this.isPaused && !this.isStart) {
        this.context.fillText('PAUSED', 400,20 );
      }
      if (this.isStart && this.isPaused) {
        this.context.fillText('PLEASE PRESS SPACE TO START', 130,200 );
      }
      if (this.score === 11) {
        this.context.fillStyle = 'red';
        this.context.font = '40px Verdana';
        this.context.fillText('YOU WON', 200,200 );
        this.isPaused = true;
        this.isGameOver = true;
      } else if (this.gscore === 11) {
        this.context.fillStyle = 'red';
        this.context.font = '40px Verdana';
        this.context.fillText('GAME OVER', 190,200 );
        this.isPaused = true;
        this.isGameOver = true;
      }
  }
  
  render() {
    this.context.fillStyle = "black";
    this.context.fillRect(0,0,this.canvas.width, this.canvas.height);
    this.drawPacman();
    this.drawEnemy();
    this.setupPowerball();
    this.generateEnemyMovements();
    this.detectEnemyCollision();
    this.detectPowerballCollision();
    this.drawPowerball();
    this.drawNotifications();
  }  
  
}


/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(1);


const Pacman = {
  X: 50,
  Y: 100,
  imgPositionX :320,
  imgPositionY: 0,
  size: 32,
  speed: 15,
};
/* harmony export (immutable) */ __webpack_exports__["b"] = Pacman;


const Enemy = {
  X: Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["a" /* randomNumber */])(450),
  Y: Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["a" /* randomNumber */])(250) + 30,
  speed: 5,
  movingTime: 0,
  dirX: 0,
  dirY: 0,
  flash: 0,
  ghostEat: false,
  ghostNum: Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["a" /* randomNumber */])(5) * 64,
};
/* harmony export (immutable) */ __webpack_exports__["a"] = Enemy;


const Powerball = {
  X: 10,
  Y: 10,
  visible: false,
  pcountdown: 0,
  ghostNum: 0,
  ghostEat: false,
};
/* harmony export (immutable) */ __webpack_exports__["c"] = Powerball;



/***/ })
/******/ ]);