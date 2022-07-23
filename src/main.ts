import { Player } from "./player/player";
import { InputHandler } from "./input";
import { Background } from "./background";
import { IGame } from "./@types/main";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  // canvasを2Dグラフィックを描画するためのメソッドやプロパティをもつオブジェクトを取得し、代入
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  /**
   * Gameのレイアウトを定義
   */
  class Game implements IGame {
    width: number;
    height: number;
    player: Player;
    input: InputHandler;
    groundMargin: number;
    speed: number;
    maxSpeed: number;
    background: Background;
    game!: Game;
    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
      // ゲーム画面最下部からのマージン
      this.groundMargin = 80;
      // ゲームのスピード設定値
      this.speed = 0;
      // ゲームのマックススピード設定値
      this.maxSpeed = 3;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler();
    }

    update(deltaTime: number): void {
      this.background.update();
      // キャラクターの状態を更新
      this.player.update(this.input.keys, deltaTime);
    }

    draw(context: CanvasRenderingContext2D): void {
      this.background.draw(context);
      // キャラクターを出力
      this.player.draw(context);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timeStamp: number): void {
    // requestAnimationFrameのコールバックメソッド[timestamp]には、DOMHighResTimeStamp が渡される。
    // 最初にコールバック関数が呼び出された時点の引数（タイムスタンプ）と
    // 以降に呼び出されたコールバック関数の引数の差分から経過時間を取得することができる。
    const deltaTime = timeStamp - lastTime;
    // console.log(deltaTime);
    lastTime = timeStamp;
    // Game画面を四角形にクリアする
    if (ctx != null) ctx.clearRect(0, 0, canvas.width, canvas.height);
    // キャラクターの状態を更新
    game.update(deltaTime);
    // 2Dグラフィック用のcanvasctxに代入されている場合
    if (ctx != null) {
      // キャラクターを出力
      game.draw(ctx);
      /*
       * ブラウザの描画更新単位と同じ単位でコールされる
       * 次の再描画が行われる前に次のアニメーションをする関数を呼び出す
       * 再帰的に本関数を呼び出す(そうしないとフレームが意図したタイミングで更新されない)
       */
      requestAnimationFrame(animate);
    }
  }
  animate(0);
});
