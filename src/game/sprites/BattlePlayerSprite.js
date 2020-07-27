import Phaser from "phaser";
import { battlePlayer } from "../animations";

export default class BattlePlayerSprite extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x = 0, y = 0, texture = "battlePlayer") {
    super(scene, x, y, texture);
    scene.add.existing(this);

    this.setInteractive();

    scene.anims.create(battlePlayer);
  }

  playAnimation() {
    this.play("battlePlayer");
  }
}
