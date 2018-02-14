
let isPaused = true;
let isStart = true;
let isGameOver = false;
let isVolume = true;

const packman = {
  x: 50,
  y: 100,
  pacmouth:320,
  pacdir: 0,
  pSize: 32,
  speed: 15,
};

const enemy = {
  x: 150,
  y: 200,
  speed: 5,
  movingTime: 0,
  dirX: 0,
  dirY: 0,
  flash: 0,
  ghostEat: false,
};

const powerball = {
  x: 10,
  y: 10,
  visible: false,
  pcountdown: 0,
  ghostNum: 0,
  ghostEat: false,
};

let score = 0, gscore = 0, ghost = false, countblink = 10;


const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
canvas.height = 400;
canvas.width = 600;
const mainImage = new Image();
mainImage.ready = false;
mainImage.src = "./assets/pac.png";
mainImage.onload = checkReady;

document.getElementById('root').appendChild(canvas);
const soundChomp = new Audio('./assets/pacman_chomp.wav');
const soundEatFruit = new Audio('./assets/pacman_eatfruit.wav');
const soundEatGhost = new Audio('./assets/pacman_eatghost.wav');
const soundDeath = new Audio('./assets/pacman_death.wav');
const soundBeginning = new Audio('./assets/pacman_beginning.wav');

const keyClick = {};

document.addEventListener('keydown', (e)=>{
  keyClick[e.keyCode]=true;
  move(keyClick);
  togglePause(e.keyCode);
},false);

document.addEventListener('keyup', (e)=>{
  delete keyClick[e.keyCode];
},false);

const volumeClick = () =>{
  const volume = document.getElementById('volume');
  if (isVolume) {
    volume.classList.remove("ion-android-volume-up");
    volume.classList.add("ion-android-volume-off");
  } else {
    volume.classList.remove("ion-android-volume-off");
    volume.classList.add("ion-android-volume-up");
  }
  isVolume = !isVolume;
};





const togglePause = (key) => {
  if (key === 32) {
    if (isGameOver){
      gscore = 0;
      score = 0;
      isGameOver = false;
      isStart = true;
    }
      isPaused = ! isPaused;
      playGame();
  }
};

// const playSound = (key) => {
//   switch (key) {
//     case 37,38,39,40:
//       soundChomp.play();
//       break;
//   }
// };

const move = (keyObject) => {

  if (37 in keyObject) {
    packman.x -= packman.speed; packman.pacdir = 64;
    // soundChomp.play();
  }
  if (38 in keyObject) {
    packman.y -= packman.speed; packman.pacdir = 96;
    // soundChomp.play();
  }
  if (39 in keyObject) {
    packman.x += packman.speed; packman.pacdir = 0;
    // soundChomp.play();
  }
  if (40 in keyObject) {
    packman.y += packman.speed; packman.pacdir = 32;
    // soundChomp.play();
  }
  if (packman.x >= (canvas.width-32)) {
    packman.x = 0;
  }
  if (packman.y >= (canvas.height-32)) {
    packman.y = 0;
  }
  if (packman.x < 0) {
    packman.x = (canvas.width - 32);
  }
  if (packman.y < 0) {
    packman.y = (canvas.height - 32);
  }
  
  if (packman.pacmouth === 320)  {
    packman.pacmouth = 352;
  } else {
    packman.pacmouth = 320;
  }
  // render();
};

function checkReady() {
  this.ready = true;
  render();
  soundBeginning.play();
}


const playGame = () => {
  render();
  if (!isPaused) {
    requestAnimationFrame(playGame);
  } else {
    cancelAnimationFrame(playGame);
  }
};



const myNum = (n) => {
  return Math.floor(Math.random()*n);
};

