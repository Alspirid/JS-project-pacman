import { randomNumber } from './utils.js';

export const Pacman = {
  X: 50,
  Y: 100,
  imgPositionX :320,
  imgPositionY: 0,
  size: 32,
  speed: 15,
};

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

export const Powerball = {
  X: 10,
  Y: 10,
  visible: false,
  pcountdown: 0,
  ghostNum: 0,
  ghostEat: false,
};
