import Phaser from "phaser";
import statePlayer, { StateKey } from "../state/player-state";
import { ConfigKey } from "../state/world-scene-config/world-scene-config";
import {
  tittle,
  companyTittle,
  companyDecription,
  misTittle,
  missionTittle,
  misGoalsDescription,
  misssionDecription,
  misGoals,
} from "../assets/text/mission-description";
import { armorConfigKey } from "../state/world-scene-config/armor-config";
import { chestConfigKey } from "../state/world-scene-config/chest-config";

class MenuScene extends Phaser.Scene {
  constructor() {
    super("menuScene");
    this.statePlayer = statePlayer;
  }

  create() {
    this.click = this.sound.add("click");

    this.input.setDefaultCursor(`url(blur.cur), pointer`);
    this.add.image(177, 106, "logo").setDepth(1).setScale(0.6);
    const video = this.add.video(500, 300, "load").setDepth(0).setScale(0.89);
    video.play();
    this.addStartImage();

    this.addLearImage();
    this.add
      .image(877, 346, "back")
      .setScale(0.8)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        const state = JSON.parse(localStorage.getItem("state"));
        this.registry.set(StateKey, state.statePlayer);
        this.registry.set(ConfigKey, state.stateEnemy);
        this.registry.set(armorConfigKey, state.armorConfig);
        this.registry.set(chestConfigKey, state.chestConfig);
        this.scene.start("preloader");
      });
  }

  addLearImage() {
    this.add
      .image(877, 500, "lear")
      .setScale(0.8)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        const fullLear = this.add
          .image(530, 295, "learing")
          .setDepth(2)
          .setScale(0.9);
        const closeLear = this.add
          .image(870, 520, "closeMissionModal")
          .setScale(0.12)
          .setDepth(3)
          .setInteractive()
          .on("pointerdown", () => {
            this.click.play();
            fullLear.destroy();
            closeLear.destroy();
          });
      });
  }

  addStartImage() {
    this.add
      .image(877, 146, "start")
      .setScale(0.8)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        const fullMis = this.add
          .image(480, 295, "fullMissionModal")
          .setDepth(2)
          .setScale(0.9);
        const close = this.add
          .image(230, 520, "closeMissionModal")
          .setScale(0.12)
          .setDepth(3)
          .setInteractive()
          .on("pointerdown", () => {
            this.click.play();
            fullMis.destroy();
            close.destroy();
            game.destroy();
            this.tittle.destroy();
            this.companyTittle.destroy();
            this.companyDecription.destroy();
            this.misTittle.destroy();
            this.missionTittle.destroy();
            this.misssionDecription.destroy();
            this.misGoals.destroy();
            this.misGoalsDescription.destroy();
          });
        const game = this.add
          .image(728, 520, "game")
          .setDepth(3)
          .setScale(0.7)
          .setInteractive()
          .on("pointerdown", () => {
            this.click.play();
            this.scene.start("preloader");
          });
        this.createMissionDescription();
      });
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
  }
}

export default MenuScene;
