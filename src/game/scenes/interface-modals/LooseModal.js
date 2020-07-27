import Phaser from "phaser";
import statePlayer, { StateKey } from "../../state/player-state";

class LooseModal extends Phaser.Scene {
  constructor() {
    super("looseModal");
    this.statePlayer = statePlayer;
  }

  create() {
    this.click = this.sound.add("click");

    this.add.image(480, 295, "lose").setDepth(1).setScale(0.88);
    const video = this.add
      .video(480, 390, "winVideo")
      .setDepth(2)
      .setScale(0.25);
    video.play();
    this.add
      .image(635, 505, "closePlayerModalButton")
      .setScale(0.06)
      .setDepth(3)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        this.scene.sleep();

        video.stop();
        this.updatePlayerState();
        const gameScene = this.scene.get("game");
        const interfaceScene = this.scene.get("interface");
        const battleScene = this.scene.get("battle");
        const battleIntercene = this.scene.get("battleInterface");
        gameScene.scene.restart();
        battleIntercene.scene.sleep();
        interfaceScene.scene.restart();
        battleScene.scene.sleep();
      });
  }

  updatePlayerState() {
    this.statePlayer.position.x = 200;
    this.statePlayer.position.y = 250;
    this.statePlayer.attack = 1;
    this.statePlayer.shield = 1;
    this.statePlayer.level = 1;
    this.statePlayer.day = 1;
    this.statePlayer.isAxe = false;
    this.statePlayer.isSheild = false;
    this.statePlayer.units[0].count = 1;
    this.statePlayer.units[1].count = 0;
    this.statePlayer.units[2].count = 0;
    this.statePlayer.units[3].count = 0;
    this.registry.set(StateKey, this.statePlayer);
  }
}

export default LooseModal;
