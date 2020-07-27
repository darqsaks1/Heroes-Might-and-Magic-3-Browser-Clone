import Phaser from "phaser";
import statePlayer from "../../state/player-state";
import {
  tittle,
  companyTittle,
  companyDecription,
  misTittle,
  missionTittle,
  misGoalsDescription,
  misssionDecription,
  misGoals,
} from "../../assets/text/mission-description";

class MissionModal extends Phaser.Scene {
  constructor() {
    super("missonModal");
  }

  create() {
    this.click = this.sound.add("click");

    this.add.image(480, 295, "fullMissionModal").setDepth(0).setScale(0.9);

    this.add
      .image(750, 520, "closeMissionModal")
      .setScale(0.1)
      .setDepth(1)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        this.scene.sleep();
        this.scene.resume("game");
        this.tittle.destroy();
        this.companyTittle.destroy();
        this.companyDecription.destroy();
        this.misTittle.destroy();
        this.missionTittle.destroy();
        this.misssionDecription.destroy();
        this.misGoals.destroy();
        this.misGoalsDescription.destroy();
        this.daysCount.destroy();
      });

    this.createMissionDescription();
  }

  createMissionDescription() {
    this.tittle = this.add
      .text(560, 42, tittle, { color: "yellow" })
      .setDepth(3);
    this.companyTittle = this.add
      .text(560, 70, companyTittle, {
        color: "yellow",
        fontSize: 14,
      })
      .setDepth(3);
    this.companyDecription = this.add
      .text(560, 83, companyDecription, {
        fontSize: 11,
      })
      .setDepth(3);
    this.misTittle = this.add.text(560, 220, misTittle, { color: "yellow" });
    this.missionTittle = this.add
      .text(560, 247, missionTittle, {
        color: "yellow",
        fontSize: 14,
      })
      .setDepth(3);
    this.misssionDecription = this.add
      .text(560, 260, misssionDecription, {
        fontSize: 11,
      })
      .setDepth(3);
    this.misGoals = this.add.text(560, 395, misGoals, { color: "yellow" });
    this.misGoalsDescription = this.add
      .text(560, 425, misGoalsDescription, {
        fontSize: 12,
      })
      .setDepth(3);
    this.daysCount = this.add
      .text(560, 480, `(${statePlayer.day}/20 день)`, {
        fontSize: 12,
      })
      .setDepth(3);
  }
}

export default MissionModal;
