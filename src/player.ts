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
    this.x = 0;
    this.y = this.game.height - this.height;
    this.vy = 0;
    this.weight = 1;
    this.image = document.getElementById("player");
    this.speed = 0;
    this.maxSpeed = 10;
  }
  update(input: { includes: (arg0: string) => any }) {
    //　横移動
    this.x += this.speed;
    if (input.includes("ArrowRight")) this.speed = this.maxSpeed;
    else if (input.includes("ArrowLeft")) this.speed = -this.maxSpeed;
    else this.speed = 0;
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width) {
      this.x = this.game.width - this.width;
    }

    //vertical movement
    this.y += this.vy;
    if (input.includes("ArrowUp") && this.onGround()) this.vy -= 20;
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
  }
  draw(context: CanvasRenderingContext2D) {
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
  onGround() {
    return this.y >= this.game.height - this.height;
  }
}
