import { Player } from "./player";
import { Dust, Fire, Splash } from "../particles";
import { IGame } from "../@types/main";
interface statesI {
  SITTING: number;
  RUNNING: number;
  JUMPING: number;
  FALLING: number;
  ROLLING: number;
  DIVING: number;
  HIT: number;
}

/**
 * キャラクターのステータス状態マスタ
 */
const states: statesI = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
  DIVING: 5,
  HIT: 6,
};

/**
 * キャラクターの状態マスタ
 */
class State {
  state: string;
  game: IGame;
  // playerの状態をgameクラス経由で取得するように変更
  constructor(state: string, game: IGame) {
    // stateには各キャラクターステータス状態マスタのキー名が入る
    this.state = state;
    this.game = game;
  }
}

/**
 * しゃがみ状態管理クラス
 */
export class Sitting extends State {
  constructor(game: IGame) {
    super("SITTING", game);
  }
  /**
   * キャラクターフレームの設定
   */
  enter(): void {
    this.game.player.frameX = 0;
    this.game.player.frameY = 5;
    this.game.player.maxFrame = 4;
  }
  /**
   * キャラクターのステータスをセット（キャラクターフレームを設定）する
   * @param input string
   */
  handleInput(input: string): void {
    // 入力キーが「ArrowLeft」or「ArrowRight」の場合
    if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
      // キャラクターのステータスをセット（キャラクターフレームを設定）する
      this.game.player.setState(states.RUNNING, 1);
    } else if (input.includes("Enter")) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}

/**
 * 横移動状態管理クラス
 */
export class Running extends State {
  constructor(game: IGame) {
    super("RUNNING", game);
  }
  /**
   * キャラクターフレームの設定
   */
  enter(): void {
    this.game.player.frameX = 0;
    this.game.player.frameY = 3;
    this.game.player.maxFrame = 6;
  }

  /**
   * キャラクターのステータスをセット（キャラクターフレームを設定）する
   * @param input string
   */
  handleInput(input: string): void {
    this.game.particles.push(
      new Dust(
        this.game,
        this.game.player.x + this.game.player.width * 0.6,
        this.game.player.y + this.game.player.height
      )
    );
    // 入力キーが「ArrowDown」の場合
    if (input.includes("ArrowDown")) {
      // キャラクターのステータスをセット（キャラクターフレームを設定）する
      this.game.player.setState(states.SITTING, 0);
    } else if (input.includes("ArrowUp")) {
      this.game.player.setState(states.JUMPING, 1);
    } else if (input.includes("Enter")) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}

/**
 * ジャンプ状態管理クラス
 */
export class Jumping extends State {
  constructor(game: IGame) {
    super("JUMPING", game);
  }
  /**
   * キャラクターフレームの設定
   */
  enter(): void {
    // キャラの縦位置が[静止ポジションにある]または[静止ポジションより少ない場合]、ジャンプする
    if (this.game.player.onGround()) this.game.player.vy -= 27;
    // キャラクターフレームの設定
    this.game.player.frameX = 0;
    this.game.player.frameY = 1;
    this.game.player.maxFrame = 6;
  }

  /**
   * キャラクターのステータスをセット（キャラクターフレームを設定）する
   * @param input string
   */
  handleInput(input: string): void {
    // キャラクターの上空位置が重力設定値より大きい場合
    if (this.game.player.vy > this.game.player.weight) {
      // キャラクターのステータスをセット（キャラクターフレームを設定）する
      this.game.player.setState(states.FALLING, 1);
    } else if (input.includes("Enter")) {
      this.game.player.setState(states.ROLLING, 2);
    } else if (input.includes("ArrowDown")) {
      this.game.player.setState(states.DIVING, 0);
    }
  }
}

/**
 * ジャンプ落下状態管理クラス
 */
export class Falling extends State {
  constructor(game: IGame) {
    super("FALLING", game);
  }

