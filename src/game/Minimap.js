import Phaser from "phaser";

export default class Minimap extends Phaser.Cameras.Scene2D.Camera {
  constructor(
    { scene, x = 857, y = -65, width = 220, height = 220, zoom = 0.1, scroll },
    player
  ) {
    super(x, y, width, height);
    this.scene = scene;
    this.zoom = zoom;
    this.scroll = scroll;
    this.player = player;
  }

  init() {
    this.scene.cameras.cameras.push(this);
    this.scene.cameras.addExisting(this);
    this.scene.cameras.main.startFollow(this.player);
    this.setZoom(this.zoom);

    this.setScroll(this.scroll.x, this.scroll.y);

    return this;
  }
}
