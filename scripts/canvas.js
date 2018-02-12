

const player = {
  x: 50,
  y: 100,
  pacmouth:320,
  pacdir: 0,
  pSize: 32,
  speed: 5,
};

const enemy = {
  x: 150,
  y: 200,
  speed: 5,
  moving: 0,
  dirX: 0,
  dirY: 0,
};


let score = 0, gscore = 0, ghost = false;


const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
canvas.height = 400;
canvas.width = 600;
const mainImage = new Image();
mainImage.ready = false;
mainImage.src = "./assets/pac.png";
mainImage.onload = checkReady;

document.getElementById('root').appendChild(canvas);

const keyClick = {};

document.addEventListener('keydown', (e)=>{
  keyClick[e.keyCode]=true;
  move(keyClick);
},false);

document.addEventListener('keyup', (e)=>{
  delete keyClick[e.keyCode];
},false);

const move = (keyObject) => {

  if (37 in keyObject) {
    player.x -= player.speed; player.pacdir = 64;
  }
  if (38 in keyObject) {
    player.y -= player.speed; player.pacdir = 96;
  }
  if (39 in keyObject) {
    player.x += player.speed; player.pacdir = 0;
  }
  if (40 in keyObject) {
    player.y += player.speed; player.pacdir = 32;
  }
  if (player.x >= (canvas.width-32)) {
    player.x = 0;
  }
  if (player.y >= (canvas.height-32)) {
    player.y = 0;
  }
  if (player.x < 0) {
    player.x = (canvas.width - 32);
  }
  if (player.y < 0) {
    player.y = (canvas.height - 32);
  }
  
  // if (player.pacmouth === 320)  {
  //   player.pacmouth = 352;
  // } else {
  //   player.pacmouth = 320;
  // }
  render();
};

function checkReady() {
  this.ready = true;
  playGame();
}

const playGame = () => {
  render();
  requestAnimationFrame(playGame);
};

const myNum = (n) => {
  return Math.floor(Math.random()*n);
};

const render = () => {
  context.fillStyle = "black";
  context.fillRect(0,0,canvas.width, canvas.height);
  
  if (!ghost) {
    enemy.ghostNum = myNum(5) * 64;
    enemy.x = myNum(450);
    enemy.y = myNum(250) + 30;
    ghost = true;
  }
  
  if(enemy.moving < 0) {
    enemy.moving = (myNum (30) * 3) + 10 + myNum(1);
    enemy.speed = myNum (4);
    enemy.dirX = 0;
    enemy.dirY = 0;
    if (enemy.moving % 2) {
      if (player.x < enemy.x) {
        enemy.dirX = -enemy.speed;
      } else {
        enemy.dirX = enemy.speed;
      }
    } else {
      if (player.y < enemy.y) {
        enemy.dirY = -enemy.speed;
      } else {
        enemy.dirY = enemy.speed;
      }
    }
  }
  enemy.moving--;
  enemy.x = enemy.x + enemy.dirX;
  enemy.y = enemy.y + enemy.dirY;
  
  context.font = '20px Verdana';
  context.fillStyle = '#fff';

    context.drawImage(
      mainImage,
      enemy.ghostNum,
      0,
      32,
      32,
      enemy.x,
      enemy.y,
      32,
      32
    );
  
  context.drawImage(
    mainImage,
    player.pacmouth,
    player.pacdir,
    32,
    32,
    player.x,
    player.y,
    32,
    32
  );

  context.fillText('Pacman: ' + score + ' Ghost: ' + gscore, 2,18 );
};
