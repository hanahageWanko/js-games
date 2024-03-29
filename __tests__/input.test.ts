import { iGame } from "../src/@types/main";
import { Enemy } from "../src/enemy/enemies";
import { InputHandler } from "../src/input";
import { Player } from "../src/player/player";
import { Background } from "../src/background";
import { Particle } from "../src/particles";
import { CollisionAnimation } from "../src/collisionAnimation";
import { FloatingMessage } from "../src/floatingMessage";

let judge: boolean;
const targetKeyArray: string[] = [
  "ArrowDown",
  "ArrowUp",
  "ArrowLeft",
  "ArrowRight",
  "Enter",
];

const targetKeyArrayDebug: string[] = ["e"];
const unEspectedKeyArray: string[] = ["X", "1", "@"];

class Game implements iGame {
  debug = true;
  width: 0;
  height: 0;
  player: Player;
  input: InputHandler;
  groundMargin: number;
  speed: 0;
  maxSpeed: 0;
  background: Background;
  game!: this;
  enemies: Enemy[];
  collisions: CollisionAnimation[];
  floatingMessages: FloatingMessage[];
  enemyTimer: number;
  enemyInterval: number;
  maxParticles: number;
  score;
  fontColor;
  particles: Particle[];
  time: number;
  winningScore: number;
  maxTime: number;
  gameOver: boolean;
  lives: number;
  constructor() {
    this.debug = true;
    this.width = 0;
    this.height = 0;
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.groundMargin = 0;
    this.speed = 0;
    this.maxSpeed = 0;
    this.background = new Background(this);
    this.game = this;
    this.enemies = [];
    this.collisions = [];
    this.floatingMessages = [];
    this.particles = [];
    this.enemyTimer = 0;
    this.enemyInterval = 0;
    this.maxParticles = 50;
    this.score = 0;
    this.fontColor = "black";
    this.time = 0;
    this.winningScore = 40;
    this.maxTime = 2000;
    this.gameOver = false;
    this.lives = 5;
  }
  update(dt: number): void {
    throw new Error("Method not implemented.");
  }
  draw(ctx: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }
}
const game = new Game();
beforeEach(() => {
  let testInputHandler = new InputHandler(game);
  document.addEventListener("keyup", keyUpEventHandler, false);
  document.addEventListener("keydown", keyDownEventHandler, false);

  function keyDownEventHandler(e: KeyboardEvent) {
    if (!(e instanceof KeyboardEvent)) {
      return;
    }
    judge = testInputHandler.keys.includes(e.key);
    // return testInputHandler.keys.includes(e.key);
    // return false;
  }
  function keyUpEventHandler(e: KeyboardEvent) {
    if (!(e instanceof KeyboardEvent)) {
      return;
    }
    judge = testInputHandler.keys.includes(e.key);
    // return testInputHandler.keys.includes(e.key);
  }
});

describe("inputClassのテスト", () => {
  let event: KeyboardEvent;

  for (const key of targetKeyArray) {
    test(`keyDownでinputClassのプロパティにkeyが保存される：${key}`, async () => {
      event = await new KeyboardEvent("keydown", { key: key });
      await document.dispatchEvent(event);
      await expect(judge).toBeTruthy();
    });

    test(`keyUpでinputClassのプロパティからkeyが除去される：${key}`, async () => {
      event = await new KeyboardEvent("keyup", { key: key });
      await document.dispatchEvent(event);
      await expect(judge).toBeFalsy();
    });
  }

  for (const key of unEspectedKeyArray) {
    test(`予期せぬ値の為、keyDownでもinputClassのプロパティにkeyが保存されない：${key}`, async () => {
      event = await new KeyboardEvent(key, { key: key });
      await document.dispatchEvent(event);
      await expect(judge).toBeFalsy();
    });
  }

  test(`keyDownでGameクラスのメンバー：debugがtoggleする：e`, async () => {
    let testInputHandler = new InputHandler(game);
    await expect(game.debug).toBeTruthy();
    event = await new KeyboardEvent("keydown", { key: "e" });
    await document.dispatchEvent(event);
    await expect(game.debug).toBeFalsy();
  });
});
