import { iGame } from "./@types/main";

/**
 * 入力キー設定クラス
 */
export class InputHandler {
  public keys: string[];
  game;

  constructor(game: iGame) {
    this.game = game;
    this.keys = [];
    /*
     * キーボードが押された場合、配列に押されたキーを挿入する
     * 十字キーまたはエンターのみ対応
     */

    // window.addEventListener("keydown", (e) => {
    document.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight" ||
          e.key === "Enter") &&
        !this.keys.includes(e.key)
      ) {
        this.keys.push(e.key);
      } else if (e.key === "e") {
        this.game.debug = !this.game.debug;
      }
    });

    /*
     * 押されたキーが戻る場合、配列のキーを削除する
     * 十字キーまたはエンターのみ対応
     */
    // window.addEventListener("keyup", (e) => {
    document.addEventListener("keyup", (e) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "Enter"
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
