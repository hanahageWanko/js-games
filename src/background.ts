// 背景等レイヤー統括クラス
class Layer {
  game: any;
  width: number;
  height: number;
  speedModifier: number;
  image: HTMLElement | null;
  x: number;
  y: number;
  constructor(
    game: any,
    width: number,
    height: number,
    speedModifier: number,
    image: HTMLElement | null
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
  update() {
    // 移動距離が画像幅を超えた場合、移動距離を0にする
    if (this.x < -this.width) this.x = 0;
    // スピード設定値 * 調整値分だけレイヤー画像をマイナス側に移動させる
    else this.x -= this.game.speed * this.speedModifier;
  }
  draw(context: {
    drawImage: (
      arg0: HTMLElement | null,
      arg1: number,
      arg2: number,
      arg3: number,
      arg4: number
    ) => void;
  }) {
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
  game: any;
  width: number;
  height: number;
  backgroundLayers: Layer[];
  layer1image: HTMLElement | null;
  layer2image: HTMLElement | null;
  layer3image: HTMLElement | null;
  layer4image: HTMLElement | null;
  layer5image: HTMLElement | null;
  layer1: Layer;
  layer2: Layer;
  layer3: Layer;
  layer4: Layer;
  layer5: Layer;
  constructor(game: any) {
    this.game = game;
    this.width = 1667;
    this.height = 500;
    this.layer1image = document.getElementById("layer1");
    this.layer2image = document.getElementById("layer2");
    this.layer3image = document.getElementById("layer3");
    this.layer4image = document.getElementById("layer4");
    this.layer5image = document.getElementById("layer5");
    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      0,
      this.layer1image
    );
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      0.2,
      this.layer2image
    );
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      0.4,
      this.layer3image
    );
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      0.6,
      this.layer4image
    );
    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      0.8,
      this.layer5image
    );
    this.backgroundLayers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
    ];
  }
  update() {
    this.backgroundLayers.forEach((layer: Layer): void => {
      layer.update();
    });
  }
  draw(context: {
    drawImage: (
      arg0: HTMLElement | null,
      arg1: number,
      arg2: number,
      arg3: number,
      arg4: number
    ) => void;
  }) {
    this.backgroundLayers.forEach((layer: Layer): void => {
      layer.draw(context);
    });
  }
}
