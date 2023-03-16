import { commonMemberTypes } from "./@types/commonMemberTypes";
import { iGame } from "./@types/main";

export type iCollisionAnimation = {
  game: iGame;
  image: HTMLElement | null;
  spriteWidth: number;
  spriteHeight: number;
  sizeModifier: number;
  width: commonMemberTypes.width;
  height: commonMemberTypes.height;
  x: commonMemberTypes.x;
  y: commonMemberTypes.y;
  frameX: commonMemberTypes.frameX;
  maxFrame: commonMemberTypes.maxFrame;
  markedForDeletion: boolean;
  fps: number;
  frameInterval: number;
  frameTimer: number;
  update: (deltaTime: number) => void;
  draw: (context: CanvasRenderingContext2D) => void;
};
