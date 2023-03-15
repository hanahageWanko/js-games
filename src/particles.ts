import { iGame } from "./@types/main";

/**
 * 粒子系要素のクラス
 */
export class Particle {
  game;
  markedForDeletion;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  constructor(game: iGame) {
    this.game = game;
    this.markedForDeletion = false;
    this.x = 0;
    this.y = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.size = 0;
  }
  update() {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    this.size *= 0.95;
    if (this.size < 0.5) {
      this.markedForDeletion = true;
    }
  }
  draw(context: CanvasRenderingContext2D) {}
}

export class Dust extends Particle {
  color: string;
  constructor(game: iGame, x: number, y: number) {
    super(game);
    this.game = game;
    this.size = Math.random() * 10 + 10;
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.color = "rgba(0,0,0,0.2)";
  }
  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}

export class Splash extends Particle {
  gravity: number;
  image;
  constructor(game: iGame, x: number, y: number) {
    super(game);
    this.size = Math.random() * 100 + 100;
    this.x = x - this.size * 0.4;
    this.y = y - this.size * 0.5;
    this.speedX = Math.random() * 6 - 4;
    this.speedY = Math.random() * 2 + 1;
    this.gravity = 0;
    this.image = document.getElementById("fire");
  }
  update() {
    super.update();
    this.gravity += 0.1;
    this.y += this.gravity;
  }
  draw(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.image as CanvasImageSource,
      this.x,
      this.y,
      this.size,
      this.size
    );
  }
}

export class Fire extends Particle {
  image;
  angle;
  va;
  constructor(game: iGame, x: number, y: number) {
    super(game);
    this.image = document.getElementById("fire");
    this.size = Math.random() * 100 + 100;
    this.x = x;
    this.y = y;
    this.speedX = 1;
    this.speedY = 1;
    this.angle = 0;
    this.va = Math.random() * 0.2 - 0.1;
  }
  update() {
    super.update();
    this.angle += this.va;
    this.x += Math.sin(this.angle * 5);
  }
  draw(context: CanvasRenderingContext2D): void {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(
      this.image as CanvasImageSource,
      -this.size * 0.5,
      -this.size * 0.5,
      this.size,
      this.size
    );
    context.restore();
  }
}
