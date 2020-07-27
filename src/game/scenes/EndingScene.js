import Phaser from "phaser";

class EndingScene extends Phaser.Scene {
  constructor() {
    super("EndingScene");
  }

  create() {
    this.click = this.sound.add("click");
    const video = this.add.video(543, 290, "ending").setDepth(0).setScale(0.85);
    video.play();
    this.time.addEvent({
      delay: 10000,
      callback: this.addModal,
      callbackScope: this,
    });
  }

  addModal = () => {
    this.add.image(530, 300, "endMission").setScale(0.75);
    this.add
      .image(900, 500, "okRound")
      .setScale(0.45)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        this.scene.start("menuScene");
        this.scene.sleep();
      });
  };
}

export default EndingScene;
