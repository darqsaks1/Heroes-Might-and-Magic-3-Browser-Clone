import Phaser from "phaser";
import { config } from "../createGame";
import worldSceneAudio from "../assets/audio/worldSceneAudio.ogg";
import { StateKey } from "../state/player-state";
import interfacePortretsConfig from "../state/interface-config/interface-portrets-config";

import { interfaceHover } from "../assets/text/description";

export default class InterfaceScene extends Phaser.Scene {
  bar;

  w = config.width;

  h = config.height;

  constructor() {
    super({ key: "interface" });
    this.elmorSpellsDecr = null;
    this.statePlayer = null;
    this.spearPort = null;
    this.unitPortrets = [];
    this.spearText = null;
    this.music = null;
    this.maxMovement = 18;
  }

  preload() {
    this.statePlayer = this.registry.get(StateKey);
  }

  create() {
    this.add.image(980, 78, 'tiles').setScale(0.052).setDepth()
    this.click = this.sound.add("click");
    this.music = this.sound.add("mainAudio");
    this.music.setVolume(10)
    this.music.play();
    this.renderInterfaceImages();
    this.renderUnitsPortrets();
    this.registry.events.on("changedata", this.updateData, this);
    this.bar = this.add.graphics(config.width - 120, 0);
  }

  renderUnitsPortrets() {
    for (let i = 0; i < this.statePlayer.units.length; i += 1) {
      const { xImg, yImg, xText, yText } = interfacePortretsConfig[i];
      const { icon } = this.statePlayer.units[i];
      this.createUnitsPortrets(xImg, yImg, icon, i, xText, yText);
    }
  }

  renderInterfaceImages() {
    this.renderHoverInformation();
    this.renderMusicButtons();
    this.renderStaticImages();
    this.renderMenuButtons();
    this.renderRoundButton();
  }

  createUnitsPortrets(xImg, yImg, keyImg, number, xText, yText) {
    if (this.statePlayer.units[number].count > 0) {
      this.unitPortrets.push(
        this.add.image(xImg, yImg, keyImg).setScale(0.038).setDepth(12)
      );
      this.unitPortrets.push(
        this.add
          .text(xText, yText, `${this.statePlayer.units[number].count}`, {
            fontFamily: "MedFont",
            fontSize: 12,
          })
          .setDepth(12)
      );
    }
  }

  renderHoverInformation() {
    this.day = this.add
      .text(920, 520, `День: ${this.statePlayer.day}`, {
        fontFamily: "MedFont",
      })
      .setDepth(25);

    this.add
      .image(991, 398, "elmorArmorInterface")
      .setScale(0.33)
      .setDepth(10)
      .setInteractive()
      .on("pointerover", () => {
        this.elmorSpellsDecr = this.add
          .text(725, 360, interfaceHover, {
            fontSize: 12,
            align: "justify",
          })
          .setDepth(12);
        this.tittleBack = this.add
          .image(780, 430, "hoverButton")
          .setScale(0.85);
      })
      .on("pointerout", () => {
        this.elmorSpellsDecr.destroy();
        this.tittleBack.destroy();
      });
    this.attack = this.add
      .text(977, 410, `${this.statePlayer.attack}`, {
        fontFamily: "MedFont",
        fontSize: 12,
      })
      .setDepth(11);

    this.shield = this.add
      .text(1000, 410, `${this.statePlayer.shield}`, {
        fontFamily: "MedFont",
        fontSize: 12,
      })
      .setDepth(11);
  }

  renderMusicButtons() {
    this.add
      .image(984, 170, "onMusic")
      .setScale(0.2)
      .setDepth(9)
      .setInteractive()
      .on("pointerdown", () => this.music.play());
    this.add
      .image(1010, 170, "offMusic")
      .setScale(0.2)
      .setDepth(9)
      .setInteractive()
      .on("pointerdown", () =>
        this.music.isPlaying ? this.music.pause() : console.log("bug")
      );
  }

