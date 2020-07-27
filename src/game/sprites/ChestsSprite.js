import Phaser from "phaser";

class ChestsSprite extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x = 0, y = 0, sprite) {
    super(scene, x, y, sprite);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setInteractive();
    this.setCollideWorldBounds(true);
  }
}

export default ChestsSprite;
