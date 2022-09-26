import { IEnemy } from "../@types/enemy";
import { IGame } from "../@types/main";

/**
 * 敵キャラの設定クラス
 */
export class Enemy implements IEnemy {
  frameX;
  frameY;
  fps;
  frameInterval;
  frameTimer;
  x;
  y;
  speedX;
  speedY;
  maxFrame;
  image: CanvasImageSource | null;
  width;
  height;
  markedForDeletion;
  game: IGame | undefined;
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.x = 0;
    this.y = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.maxFrame = 0;
    this.width = 0;
    this.height = 0;
    this.image = null;
    this.markedForDeletion = false;
  }

  /**
   * 敵キャラの出力更新処理
   * @param deltaTime number
   */
  update(deltaTime: number): void {
    //movement
    this.x -= this.speedX + this.game!.speed;
    this.y += this.speedY;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    // check if off screen
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }

  /**
   * 敵キャラの出力処理
   * @param context CanvasRenderingContext2D
   */
  draw(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.image!,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

/**
 * 飛行タイプの敵キャラ設定
 */
export class FlyingEnemy extends Enemy {
  game: IGame;
  width;
  height;
  x;
  y;
  speedX;
  maxFrame;
  image;
  angle: number;
  va: number;

  constructor(game: IGame) {
    super();
    this.game = game;
    this.width = 60;
    this.height = 44;
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = Math.random() + 1;
    this.speedY = 0;
    this.maxFrame = 5;
    this.image = document.getElementById("enemy_fly") as CanvasImageSource;
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1;
  }

  /**
   * 飛行タイプの敵キャラ出力更新処理
   * @param deltaTime number
   */
  update(deltaTime: number): void {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}

export class Groundenemy extends Enemy {}

export class ClimbingEnemy extends Enemy {}
