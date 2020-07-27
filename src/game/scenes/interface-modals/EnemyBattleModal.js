import Phaser from "phaser";

class EnemyBattleModal extends Phaser.Scene {
  constructor() {
    super("enemyModal");
  }

  init(enemyUnits) {
    this.enemyUnits = enemyUnits;
  }

  create() {
    this.click = this.sound.add("click");
    
    this.add.image(480, 295, "enemyModal").setDepth(0).setScale(0.58);
    this.text = this.add.text(310, 215, this.enemyUnits.text, { fontSize: 12 });
    this.add
      .image(482, 372, "enemyModalSubmit")
      .setScale(0.6)
      .setDepth(1)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        this.scene.sleep("game");
        this.scene.sleep("interface");
        this.scene.sleep();
        this.scene.launch("battle", this.enemyUnits);
      });
  }
}

export default EnemyBattleModal;
