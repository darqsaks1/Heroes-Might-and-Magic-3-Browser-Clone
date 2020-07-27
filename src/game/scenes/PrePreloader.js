import Phaser from "phaser";
import video from "../assets/video/load1.mp4";
import loaderAudio from "../assets/audio/loader.mp3";
import click from "../assets/audio/click.mp3";
import {
  closeMenuModal,
  start,
  back,
  closeMissionModal,
  fullMissionModal,
  game,
  lear,
  learing,
  loaderBackground,
  logo,
} from "../assets/images/index";

export default class PrePreloader extends Phaser.Scene {
  constructor() {
    super({ key: "prePreloader", active: true });
  }

  preload() {
    this.load.image("closeMissionModal", closeMissionModal);
    this.load.image("loaderBackground", loaderBackground);
    this.load.image("fullMissionModal", fullMissionModal);
    this.load.video("load", video);
    this.load.audio("loaderAudio", loaderAudio);
    this.load.image("closeMenuModal", closeMenuModal);
    this.load.image("start", start);
    this.load.image("back", back);
    this.load.image("game", game);
    this.load.image("logo", logo);
    this.load.image("learing", learing);
    this.load.audio("click", click);
    this.load.image("lear", lear);
    this.graphics = this.add.graphics();
    this.newGraphics = this.add.graphics();
    const progressBar = new Phaser.Geom.Rectangle(334, 200, 450, 50);
    const progressBarFill = new Phaser.Geom.Rectangle(205, 205, 290, 40);

    this.graphics.fillStyle(0xffffff, 1);
    this.graphics.fillRectShape(progressBar);

    this.newGraphics.fillStyle(0x3587e2, 1);
    this.newGraphics.fillRectShape(progressBarFill);

    const loadingText = this.add.text(390, 260, "Загрузка: ", {
      fontSize: "35px",
      fill: "#FFF",
    });

    this.load.on("progress", this.updateBar, {
      newGraphics: this.newGraphics,
      loadingText,
    });
    this.load.on("complete", this.complete, { scene: this.scene });
  }

  updateBar(percentage) {
    this.newGraphics.clear();
    this.newGraphics.fillStyle(0x0000ff, 1);
    this.newGraphics.fillRectShape(
      new Phaser.Geom.Rectangle(340, 205, percentage * 440, 40)
    );

    percentage *= 100;
    this.loadingText.setText(`Загрузка: ${percentage.toFixed(2)}%`);
  }

  complete() {
    this.scene.start("menuScene");
  }
}
