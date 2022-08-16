interface IPlayer {
  game: IGame;
  width: number;
  height: number;
  x: number;
  y: number;
  image: CanvasImageSource;
  vy: number;
  speed: number;
  maxSpeed: number;
  weight: number;
  currentState: Sitting | Running | Jumping | Falling;
  states: Array<Sitting | Running | Jumping | Falling>;
  frameX: number;
  frameY: number;
  maxFrame: number;
  fps: number;
  frameInterval: number;
  frameTimer: number;
}
