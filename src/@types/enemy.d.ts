import commopnMemberTypes from "./commonMemberTypes";
import { iGame } from "./main";

type IEnemyRequired = Required<{
  frameX: commopnMemberTypes.frameX;
  frameY: commopnMemberTypes.frameY;
  fps: commopnMemberTypes.fps;
  frameInterval: commopnMemberTypes.frameInterval;
  frameTimer: commopnMemberTypes.frameTimer;
  x: commopnMemberTypes.x;
  y: commopnMemberTypes.y;
  game: iGame;
  speedX: commopnMemberTypes.speedX;
  speedY: commopnMemberTypes.speedY;
  image: commopnMemberTypes.image;
  width: commopnMemberTypes.width;
  height: commopnMemberTypes.height;
  markedForDeletion: boolean;
  maxFrame: commopnMemberTypes.maxFrame;
  update: (deltaTime: number) => void;
  draw: (context: CanvasRenderingContext2D) => void;
}>;

type IEnemyPartial = Partial<{
  // update: (deltaTime: number) => void;
  // draw: (context: CanvasRenderingContext2D) => void;
}>;

type IEnemy = IEnemyRequired & IEnemyPartial;
