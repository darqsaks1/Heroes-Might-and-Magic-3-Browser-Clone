import Phaser from "phaser";
import {
  up,
  upright,
  down,
  right,
  rightdown,
} from "../animations/player-animations";

export default class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x = 0, y = 0, texture = "player") {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setInteractive();
    this.body.setSize(this.width * 0.4, this.height * 0.9);
    this.body.setOffset(34, 8);
    this.setCollideWorldBounds(true);

    [up, upright, down, right, rightdown].forEach(
      scene.anims.create.bind(scene.anims)
    );
  }
}
