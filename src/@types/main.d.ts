import { Player } from "../player/player";
import { Background } from "../background";
import { InputHandler } from "../input";
import { Enemy } from "../enemy/enemies";
import { FloatingMessage } from "../floatingMessage";
import { iParticle } from "../@types/particles";
import { CollisionAnimation } from "../collisionAnimation";

// Gameクラスの型定義を定義する
declare class iGame {
  debug: boolean;
  width: number;
  height: number;
  player: Player;
  input: InputHandler;
  groundMargin: number;
  speed: number;
  maxSpeed: number;
  background: Background;
  game: iGame;
  enemies: Enemy[];
  collisions: CollisionAnimation[];
  floatingMessages: FloatingMessage[];
  enemyTimer: number;
  enemyInterval: number;
  maxParticles: number;
  score: number;
  fontColor: string;
  particles: iParticle[];
  time: number;
  winningScore: number;
  maxTime: number;
  gameOver: boolean;
  lives: number;
  constructor(
    canvas: HTMLCanvasElement,
    options?: { fps?: number; skipFrame?: number }
  );
  update(dt: number): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

// 外部モジュールとしてエクスポートする
export { iGame };