  renderRoundButton() {
    this.add
      .image(995, 349, "round")
      .setScale(0.42)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        if (this.statePlayer.movement >= this.maxMovement) {
          this.statePlayer.movement = 0;
          this.statePlayer.day += 1;

          this.registry.set(StateKey, this.statePlayer);
          this.sun = this.add
            .video(990, 552, "sunVideo")
            .setDepth(20)
            .setScale(0.11);
          this.sun.play();
          this.time.addEvent({
            delay: 3000,
            callback: this.hideVideo,
            callbackScope: this,
          });
        } else {
          this.fullRound = this.add
            .image(500, 300, "fullRound")
            .setDepth(1)
            .setScale(1.3);
          this.okRound = this.add
            .image(450, 366, "okRound")
            .setDepth(2)
            .setScale(0.6)
            .setInteractive()
            .on("pointerdown", () => {
              this.click.play();
              this.statePlayer.movement = 0;
              this.statePlayer.day += 1;
              if (this.statePlayer.day === 20) {
                this.scene.launch("looseModal");
                this.scene.pause();
              }
              this.registry.set(StateKey, this.statePlayer);
              this.fullRound.destroy();
              this.okRound.destroy();
              this.closeRound.destroy();
              this.moon = this.add
                .video(990, 552, "moonVideo")
                .setDepth(20)
                .setScale(0.11);
              this.moon.play();
              this.time.addEvent({
                delay: 3000,
                callback: this.hideVideo,
                callbackScope: this,
              });
            });
          this.closeRound = this.add
            .image(560, 367, "closeRound")
            .setDepth(2)
            .setScale(0.6)
            .setInteractive()
            .on("pointerdown", () => {
              this.click.play();
              this.fullRound.destroy();
              this.okRound.destroy();
              this.closeRound.destroy();
            });
        }
        this.registry.set(StateKey, this.statePlayer);
      });
  }

  hideVideo = () => {
    if (this.sun) {
      this.sun.destroy();
    }
    if (this.moon) {
      this.moon.destroy();
    }
  };

  renderMenuButtons() {
    this.add.image(940, 169, "small-avatar").setScale(0.53);
    this.add
      .image(996, 325, "playerModal")
      .setScale(0.42)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        this.scene.pause("game");
        this.scene.launch("playerModal");
      });

    this.add
      .image(984, 298, "misson")
      .setScale(0.23)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        this.scene.pause("game");
        this.scene.launch("missonModal");
      });

    this.add
      .image(1010, 298, "exitMenu")
      .setScale(0.23)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.pause("game");
        this.click.play();
        this.scene.launch("menuModal");
      });
  }

  renderStaticImages() {
    const staticScale = 0.8;
    this.add.image(989, 259, "interfaceMenu").setScale(staticScale).setDepth(4);
    this.add.image(1003, 407, "ElmorSpels").setScale(staticScale);
    this.add
      .image(533, 297, "interfaceImage")
      .setScale(staticScale)
      .setDepth(5);
    this.add.image(987, 445, "ElmorArmy").setScale(0.9);
    this.add.image(987, 437, "ElmorAvatar").setScale(staticScale).setDepth(3);
  }

  updateAttackAndArmor() {
    this.attack.destroy();
    this.shield.destroy();
    this.attack = this.add
      .text(977, 410, `${this.statePlayer.attack}`, {
        fontFamily: "MedFont",
        fontSize: 12,
      })
      .setDepth(11);
    this.shield = this.add
      .text(1000, 410, `${this.statePlayer.shield}`, {
        fontFamily: "MedFont",
        fontSize: 12,
      })
      .setDepth(11);
  }

  updateData() {
    this.updateArmyState();
    this.updateAttackAndArmor();
    this.day.destroy();

    this.day = this.add
      .text(920, 520, `День: ${this.statePlayer.day}`, {
        fontFamily: "MedFont",
      })
      .setDepth(26);
  }

  updateArmyState() {
    this.unitPortrets.forEach((item) => {
      item.destroy();
    });
    this.unitPortrets = [];
    this.renderUnitsPortrets();
  }

}
