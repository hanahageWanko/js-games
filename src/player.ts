import { IGame } from "./@types/main";
import { Sitting, Running, Jumping, Falling } from "./playerStates";

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
  currentState;
  states = [
    new Sitting(this),
    new Running(this),
    new Jumping(this),
    new Falling(this),
  ];

  frameX;
  frameY;
  maxFrame;
  fps;
  frameInterval;
  frameTimer;

  constructor(game: IGame) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    // キャラクターの横軸の設置位置
    this.x = 0;
    // キャラクターの縦軸の設置位置(静止ポジション)
    this.y = this.game.height - this.height - this.game.groundMargin;
    // キャラクターの
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
      new Sitting(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
    ];
    this.currentState = this.states[0];
    // キャラクター状態管理クラスのenterメソッドを初期実行
    this.currentState.enter();
  }

  update(input: string[], deltaTime: number): void {
    // キャラクターの状態制御に、入力キー情報を渡す
    this.currentState.handleInput(input as unknown as string);
    // 横移動
    this.x += this.speed;
    // 配列にArrowRightが含まれている場合trueを返却
    if (input.includes("ArrowRight")) this.speed = this.maxSpeed;
    // 配列にArrowLeftが含まれている場合trueを返却
    else if (input.includes("ArrowLeft")) this.speed = -this.maxSpeed;
    else this.speed = 0;
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

    // 稼働アニメーション
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }

  draw(context: CanvasRenderingContext2D): void {
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
}
