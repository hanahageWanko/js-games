import { Player } from "./player";
import { InputHandler } from "./input";
import { Background } from "./background";

window.addEventListener("load", function () {
  const canvas = <HTMLCanvasElement>document.getElementById("canvas1");
  // canvasを2Dグラフィックを描画するためのメソッドやプロパティをもつオブジェクトを取得し、代入
  const ctx = (canvas! as HTMLCanvasElement).getContext("2d");
  canvas!.width = 500;
  canvas!.height = 500;

  /**
   * Gameのレイアウトを定義
   */
  class Game {
    protected width: number;
    protected height: number;
    protected player: any;
    protected input: any;
    protected groundMargin: number;
    protected speed: number;
    protected maxSpeed: number;
    protected background: any;
    protected game: any;
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
    update(deltaTime: number) {
      this.background.update();
      // キャラクターの状態を更新
      this.player.update(this.input.keys, deltaTime);
    }
    draw(context: CanvasRenderingContext2D) {
      this.background.draw(context);
      // キャラクターを出力
      this.player.draw(context);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  console.log(game);
  let lastTime = 0;

  function animate(timeStamp: number) {
    // requestAnimationFrameのコールバックメソッド[timestamp]には、DOMHighResTimeStamp が渡される。
    // 最初にコールバック関数が呼び出された時点の引数（タイムスタンプ）と
    // 以降に呼び出されたコールバック関数の引数の差分から経過時間を取得することができる。
    const deltaTime = timeStamp - lastTime;
    // console.log(deltaTime);
    lastTime = timeStamp;
    // Game画面を四角形にクリアする
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    // キャラクターの状態を更新
    game.update(deltaTime);
    // 2Dグラフィック用のcanvasctxに代入されている場合
    if (ctx) {
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
