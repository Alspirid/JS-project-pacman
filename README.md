# Pacman-ball

## Background and overview
Pacman-ball is a variation of the well known video game Pacman from 1980, originally created by Namco in Japan. The pacman-ball represents a game board, the pacman, one enemy aka "ghost" and a powerball randomly generated on the board.
The goal of the game is to hit the powerball by controlling pacman. If the pacman hits the powerball it get a point and it would temporarily be able to hit the enemies and get an additional point.
The enemy will work the same way as in the original pacman trying to catch the pacman, sometimes they have a higher speed. In order to make the game playable and enjoyable the board wouldn't have an internal maze or boundaries. So if the pacman moves out of the board boundaries, for example on the right side it will re-appear on the left side of the board. The pacman-ball game is over when a player or enemies achieved a score of 11 points.

![](https://github.com/Alspirid/JS-project-pacman/blob/master/images/pacman-ball-intro.gif)
 
## Features

* User can control pacman, move it inside the game board and pause and restart the game. 
* Ghost will chase pacman inside the board trying to hit the pacman until pacman eats the powerball.
* Once pacman eats the powerball it get the ability to move faster and eat the ghost. 
* Game score: for every eaten item (powerball or ghost) pacman gets a point, while ghost gets a point when it hits the pacman. 
* The game is accompanied with collision sounds from the original pacman game.
* The game has a control board with three options: start, pause, and reset buttons.


### Controling pacman movements
Users are able to control pacman by pressing arrow keys and moving pacman around the game board.
Users can also pause and restart the game: hitting space key or clicking on play/pause button 
will pause/continue the game, clicking on the restart button will restart the game.
This is done with an event listener on the document. Once the document has loaded it's content the game object will be created including the game canvas and the canvas object will be added to an existing div element. There are two keyboard listeners which handling keydown and keyup events on the document. While user is pressing an arrow key the keydown listener is processing the event by storing corresponding keyboard key code in the object game.keyClick. The game.move function is reading key codes from keyClick object and changing X,Y position of pacman on the board. Once user has release the key, new event keyup happens and corresponding key code is deleted from the keyClick storage. When key code is not presented in the keyClick storage game.move will not change X,Y position of pacman and it won't move until user will press arrow key again.

```javascript
document.addEventListener('DOMContentLoaded', () =>{
  game = new Game();
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
}

```
### Ghost movements depending on pacman position
First of all ghost is randomly selected from the pull of available ghosts presented in the pacman picture and generated on the canvas.

![](https://github.com/Alspirid/JS-project-pacman/blob/master/assets/pac.png)

```javascript
export const Enemy = {
  X: randomNumber(450),
  Y: randomNumber(250) + 30,
  speed: 5,
  movingTime: 0,
  dirX: 0,
  dirY: 0,
  flash: 0,
  ghostEat: false,
  ghostNum: randomNumber(5) * 64,
};

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
```
Once ghost is drawn on the board, render() function will call generateEnemyMovements() which
will control of all ghost movements. 
Depending on few properties generateEnemyMovements() will update X,Y coordinates of ghost:
 * Enemy.movingTime - some random period of time when ghost will move towards pacman
 * Powerball.ghostEat - true if pacman has eaten powerball, then ghost should move away from pacman
 

```javascript

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
```

### Collision detection
Detecting when the objects collide is one of the most fundamentals of making this game. However, to apply collision detection on every object with different shape is difficult. In pacman-ball, all objects are circles, which makes the logic less complicated. 
I use X,Y coordinates and circle radius to check if two circles are colliding.
If distance between centers of two circle is less than the sum of their radius, then they are hitting each other.

```javascript
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
        Powerball.pcountdown = 0;
      }
      if (Enemy.flash === 0){
        Enemy.flash = 32;
      } else {
        Enemy.flash = 0;
      }  
}
```

### Architecture and Technologies
This project is implemented with the following technologies:
- Vanilla JavaScript for overall structure and game logic
- HTML5 Canvas for DOM manipulation and rendering,
- Web Audio for sound generation, processing and control. 
- Webpack to bundle and serve up the various scripts.


### Bonus features and future improvements
- Add game levels with different complexity
- Allow user to select level
- Add multiple ghost depending on the game complexity
