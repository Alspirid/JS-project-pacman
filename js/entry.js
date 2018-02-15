import Game from './game.js';
import { playSound } from './sounds.js';

const game = new Game();

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
    playSound(game.isVolume,'beginning');
    game.render();
  };