const render = () => {
  context.fillStyle = "black";
  context.fillRect(0,0,canvas.width, canvas.height);
  
  if (!powerball.visible && powerball.pcountdown < 5) {
    powerball.x = myNum(420) + 30;
    powerball.y = myNum(250) + 30;
    powerball.visible = true;
  }
  
  if (!ghost) {
    enemy.ghostNum = myNum(5) * 64;
    enemy.x = myNum(450);
    enemy.y = myNum(250) + 30;
    ghost = true;
  }
  
  if(enemy.movingTime < 0) {
    enemy.movingTime = (myNum (20) * 3) + myNum(1);
    enemy.speed = myNum (3) + 1 ;
    enemy.dirX = 0;
    enemy.dirY = 0;
    
    if (powerball.ghostEat) {
      enemy.speed = enemy.speed * -1;
    }
    
    if (enemy.movingTime % 2) {
      if (packman.x < enemy.x) {
        enemy.dirX = -enemy.speed;
      } else {
        enemy.dirX = enemy.speed;
      }
    } else {
      if (packman.y < enemy.y) {
        enemy.dirY = -enemy.speed;
      } else {
        enemy.dirY = enemy.speed;
      }
    }
  }
  enemy.movingTime--;
  enemy.x = enemy.x + enemy.dirX;
  enemy.y = enemy.y + enemy.dirY;
  
  if (enemy.x >= (canvas.width-32)) {
    enemy.x = 0;
  }
  if (enemy.y >= (canvas.height-32)) {
    enemy.y = 0;
  }
  if (enemy.x < 0) {
    enemy.x = (canvas.width - 32);
  }
  if (enemy.y < 0) {
    enemy.y = (canvas.height - 32);
  }
  
  // Collision detection ghost
  if (packman.x <= (enemy.x + 26) && 
      enemy.x <= (packman.x + 26) && 
      packman.y <= (enemy.y + 26) && 
      enemy.y <= (packman.y + 32)
    ) {
        console.log('hit a ghost');
        if (powerball.ghostEat) {
          score++;
          soundEatGhost.play();
        } else {
          gscore++;
          soundDeath.play();
        }
        packman.x = 10;
        packman.x = 100;
        enemy.x = 300;
        enemy.y = 200;
        // powerball.ghostEat = false;
        powerball.pcountdown = 0;
      }
      
  // Collision detection powerball
  if (packman.x <= (powerball.x) && 
      powerball.x <= (packman.x + 32) && 
      packman.y <= (powerball.y) && 
      powerball.y <= (packman.y + 32  )
    ) {
        soundEatFruit.play();
        console.log('hit');
        score++;
        powerball.visible = false;
        powerball.pcountdown = 500;
        powerball.ghostNum = enemy.ghostNum;
        enemy.ghostNum = 384;
        powerball.x = 0;
        powerball.y = 0;
        powerball.ghostEat = true;
        packman.speed = 18;
      }
  if (powerball.ghostEat) {
    powerball.pcountdown--;
    if (powerball.pcountdown <= 0) {
      powerball.ghostEat = false;
      enemy.ghostNum = powerball.ghostNum;
      packman.speed = 5;
    }
  }    

  if (powerball.visible) {
    context.fillStyle = "#fff";
    context.beginPath();
    context.arc(powerball.x,powerball.y, 10, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  }
  
  // if (countblink>0){
  //   countblink--;
  // } else {
  //   countblink = 20;
  // }
  
  if (enemy.flash === 0){
    enemy.flash = 32;
  } else {
    enemy.flash = 0;
  }
  
  context.font = '20px Verdana';
  // context.font = "20px 'Press Start 2P', cursive";
  context.fillStyle = '#fff';

    context.drawImage(
      mainImage,
      enemy.ghostNum,
      enemy.flash,
      32,
      32,
      enemy.x,
      enemy.y,
      32,
      32
    );
  
  context.drawImage(
    mainImage,
    packman.pacmouth,
    packman.pacdir,
    32,
    32,
    packman.x,
    packman.y,
    32,
    32
  );
context.fillStyle = '#FFF';
  context.fillText('PACMAN: ' + score + ' GHOST: ' + gscore, 2,18 );
  if (isPaused && !isStart) {
    context.fillText('PAUSED', 400,20 );
  }
  if (isStart) {
    context.fillText('PLEASE PRESS SPACE TO START', 130,200 );
    isStart = !isStart;
  }
  if (score === 11) {
    context.fillStyle = 'red';
    context.font = '40px Verdana';
    context.fillText('YOU WON', 200,200 );
    isPaused = true;
    isGameOver = true;
  } else if (gscore === 11) {
    context.fillStyle = 'red';
    context.font = '40px Verdana';
    context.fillText('GAME OVER', 190,200 );
    isPaused = true;
    isGameOver = true;
  }

};
