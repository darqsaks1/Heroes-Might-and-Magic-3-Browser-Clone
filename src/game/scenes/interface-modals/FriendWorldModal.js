import Phaser from "phaser";

class FriendWorldModal extends Phaser.Scene {
  constructor() {
    super("friendModal");
  }

  init(friendUnits) {
    this.friendUnits = friendUnits;
  }

  create() {
    this.click = this.sound.add("click");
    this.add.image(480, 295, "enemyModal").setDepth(1).setScale(0.58);
    this.text = this.add
      .text(310, 215, this.friendUnits, { fontSize: 12 })
      .setDepth(5);

    this.add
      .image(482, 372, "enemyModalSubmit")
      .setScale(0.6)
      .setDepth(1)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        this.text.destroy();
        this.scene.sleep();
        this.scene.resume("game");
      });
  }
}

export default FriendWorldModal;
