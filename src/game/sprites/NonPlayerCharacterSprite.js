import Phaser from "phaser";

class NonPlayerCharacterSprite extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x = 0, y = 0, texture, config, units, key, count) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(0.7);

    this.units = units;
    this.config = config;
    this.key = key;
    this.count = count;
    this.body.setOffset(14, 18);
    this.body.setOffset(1, 1);
    this.setCollideWorldBounds(true);
    scene.anims.create(this.config);
    this.playNpcAnimation();
  }

  playNpcAnimation() {
    this.play(this.config.key);
  }
}

export default NonPlayerCharacterSprite;
