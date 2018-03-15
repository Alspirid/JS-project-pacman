import { playSound } from './sounds.js';
import { Pacman, Enemy, Powerball} from './game_objects';
import { randomNumber } from './utils.js';

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
    this.scoreElement = document.getElementById('score');
    this.scoreText = 'PACMAN: ' + this.score + 
    '  &nbsp; ' + '    GHOST: ' + this.gscore;
    this.pauseMessage = document.getElementById('pause-message');
    }
  
  
  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.height = 400;
    this.canvas.width = 600;
    this.context = this.canvas.getContext("2d");
    this.context.fillStyle = "black";
    this.context.fillRect(0,0,this.canvas.width, this.canvas.height);
    this.context.font = '20px Limelight';
    this.context.fillStyle = '#fff';
    this.context.fillText('Pacman: ' + this.score + 
    ' Ghost: ' + this.gscore, 2,18 );
  }
  
   move(keyObject){

    if (37 in keyObject) {
      Pacman.X -= Pacman.speed; 
      Pacman.imgPositionY = 64;
    }
    if (38 in keyObject) {
      Pacman.Y -= Pacman.speed; 
      Pacman.imgPositionY = 96;
    }
    if (39 in keyObject) {
      Pacman.X += Pacman.speed; 
      Pacman.imgPositionY = 0;
    }
    if (40 in keyObject) {
      Pacman.Y += Pacman.speed; 
      Pacman.imgPositionY = 32;
    }
    if (Pacman.X >= (this.canvas.width-32)) {
      Pacman.X = 0;
    }
    if (Pacman.Y >= (this.canvas.height-32)) {
      Pacman.Y = 0;
    }
    if (Pacman.X < 0) {
      Pacman.X = (this.canvas.width - 32);
    }
    if (Pacman.Y < 0) {
      Pacman.Y = (this.canvas.height - 32);
    }
    
    if (Pacman.imgPositionX === 320)  {
      Pacman.imgPositionX = 352;
    } else {
      Pacman.imgPositionX = 320;
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
    this.scoreText = 'PACMAN: ' + this.score + 
    '  &nbsp; ' + '    GHOST: ' + this.gscore;
    this.scoreElement.innerHTML = this.scoreText;
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
    playSound(this.isVolume,'beginning');
  }
  
  drawPacman() {
    this.context.drawImage(
      this.mainImage,
      Pacman.imgPositionX,
      Pacman.imgPositionY,
      32,
      32,
      Pacman.X,
      Pacman.Y,
      32,
      32
    );
  }
  
  drawEnemy(){
    this.context.drawImage(
      this.mainImage,
      Enemy.ghostNum,
      Enemy.flash,
      32,
      32,
      Enemy.X,
      Enemy.Y,
      32,
      32
    );
  }
  
  setupPowerball(){
    if (! Powerball.visible && Powerball.pcountdown < 5) {
      Powerball.X = randomNumber(420) + 30;
      Powerball.Y = randomNumber(250) + 30;
      Powerball.visible = true;
    }
  }
  
  drawPowerball(){
    if (Powerball.visible) {
      this.context.fillStyle = "#fff";
      this.context.beginPath();
      this.context.arc(Powerball.X,Powerball.Y, 10, 0, Math.PI * 2, true);
      this.context.closePath();
      this.context.fill();
    }
  }
  
  generateEnemyMovements(){
    if(Enemy.movingTime < 0) {
      Enemy.movingTime = (randomNumber (20) * 3) + randomNumber(1);
      Enemy.speed = randomNumber (3) + 1 ;
      Enemy.dirX = 0;
      Enemy.dirY = 0;
      
      if (Powerball.ghostEat) {
        Enemy.speed = Enemy.speed * -1;
      }
      
      if (Enemy.movingTime % 2) {
        if (Pacman.X < Enemy.X) {
          Enemy.dirX = -Enemy.speed;
        } else {
          Enemy.dirX = Enemy.speed;
        }
      } else {
        if (Pacman.Y < Enemy.Y) {
          Enemy.dirY = -Enemy.speed;
        } else {
          Enemy.dirY = Enemy.speed;
        }
      }
    }
    Enemy.movingTime--;
    Enemy.X = Enemy.X + Enemy.dirX;
    Enemy.Y = Enemy.Y + Enemy.dirY;
    
    if (Enemy.X >= (this.canvas.width-32)) {
      Enemy.X = 0;
    }
    if (Enemy.Y >= (this.canvas.height-32)) {
      Enemy.Y = 0;
    }
    if (Enemy.X < 0) {
      Enemy.X = (this.canvas.width - 32);
    }
    if (Enemy.Y < 0) {
      Enemy.Y = (this.canvas.height - 32);
    }
  }
  
  detectEnemyCollision() {
    if (Pacman.X <= (Enemy.X + 26) && 
        Enemy.X <= (Pacman.X + 26) && 
        Pacman.Y <= (Enemy.Y + 26) && 
        Enemy.Y <= (Pacman.Y + 32)
      ) {
          if (Powerball.ghostEat) {
            this.score++;
            playSound(this.isVolume,'eatghost');
          } else {
            this.gscore++;
            playSound(this.isVolume,'death');
          }
          Pacman.X = randomNumber(100)+50;
          Pacman.Y = randomNumber(200)+50;
          Enemy.X = randomNumber(200)+30;
          Enemy.Y = randomNumber(300)+30;
          // Powerball.ghostEat = false;
          Powerball.pcountdown = 0;
        }
        if (Enemy.flash === 0){
          Enemy.flash = 32;
        } else {
          Enemy.flash = 0;
        }  
  }
  
  detectPowerballCollision() {
    if (Pacman.X <= (Powerball.X) && 
        Powerball.X <= (Pacman.X + 32) && 
        Pacman.Y <= (Powerball.Y) && 
        Powerball.Y <= (Pacman.Y + 32  )
      ) {
          playSound(this.isVolume,'eatfruit');
          this.score++;
          Powerball.visible = false;
          Powerball.pcountdown = 500;
          Powerball.ghostNum = Enemy.ghostNum;
          Enemy.ghostNum = 384;
          Powerball.X = 0;
          Powerball.Y = 0;
          Powerball.ghostEat = true;
          Pacman.speed = 18;
        }
    if (Powerball.ghostEat) {
      Powerball.pcountdown--;
      if (Powerball.pcountdown <= 0) {
        Powerball.ghostEat = false;
        Enemy.ghostNum = Powerball.ghostNum;
        Pacman.speed = 5;
      }
    }  
  }
  
  drawNotifications(){
    this.context.fillStyle = '#FFF';
    this.context.font = '20px Limelight';
      if (this.isPaused && !this.isStart) {
        this.context.fillText('PAUSED', 400,20 );
      }
      if (this.isStart && this.isPaused) {
        this.pauseMessage.style.display = 'block';
      } else {
        this.pauseMessage.style.display = 'none';
      }
      if (this.score === 11) {
        this.context.fillStyle = 'red';
        this.context.font = '40px Limelight';
        this.context.fillText('YOU HAVE WON', 200,200 );
        this.isPaused = true;
        this.isGameOver = true;
      } else if (this.gscore === 11) {
        this.context.fillStyle = 'red';
        this.context.font = '40px Limelight';
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


export default Game;
