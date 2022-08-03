type statesI = {
  SITTING: number;
  RUNNING: number;
  JUMPING: number;
  FALLING: number;
};

// キャラクターのステータス状態マスタ
const states: statesI = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
};

/**
 * キャラクターの状態マスタ
 */
class State {
  state: string;
  constructor(state: string) {
    // stateには各キャラクターステータス状態マスタのキー名が入る
    this.state = state;
  }
}

// しゃがみ状態管理クラス
export class Sitting extends State {
  private player: any;

  constructor(player: any) {
    super("SITTING");
    this.player = player;
  }
  enter() {
    // キャラクターフレームの設定
    this.player.frameX = 0;
    this.player.frameY = 5;
    this.player.maxFrame = 4;
  }
  handleInput(input: string): void {
    // 入力キーが「ArrowLeft」or「ArrowRight」の場合
    if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
      // キャラクターのステータスをセット（キャラクターフレームを設定）する
      this.player.setState(states.RUNNING, 1);
    }
  }
}

// 横移動状態管理クラス
export class Running extends State {
  private player: any;

  constructor(player: any) {
    super("RUNNING");
    this.player = player;
  }
  enter() {
    // キャラクターフレームの設定
    this.player.frameX = 0;
    this.player.frameY = 3;
    this.player.maxFrame = 6;
  }
  handleInput(input: string): void {
    // 入力キーが「ArrowDown」の場合
    if (input.includes("ArrowDown")) {
      // キャラクターのステータスをセット（キャラクターフレームを設定）する
      this.player.setState(states.SITTING, 0);
    } else if (input.includes("ArrowUp")) {
      this.player.setState(states.JUMPING, 1);
    }
  }
}

// ジャンプ状態管理クラス
export class Jumping extends State {
  private player: any;

  constructor(player: any) {
    super("JUMPING");
    this.player = player;
  }
  enter() {
    // キャラの縦位置が[静止ポジションにある]または[静止ポジションより少ない場合]、ジャンプする
    if (this.player.onGround()) this.player.vy -= 27;
    // キャラクターフレームの設定
    this.player.frameX = 0;
    this.player.frameY = 1;
    this.player.maxFrame = 6;
  }
  handleInput(input: string): void {
    // キャラクターの上空位置が重力設定値より大きい場合
    if (this.player.vy > this.player.weight) {
      // キャラクターのステータスをセット（キャラクターフレームを設定）する
      this.player.setState(states.FALLING, 1);
    }
  }
}

// ジャンプ落下状態管理クラス
export class Falling extends State {
  private player: any;

  constructor(player: any) {
    super("FALLING");
    this.player = player;
  }
  enter() {
    // キャラクターフレームの設定
    this.player.frameX = 0;
    this.player.frameY = 2;
    this.player.maxFrame = 6;
  }
  handleInput(input: string): void {
    // キャラの縦位置が[静止ポジションにある]または[静止ポジションより少ない場合]
    if (this.player.onGround()) {
      // キャラクターのステータスをセット（キャラクターフレームを設定）する
      this.player.setState(states.RUNNING, 1);
    }
  }
}
