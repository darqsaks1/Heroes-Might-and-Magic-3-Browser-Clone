import Phaser from "phaser";

class BattleInterface extends Phaser.Scene {
  constructor() {
    super("battleInterface");
    this.battleMusic = null
  }

  create() {
    this.add.image(535, 542, "fullBattleInterface").setDepth(0);
    this.add.image(972, 568, "roundWait").setScale(0.45);

    this.add
      .image(97, 515, "fightLose")
      .setScale(0.5)
      .setInteractive()
      .on("pointerdown", () => {
      // this.backScene()
      this.battleMusic.pause()
      this.scene.launch("looseModal");
    });
    // this.add
    //   .image(35, 568, "menuBattle")
    //   .setScale(0.33)
    //   .setInteractive()
    //   .on("pointerdown", () => {
    //     this.scene.launch("menuModal");
    //   });

    this.createBattleAudio();
  }

  createBattleAudio() {
    this.battleMusic = this.sound.add("battleAudio");
    this.battleMusic.play();
    this.add
      .image(850, 580, "battleMusOn")
      .setScale(0.25)
      .setDepth(1)
      .setInteractive()
      .on("pointerdown", () => this.battleMusic.play());

    this.add
      .image(905, 580, "battleMusOff")
      .setScale(0.25)
      .setDepth(1)
      .setInteractive()
      .on("pointerdown", () => this.battleMusic.pause());
  }

  // backScene = () => {
  //   this.scene.resume("interface");
  //   this.scene.resume("game");
  //   this.scene.pause("battle");
  // };
}

export default BattleInterface;
