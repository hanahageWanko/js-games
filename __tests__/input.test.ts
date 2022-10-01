import { IGame } from "../src/@types/main";
import { InputHandler } from "../src/input";

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

class Game implements IGame {
  debug = true;
  constructor() {
    this.debug = true;
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
