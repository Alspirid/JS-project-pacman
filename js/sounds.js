const soundChomp = new Audio('./assets/pacman_chomp.wav');
const soundEatFruit = new Audio('./assets/pacman_eatfruit.wav');
const soundEatGhost = new Audio('./assets/pacman_eatghost.wav');
const soundDeath = new Audio('./assets/pacman_death.wav');
const soundBeginning = new Audio('./assets/pacman_beginning.wav');

export const playSound = (volume=true,sound) =>{
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
