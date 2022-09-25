import { Player } from "../Player";
import { Background } from "../background";
import { InputHandler } from "../input";

interface IGame {
  width: number;
  height: number;
  player: Player;
  input: InputHandler;
  groundMargin: number;
  speed: number;
  maxSpeed: number;
  background: Background;
  game: Game;
  enemyTimer: number;
  enemyInterval: number;

  update: (deltaTime: number) => void;

  draw: (context: CanvasRenderingContext2D) => void;
}
