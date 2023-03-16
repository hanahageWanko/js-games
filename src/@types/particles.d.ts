import { iGame } from "./@types/main";

type iParticle = {
  game: iGame;
  markedForDeletion: boolean;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
};
