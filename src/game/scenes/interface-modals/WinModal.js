import Phaser from "phaser";
import statePlayer, { StateKey } from "../../state/player-state";

class WinModal extends Phaser.Scene {
  constructor() {
    super("winModal");
    this.statePlayer = statePlayer;
  }

  create() {
    this.music = this.sound.add("epamAudio");
    this.click = this.sound.add("click");
    this.music.play();
    this.battleSceneMusic = this.scene.get("battleInterface");
    this.add.image(480, 295, "win").setDepth(1).setScale(0.88);
    const video = this.add
      .video(480, 390, "loseVideo")
      .setDepth(2)
      .setScale(0.5);

    video.setMute(true);
    video.play();
    this.add
      .image(635, 505, "closePlayerModalButton")
      .setScale(0.06)
      .setDepth(1)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        this.scene.sleep();
        video.stop();
        this.statePlayer.attack += 1;
        this.statePlayer.shield += 1;
        for (let i = 0; i < this.statePlayer.units.length; i += 1) {
          this.statePlayer.units[i].unit.damage += 2;
          this.statePlayer.units[i].unit.hp += 2;
        }
        this.registry.set(StateKey, this.statePlayer);

        const gameScene = this.scene.get("game");
        const interfaceScene = this.scene.get("interface");
        const battle = this.scene.get("battle");
        gameScene.scene.start();
        interfaceScene.scene.start();
        battle.scene.sleep();
        this.scene.sleep();
        this.scene.sleep("battleInterface");
      });
  }
}

export default WinModal;
