import { IEnemy } from "../@types/enemy";

class Enemy implements IEnemy {
  frameX;
  frameY;
  fps;
  frameInterval;
  frameTimer;
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }

  update() {}
  draw() {}
}
