import { commonMemberTypes } from "./@types/commonMemberTypes";
import { iGame } from "./main";

interface iPlayer {
  game: iGame;
  width: number;
  height: number;
  x: number;
  y: number;
  image: CanvasImageSource;
  vy: number;
  speed: number;
  maxSpeed: number;
  weight: number;
  currentState: Sitting | Running | Jumping | Falling | Rolling | Diving | Hit;
  states: Array<Sitting | Running | Jumping | Falling | Rolling | Diving | Hit>;
  frameX: commonMemberTypes.frameX;
  frameY: commonMemberTypes.frameY;
  maxFrame: number;
  fps: commonMemberTypes.fps;
  frameInterval: commonMemberTypes.frameInterval;
  frameTimer: commonMemberTypes.frameTimer;
}
