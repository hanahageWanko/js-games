import { IGame } from "./@types/main";

/**
 * 画面上のUI用クラス
 */
export class Ui {
  game: IGame;
  fontSize: number;
  fontFamily: string;
  constructor(game: IGame) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Helvetica";
  }
  draw(context: CanvasRenderingContext2D) {
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;
    //score
    context.fillText("Score: " + this.game.score, 20, 50);
  }
}