  /**
   * キャラクターフレームの設定
   */
  enter(): void {
    // キャラクターフレームの設定
    this.game.player.frameX = 0;
    this.game.player.frameY = 2;
    this.game.player.maxFrame = 6;
  }

  /**
   * キャラクターのステータスをセット（キャラクターフレームを設定）する
   * @param input string
   */
  handleInput(input: string): void {
    // キャラの縦位置が[静止ポジションにある]または[静止ポジションより少ない場合]
    if (this.game.player.onGround()) {
      // キャラクターのステータスをセット（キャラクターフレームを設定）する
      this.game.player.setState(states.RUNNING, 1);
    }
  }
}

/**
 * ローリング状態管理クラス
 */
export class Rolling extends State {
  constructor(game: IGame) {
    super("ROLLING", game);
  }

  /**
   * キャラクターフレームの設定
   */
  enter(): void {
    // キャラクターフレームの設定
    this.game.player.frameX = 0;
    this.game.player.frameY = 6;
    this.game.player.maxFrame = 6;
  }

  /**
   * キャラクターのステータスをセット（キャラクターフレームを設定）する
   * @param input string
   */
  handleInput(input: string): void {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    );
    // キャラの縦位置が[静止ポジションにある]または[静止ポジションより少ない場合]
    if (!input.includes("Enter") && this.game.player.onGround()) {
      // キャラクターのステータスをセット（キャラクターフレームを設定）する
      this.game.player.setState(states.RUNNING, 1);
    } else if (!input.includes("Enter") && !this.game.player.onGround()) {
      // キャラクターのステータスをセット（キャラクターフレームを設定）する
      this.game.player.setState(states.FALLING, 1);
    } else if (
      input.includes("Enter") &&
      input.includes("ArrowUp") &&
      this.game.player.onGround()
    ) {
      this.game.player.vy -= 27;
    }
  }
}

/**
 * ダイビング状態管理クラス
 */
export class Diving extends State {
  constructor(game: IGame) {
    super("DIVING", game);
  }

  /**
   * キャラクターフレームの設定
   */
  enter(): void {
    // キャラクターフレームの設定
    this.game.player.frameX = 0;
    this.game.player.frameY = 6;
    this.game.player.maxFrame = 6;
    this.game.player.vy = 15;
  }

  /**
   * キャラクターのステータスをセット（キャラクターフレームを設定）する
   * @param input string
   */
  handleInput(input: string): void {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    );
    // キャラの縦位置が[静止ポジションにある]または[静止ポジションより少ない場合]
    if (this.game.player.onGround()) {
      // キャラクターのステータスをセット（キャラクターフレームを設定）する
      this.game.player.setState(states.RUNNING, 1);
      for (let i = 0; i < 30; i++) {
        this.game.particles.unshift(
          new Splash(
            this.game,
            this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.height
          )
        );
      }
    } else if (input.includes("Enter") && this.game.player.onGround()) {
      // キャラクターのステータスをセット（キャラクターフレームを設定）する
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}

/**
 * 敵との接触状態管理クラス
 */
export class Hit extends State {
  constructor(game: IGame) {
    super("HIT", game);
  }

  /**
   * キャラクターフレームの設定
   */
  enter(): void {
    // キャラクターフレームの設定
    this.game.player.frameX = 0;
    this.game.player.frameY = 4;
    this.game.player.maxFrame = 10;
  }

  /**
   * キャラクターのステータスをセット（キャラクターフレームを設定）する
   * @param input string
   */
  handleInput(input: string): void {
    // キャラの縦位置が[静止ポジションにある]または[静止ポジションより少ない場合]
    if (this.game.player.frameX >= 10 && this.game.player.onGround()) {
      // キャラクターのステータスをセット（キャラクターフレームを設定）する
      this.game.player.setState(states.RUNNING, 1);
    } else if (input.includes("Enter") && !this.game.player.onGround()) {
      this.game.player.setState(states.FALLING, 2);
    }
  }
}
