import Phaser from "phaser";
import statePlayer, { StateKey } from "../../state/player-state";

class ChestModal extends Phaser.Scene {
  constructor() {
    super("chestModal");
    this.statePlayer = statePlayer;
  }

  create() {
    this.click = this.sound.add("click");

    this.add.image(480, 295, "fullChest").setDepth(0).setScale(1);
    this.add
      .image(410, 384, "attackFullChest")
      .setScale(0.65)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        this.statePlayer.attack += 2;
        for (let i = 0; i < this.statePlayer.units.length; i++ ) {
          this.statePlayer.units[i].unit.damage += 2
        }
        this.registry.set(StateKey, this.statePlayer);
        this.scene.sleep();
        this.scene.resume("game");
      });
    this.add
      .image(560, 381, "shieldFullChest")
      .setScale(0.8)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        this.statePlayer.shield += 2;
        for (let i = 0; i < this.statePlayer.units.length; i++ ) {
          this.statePlayer.units[i].unit.hp += 2
        }
        this.registry.set(StateKey, this.statePlayer);
        this.scene.sleep();
        this.scene.resume("game");
      });
  }
}

export default ChestModal;
