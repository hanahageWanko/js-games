export class InputHandler {
  public keys: string[];
  constructor() {
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
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
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
