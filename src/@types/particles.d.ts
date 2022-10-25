import { IGame } from "./main";

type IParticle = {
  game: IGame;
  markedForDeletion: boolean;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
};
