# Packmanball

### Background and overview
Packmanball is a game based on a well known arcade video game Pacman from 1980 originally created by Namco in Japan. The Packmanball represents a game board, the packman, several enemies aka "ghosts" and a ball randomly generated on the board.
The goal of the game is to hit the ball by controlling the Packman. If the packman hits the ball it would temporarily be able to hit the enemies and get an additional point.
The enemies will work the same way as in the original packman trying to catch the packman, sometimes they have a higher speed. In order to make the game playable and enjoyable the board wouldn't have an internal maze or boundaries. So if the packman moves out of the board for example on the right side it will re-appear on the left side of the board. The player will get score if he/she get a ball and computer(enemies) will get a score if the packman get hit by the enemies. The packmanball game is over when a player or enemies achieved a score of 21 points.
 
### Functionality & MVP

 - [ ] User can control packman and move it inside the board
 - [ ] The "ghosts" will chase the packman inside the board trying to hit the packman
 - [ ] User will hear sounds on collision and packman movement
 - [ ] The game will have a start, pause, and reset options

### Wireframe
The app will consist of a single screen with the canvas, playback controls, volume control, score and level.
On the top of the canvas there will be the Play Score and the Game level. The canvas includes the ball and two types of characters: the packman and the ghosts. Playback control below the canvas will include play, pause and restart buttons.

![](https://github.com/Alspirid/JS-project-pacman/blob/master/assets/wireframe-packmanball.png)

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

The source of sounds for the packmanball game is http://www.classicgaming.cc/classics/pac-man/sounds

#### The following sounds might be used in the game:
- packman_beginning.wav
- packman_death.wav
- packman_eatfruit.wav
- packman_eatghost.wav
- packman_intermission.wav

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
