export class Player {
  protected game: any;
  protected width: number;
  protected height: number;
  protected x: number;
  protected y: number;
  protected image: HTMLElement | null;
  protected vy: number;
  protected speed: number;
  protected maxSpeed: number;
  protected weight: number;

  constructor(game: any) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    // キャラクターの横軸の設置位置
    this.x = 0;
    // キャラクターの縦軸の設置位置(静止ポジション)
    this.y = this.game.height - this.height;
    // キャラクターの
    this.vy = 0;
    this.weight = 1;
    this.image = document.getElementById("player");
    this.speed = 0;
    this.maxSpeed = 10;
  }
  update(input: { includes: (arg0: string) => any }): void {
    //横移動
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

    //縦移動
    this.y += this.vy;
    // 配列にArrowUpが含まれており、キャラの縦位置が画面の縦領域に対し余裕がある場合、キャラ位置を上に移動する
    if (input.includes("ArrowUp") && this.onGround()) this.vy -= 20;
    this.y += this.vy;
    // キャラの縦方向の位置が静止ポジションより高い場合、重力を足して、落下させる
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
  }
  draw(context: CanvasRenderingContext2D): void {
    // 使用範囲を指定してイメージを描画する
    context.drawImage(
      this.image as CanvasImageSource,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  onGround(): boolean {
    // キャラの縦位置が静止ポジションにあるまたは静止ポジションより少ない場合、trueを返却
    return this.y >= this.game.height - this.height;
  }
}
