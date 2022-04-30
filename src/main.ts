import { Player } from "./player";
import { InputHandler } from "./input";

window.addEventListener("load", function () {
  const canvas = <HTMLCanvasElement>document.getElementById("canvas1");
  const ctx = (canvas! as HTMLCanvasElement).getContext("2d");
  canvas!.width = 500;
  canvas!.height = 500;

  class Game {
    width: number;
    height: number;
    player: any;
    input: any;
    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler();
    }
    update() {
      this.player.update(this.input.keys);
    }
    draw(context: CanvasRenderingContext2D) {
      this.player.draw(context);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  console.log(game);

  function animate() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    if (ctx) {
      game.draw(ctx);
      requestAnimationFrame(animate);
    }
  }
  animate();
});
