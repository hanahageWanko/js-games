import commopnMemberTypes from "./commonMemberTypes";
import { iGame } from "./main";

type ICollisionAnimationRequired = Required<{
  game: iGame;
  image: commopnMemberTypes.image;
  spriteWidth: number;
  spriteHeight: number;
  sizeModifier: number;
  width: commopnMemberTypes.width;
  height: commopnMemberTypes.height;
  x: commopnMemberTypes.x;
  y: commopnMemberTypes.y;
  frameX: commopnMemberTypes.frameX;
  maxFrame: commopnMemberTypes.maxFrame;
  markedForDeletion: boolean;
  fps: number;
  frameInterval: number;
  frameTimer: number;
  update: (deltaTime: number) => void;
  draw: (context: CanvasRenderingContext2D) => void;
}>;

type ICollisionAnimationPartial = Partial<{
  // update: (deltaTime: number) => void;
  // draw: (context: CanvasRenderingContext2D) => void;
}>;

type ICollisionAnimation = ICollisionAnimationRequired &
  ICollisionAnimationPartial;
