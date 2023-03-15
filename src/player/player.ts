import { iGame } from "../@types/main";
import { IEnemy } from "../@types/enemy";
import { IPlayer } from "../@types/player";
import {
  Sitting,
  Running,
  Jumping,
  Falling,
  Rolling,
  Diving,
  Hit,
} from "./playerStates";
import { CollisionAnimation } from "../CollisionAnimation";
import { FloatingMessage } from "../floatingMessage";

export class Player implements IPlayer {
  game;
  width;
  height;
  x;
  y;
  image;
  vy;
  speed;
  maxSpeed;
  weight;
  currentState: Sitting | Running | Jumping | Falling | Rolling | Diving | Hit;
  states;
  frameX;
  frameY;
  maxFrame;
  fps;
  frameInterval;
  frameTimer;

  constructor(game: iGame) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    // キャラクターの横軸の設置位置
    this.x = 0;
    // キャラクターの縦軸の設置位置(静止ポジション)
    this.y = this.game.height - this.height - this.game.groundMargin;
    // キャラクターの現在位置
    this.vy = 0;
    this.weight = 1;
    this.image = document.getElementById("player") as CanvasImageSource;
    // キャラクターフレームの横軸
    this.frameX = 0;
    // キャラクターフレームの縦軸
    this.frameY = 0;
    this.maxFrame = 0;
    this.speed = 0;
    this.maxSpeed = 10;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;

    // ステータス管理用クラスにキャラクター管理クラスを渡す
    this.states = [
      new Sitting(this.game),
      new Running(this.game),
      new Jumping(this.game),
      new Falling(this.game),
      new Rolling(this.game),
      new Diving(this.game),
      new Hit(this.game),
    ];
    this.currentState = new Sitting(this.game);
  }

  update(input: string[], deltaTime: number): void {
    this.checkCollision();
    // キャラクターの状態制御に、入力キー情報を渡す
    this.currentState.handleInput(input as unknown as string);
    // 横移動
    this.x += this.speed;
    // 配列にArrowRightが含まれている場合trueを返却
    if (input.includes("ArrowRight") && this.currentState !== this.states[6])
      this.speed = this.maxSpeed;
    // 配列にArrowLeftが含まれている場合trueを返却
    else if (
      input.includes("ArrowLeft") &&
      this.currentState !== this.states[6]
    )
      this.speed = -this.maxSpeed;
    else this.speed = 0;
    // 水平の境界
    // キャラクターが画面の左端にある場合、キャラクターの位置を最も左端で固定する
    if (this.x < 0) this.x = 0;
    // ゲームの幅 - キャラクターの幅の減算値がキャラクターの位置よりも大きい場合
    if (this.x > this.game.width - this.width) {
      // キャラクターの位置をゲームの幅 - キャラクターの幅の減算値にする
      this.x = this.game.width - this.width;
    }

    // 縦移動
    this.y += this.vy;
    // キャラの縦方向の位置が静止ポジションより高い場合、重力を足して、落下させる
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
    // 縦方向の境界
    if (this.y > this.game.height - this.height - this.game.groundMargin) {
      this.y = this.game.height - this.height - this.game.groundMargin;
    }
    if (this.frameTimer > this.frameInterval) {
      // 稼働アニメーション
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
    // 使用範囲を指定してイメージを描画する
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  onGround(): boolean {
    // キャラの縦位置が[静止ポジションにある]または[静止ポジションより少ない場合]、trueを返却
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }

  setState(state: number, speed: number): void {
    // キャラクターの現在状態に現在の状態クラスを代入
    // 現在の状態に合わせたイメージフレームをセット
    this.currentState = this.states[state];
    this.game.speed = speed * 10;
    this.currentState.enter();
  }

  /**
   * 敵との接触判定
   */
  checkCollision() {
    this.game.enemies.forEach((enemy: IEnemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        // 衝突判定
        enemy.markedForDeletion = true;
        this.game.collisions.push(
          new CollisionAnimation(
            this.game,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5
          )
        );
        if (
          this.currentState === this.states[4] ||
          this.currentState === this.states[5]
        ) {
          this.game.score++;
          this.game.floatingMessages.push(
            new FloatingMessage("+1", enemy.x, enemy.y, 150, 50)
          );
        } else {
          this.setState(6, 0);
          this.game.score -= 5;
          this.game.lives--;
          if (this.game.lives <= 0) {
            this.game.gameOver = true;
          }
        }
      } else {
        // 衝突時以外の判定
      }
    });
  }
}
