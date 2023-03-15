import commopnMemberTypes from "./commonMemberTypes";

interface IPlayer {
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
  frameX: commopnMemberTypes.frameX;
  frameY: commopnMemberTypes.frameY;
  maxFrame: number;
  fps: commopnMemberTypes.fps;
  frameInterval: commopnMemberTypes.frameInterval;
  frameTimer: commopnMemberTypes.frameTimer;
}
