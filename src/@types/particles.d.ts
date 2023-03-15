import { iGame } from "./main";

type IParticle = {
  game: iGame;
  markedForDeletion: boolean;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
};
