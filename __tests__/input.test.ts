import { InputHandler } from "../src/input";
let judge: boolean;
const targetKeyArray: string[] = [
  "ArrowDown",
  "ArrowUp",
  "ArrowLeft",
  "ArrowRight",
  "Enter",
];
const unEspectedKeyArray: string[] = ["X", "1", "@"];

beforeEach(() => {
  let testInputHandler = new InputHandler();
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
      event = await new KeyboardEvent("keyDown", { key: key });
      await document.dispatchEvent(event);
      await expect(judge).toBeFalsy();
    });
  }
});
