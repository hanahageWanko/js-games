import { commonMemberTypes } from "./@types/commonMemberTypes";
import { iGame } from "./main";

type iEnemy = {
  frameX: commonMemberTypes.frameX;
  frameY: commonMemberTypes.frameY;
  fps: commonMemberTypes.fps;
  frameInterval: commonMemberTypes.frameInterval;
  frameTimer: commonMemberTypes.frameTimer;
  x: commonMemberTypes.x;
  y: commonMemberTypes.y;
  game: iGame;
  speedX: commonMemberTypes.speedX;
  speedY: commonMemberTypes.speedY;
  image: commonMemberTypes.image;
  width: commonMemberTypes.width;
  height: commonMemberTypes.height;
  markedForDeletion: boolean;
  maxFrame: commonMemberTypes.maxFrame;
  update: (deltaTime: number) => void;
  draw: (context: CanvasRenderingContext2D) => void;
};
