# Packmanball

## Background and overview
Pacmanball is a game based on a well known arcade video game Pacman from 1980 originally created by Namco in Japan. The Pacmanball represents a game board, the packman, several enemies aka "ghosts" and a ball randomly generated on the board.
The goal of the game is to hit the ball by controlling the Packman. If the packman hits the ball it would temporarily be able to hit the enemies and get an additional point.
The enemies will work the same way as in the original packman trying to catch the packman, sometimes they have a higher speed. In order to make the game playable and enjoyable the board wouldn't have an internal maze or boundaries. So if the packman moves out of the board for example on the right side it will re-appear on the left side of the board. The player will get score if he/she get a ball and computer(enemies) will get a score if the packman get hit by the enemies. The pacmanball game is over when a player or enemies achieved a score of 11 points.

![](https://github.com/Alspirid/JS-project-pacman/blob/master/images/pacman-ball-intro.gif)
 
## Features

* User can control pacman, move it inside the game board and pause and restart the game. 
* The "ghosts" will chase the pacman inside the board trying to hit the pacman until pacman eats the powerball.
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
