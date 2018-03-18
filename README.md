# Packmanball

## Background and overview
Pacmanball is a game based on a well known arcade video game Pacman from 1980 originally created by Namco in Japan. The Pacmanball represents a game board, the packman, several enemies aka "ghosts" and a ball randomly generated on the board.
The goal of the game is to hit the ball by controlling the Packman. If the packman hits the ball it would temporarily be able to hit the enemies and get an additional point.
The enemies will work the same way as in the original packman trying to catch the packman, sometimes they have a higher speed. In order to make the game playable and enjoyable the board wouldn't have an internal maze or boundaries. So if the packman moves out of the board for example on the right side it will re-appear on the left side of the board. The player will get score if he/she get a ball and computer(enemies) will get a score if the packman get hit by the enemies. The pacmanball game is over when a player or enemies achieved a score of 11 points.

![](https://github.com/Alspirid/JS-project-pacman/blob/master/images/pacman-ball-intro.gif)
 
## Features

* User can control pacman, move it inside the game board and pause and restart the game. 
* Ghost will chase the pacman inside the board trying to hit the pacman until pacman eats the powerball.
* Once pacman eats the powerball it get the ability to move faster and eat the ghost. 
* Game score: for every eaten item (powerball or ghost) pacman gets a point, while ghost gets a point when it hits the pacman. 
* The game is accompanied with collision sounds from the original pacman game.
* The game has a control board with three options: start, pause, and reset buttons.


### Controling pacman and moving it inside the game board
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
### Ghost will chase pacman inside the board trying to hit pacman unless pacman eats the powerball.
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
Once ghost is drawn on the board render() function will call generateEnemyMovements() which
will control of all ghost movements. 
Depending on few properties generateEnemyMovements will update X,Y coordinates of ghost:
 * Enemy.movingTime - some random period of time when ghost will move towards  to pacman
 * Powerball.ghostEat - reflects if pacman has eaten powerball and ghost should run away from pacman
 

```javascript
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

### Architecture and Technologies
This project will be implemented with the following technologies:
- Vanilla JavaScript for overall structure and game logic
- HTML5 Canvas for DOM manipulation and rendering,
- Web Audio API for sound generation, processing and control. WebAudioAPI allows for simultaneous sounds with more dependable time triggering
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved into this project:
- board.js - this script will handle the logic for creating and updating different DOM elements
- packman.js - will handle logic of moving elements over the canvas
- audio.js - this script will handle the audio logic and the creation of AudioEvents based on the input parameters outlined above. The programming paradigm will be an audio graph consisting of buffers and processing nodes, all connected into a master bus, and referencing a global AudioContext with its own timeline.



### Sounds and Artwork

The Artworks and Sounds for the packmanball game is taken from the free resource: http://www.classicgaming.cc/classics/pac-man/sounds

#### The following sounds will be used in the game:
- packman_beginning.wav
- packman_death.wav
- packman_eatfruit.wav
- packman_eatghost.wav
- packman_intermission.wav
- packman_chomp.wav

### The main artwork will be used in the game:
- pac.png

### Implementation timeline
- [x] Finish canvas and momentum collision on the packman project

#### Day 1
Setup all necessary Node modules, including getting webpack up and running. Create webpack.config.js as well as package.json. Write a basic entry file and the bare bones of all 4 scripts outlined above. Learn the basics of Web Audio API. Goals for the day:

-  Get webpack serving files and frame out index.html
-  Learn enough Web Audio to render an object to the Canvas element and create a sound
-  Port over the relevant pieces of my Packman (with collision physics) project


#### Day 2
Dedicate this day to learning the Web Audio API. First, build out the AudioEvent object to connect to the Board object. Then, use board.js to create and render the Packman and AudioEvents. Goals for the day:

- Complete the packman.js module (constructor, update functions, colors)
-  Get sounds to play on collisions
-  Build first sound library
-  Get collision graphics working

#### Day 3
Create the logic for the game. Build out playback functionality: play, pause, restart. 
Goals for the day:

- Build playback controls
- Handle playback events
- Implement playback logic
- Have a functional screen on the Canvas frontend that correctly handles creation and running of the game events.
- Test and make sure that starting, stopping, and resetting works.

#### Day 4
Style game elements to look them polished and professional.
- Create volume control to turn on/off the game sounds.
- Have a styled canvas, nice looking controls and game title

### Bonus features
- Compute and show the game score depending on the game performance
- Game levels with different level on complexity
- Allow user to select level
