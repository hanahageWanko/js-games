import { Player } from "../Player";
import { Background } from "../background";
import { InputHandler } from "../input";
import { Enemy } from "../enemy/enemies";
import { FloatingMessage } from "../floatingMessage";
import { IParticle } from "../@types/particles";

type IGameRequired = Required<{
  debug: boolean;
  width: number;
  height: number;
  player: Player;
  input: InputHandler;
  groundMargin: number;
  speed: number;
  maxSpeed: number;
  background: Background;
  game: Game;
  enemies: Enemy[];
  collisions: CollisionAnimation[];
  floatingMessages: FloatingMessage[];
  enemyTimer: number;
  enemyInterval: number;
  maxParticles: number;
  score: number;
  fontColor: string;
  particles: IParticle[];
  time: number;
  winningScore: number;
  maxTime: number;
  gameOver: boolean;
  lives: number;
}>;

type IGamePartial = Partial<{
  update: (deltaTime: number) => void;
  draw: (context: CanvasRenderingContext2D) => void;
}>;

type IGame = IGameRequired & IGamePartial;
