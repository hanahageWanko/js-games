import { IGame } from "./@types/main";
import { Player } from "./player/player";
import { InputHandler } from "./input";
import { Background } from "./background";
import {
  Enemy,
  FlyingEnemy,
  GroundEnemy,
  ClimbingEnemy,
} from "./enemy/enemies";

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
    width;
    height;
    player: Player;
    input: InputHandler;
    groundMargin;
    speed;
    maxSpeed;
    background: Background;
    game!: Game;
    enemies: Enemy[];
    enemyTimer = 0;
    enemyInterval = 1000;
    debug;

    /**
     *
     * @param width number
     * @param height number
     */
    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
      // ゲーム画面最下部からのマージン
      this.groundMargin = 80;
      // ゲームのスピード設定値
      this.speed = 0;
      // ゲームのマックススピード設定値
      this.maxSpeed = 3;
      // 背景画像の設定
      this.background = new Background(this);
      // プレイヤーのキャラクター
      this.player = new Player(this);
      // プレイヤーの入出力制御
      this.input = new InputHandler(this);
      // 画面に出力されている敵
      this.enemies = [];
      // 敵キャラ制御時間
      this.enemyTimer = 0;
      this.debug = true;
    }

    /**
     * キャラクターの状態を更新
     * @param deltaTime number
     */
    update(deltaTime: number): void {
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      // 敵キャラのタイマーが、敵キャラ出現インターバルを超えた場合
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      // 敵キャラ
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
        // 敵キャラが画面外となった場合、敵キャラ出力用配列から削除する
        if (enemy.markedForDeletion)
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
      });
    }

    /**
     * キャラクターを出力
     * @param context CanvasRenderingContext2D
     */
    draw(context: CanvasRenderingContext2D): void {
      this.background.draw(context);
      // キャラクターを出力
      this.player.draw(context);
      // 敵キャラの出力
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
    }

    /**
     * 画面に出力する敵の追加
     */
    addEnemy(): void {
      // 出現する種別の条件を設定
      // speedが0以上、0.5以下の時、地上の敵を出力
      if (this.speed > 0 && Math.random() < 0.5) {
        this.enemies.push(new GroundEnemy(this));
      } else if (this.speed > 0) {
        // speedが0より大きい時、上下する敵を出力
        this.enemies.push(new ClimbingEnemy(this));
      }
      // 飛行する敵は条件に関係なく出力
      this.enemies.push(new FlyingEnemy(this));
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
