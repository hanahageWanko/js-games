import { Player } from "./player";
import { InputHandler } from "./input";

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
    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler();
    }
    update() {
      // キャラクターの状態を更新
      this.player.update(this.input.keys);
    }
    draw(context: CanvasRenderingContext2D) {
      // キャラクターを出力
      this.player.draw(context);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  console.log(game);

  function animate() {
    // Game画面を四角形にクリアする
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    // キャラクターの状態を更新
    game.update();
    // 2Dグラフィック用のcanvasctxに代入されている場合
    if (ctx) {
      // キャラクターを出力
      game.draw(ctx);
      /*
       * ブラウザの描画更新単位と同じ単位でコールされる
       * 次の再描画が行われる前に次のアニメーションをする関数を呼び出す
       */
      requestAnimationFrame(animate);
    }
  }
  animate();
});
