import { iGame } from "./@types/main";
// 背景等レイヤー統括クラス
class Layer {
  game: iGame;
  width: number;
  height: number;
  speedModifier: number;
  image: CanvasImageSource;
  x: number;
  y: number;
  constructor(
    game: iGame,
    width: number,
    height: number,
    speedModifier: number,
    image: CanvasImageSource
  ) {
    this.game = game;
    this.width = width;
    this.height = height;
    // スピード調整修飾子
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }

  update(): void {
    // 移動距離が画像幅を超えた場合、移動距離を0にする
    if (this.x < -this.width) this.x = 0;
    // スピード設定値 * 調整値分だけレイヤー画像をマイナス側に移動させる
    else this.x -= this.game.speed * this.speedModifier;
  }

  draw(context: CanvasRenderingContext2D): void {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    // 移動距離分画像をずらして表示
    context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

export class Background {
  game: iGame;
  width: number;
  height: number;
  backgroundLayers: Layer[] = [];
  layerImages: HTMLElement[] = [];
  layerImageNames: string[] = [];
  constructor(game: iGame, layerImageNames: string[]) {
    this.game = game;
    this.width = 1667;
    this.height = 500;
    layerImageNames.forEach((layerName, i) => {
      const layer: Layer = new Layer(
        this.game,
        this.width,
        this.height,
        i / 10, // default 0
        document.getElementById(`${layerName}`)! as CanvasImageSource
      );
      this.backgroundLayers.push(layer);
    });
  }

  update(): void {
    this.backgroundLayers.forEach((layer: Layer): void => {
      layer.update();
    });
  }

  draw(context: {
    drawImage: (
      arg0: CanvasImageSource,
      arg1: number,
      arg2: number,
      arg3: number,
      arg4: number
    ) => void;
  }): void {
    this.backgroundLayers.forEach((layer: Layer): void => {
      layer.draw(context as CanvasRenderingContext2D);
    });
  }
}
