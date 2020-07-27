import Phaser from "phaser";
import statePlayer from "../../state/player-state";
import { epamTxt } from "../../assets/text/description";
import playerModalConig from "../../state/interface-config/player-modal-config";

class PlayerModal extends Phaser.Scene {
  constructor() {
    super("playerModal");
    this.statePlayer = statePlayer;
    this.music = null;
  }

  create() {
    this.click = this.sound.add("click");
    this.music = this.sound.add("epamAudio");
    this.renderUnitsPortrets();
    this.renderPlayerModal();
  }

  renderUnitsPortrets() {
    for (let i = 0; i < this.statePlayer.units.length; i += 1) {
      const { x, y } = playerModalConig[i];
      const { icon } = this.statePlayer.units[i];
      this.createUnitsPortrets(i, x, y, icon);
    }
  }

  createUnitsPortrets(number, x, y, key) {
    if (this.statePlayer.units[number].count > 0) {
      this.add
        .image(x, y, key)
        .setDepth(10)
        .setScale(0.07)
        .setInteractive()
        .on("pointerover", () => {
          this.image = this.add
            .image(300, 340, "hoverUnitBattle")
            .setDepth(1)
            .setScale(0.6);
          this.name = this.add
            .text(270, 260, `${this.statePlayer.units[number].unit.naming}`, {
              color: "yellow",
              fontFamily: "MedFont",
              fontSize: 20,
            })
            .setDepth(2);
          this.attack = this.add
            .text(
              270,
              295,
              `Атака: ${this.statePlayer.units[number].unit.damage}`,
              {
                fontFamily: "MedFont",
                fontSize: 14,
              }
            )
            .setDepth(2);
          this.hp = this.add
            .text(
              270,
              360,
              `Здоровье: ${this.statePlayer.units[number].unit.hp}`,
              {
                fontFamily: "MedFont",
                fontSize: 14,
              }
            )
            .setDepth(2);
        })

        .on("pointerout", () => {
          this.image.destroy();
          this.name.destroy();
          this.attack.destroy();
          this.hp.destroy();
        });
    }
  }

  renderPlayerModal() {
    this.createPlayerHoverDescription();
    this.createPlayerDescription();
    this.renderPlayerInventory();
    this.add.image(480, 295, "fullPlayerModal").setDepth(0).setScale(0.9);
    this.add
      .image(750, 513, "closePlayerModalButton")
      .setScale(0.042)
      .setDepth(1)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        this.scene.sleep();
        this.scene.resume("game");
      });
  }

  renderPlayerInventory() {
    if (this.statePlayer.isBoots === true) {
      this.add
        .image(601, 310, "bootsPort")
        .setDepth(6)
        .setScale(0.3)
        .setInteractive()
        .on("pointerover", () => {
          this.text = this.add
            .text(400, 250, `Количество ходов героя увеличено`, {
              fontSize: 12,
            })
            .setDepth(7);
        })
        .on("pointerout", () => {
          this.text.destroy();
        });
    }
    if (this.statePlayer.isEpam === true) {
      this.add
        .image(214, 214, "epamPort")
        .setDepth(4)
        .setScale(0.4)
        .setInteractive()
        .on("pointerover", () => {
          this.music.play();
          this.text = this.add
            .text(430, 160, epamTxt, {
              fontSize: 12,
            })
            .setDepth(7);
          this.img = this.add
            .image(482, 204, "hoverButton")
            .setDepth(6)
            .setScale(0.7);
        })
        .on("pointerout", () => {
          this.music.pause();
          this.text.destroy();
          this.img.destroy();
        });
      this.add
        .text(245, 200, `epam`, {
          fontFamily: "MedFont",
          fontSize: 15,
        })
        .setDepth(4);
    }
    if (this.statePlayer.isAxe === true) {
      this.add
        .image(482, 104, "axePortret")
        .setDepth(4)
        .setScale(0.35)
        .setInteractive()
        .on("pointerover", () => {
          this.textAxe = this.add
            .text(430, 230, `Атака увеличена на 4`, {
              fontSize: 12,
            })
            .setDepth(12);
        })
        .on("pointerout", () => {
          this.textAxe.destroy();
        });
    }

    if (this.statePlayer.isSheild === true) {
      this.add
        .image(687, 323, "sheildPortret")
        .setDepth(4)
        .setScale(0.35)
        .setInteractive()
        .on("pointerover", () => {
          this.textArmor = this.add
            .text(430, 230, `Защита увеличена на 4`, {
              fontSize: 12,
            })
            .setDepth(12);
        })
        .on("pointerout", () => {
          this.textArmor.destroy();
        });
    }
  }

  createPlayerDescription() {
    this.level = this.add
      .text(310, 82, `Уровень: ${statePlayer.level}`, {
        color: "burlywood",
        fontFamily: "MedFont",
      })
      .setDepth(3);

    this.attack = this.add
      .text(225, 172, `${statePlayer.attack}`, {
        fontFamily: "MedFont",
        fontSize: 12,
      })
      .setDepth(3);

    this.shield = this.add
      .text(287, 172, `${statePlayer.shield}`, {
        fontFamily: "MedFont",
        fontSize: 12,
      })
      .setDepth(3);
  }

  createPlayerHoverDescription() {
    this.add
      .image(289, 150, "shieldFullChest")
      .setDepth(1)
      .setScale(0.4)
      .setInteractive()
      .on("pointerover", () => {
        this.elmorSpellsDecr = this.add
          .text(
            250,
            95,
            `Здоровье юнитов увеличено на ${2 * statePlayer.shield}`,
            {
              fontSize: 11,
              align: "justify",
            }
          )
          .setDepth(12);
      })
      .on("pointerout", () => {
        this.elmorSpellsDecr.destroy();
      });

    this.add
      .image(226, 150, "attackFullChest")
      .setDepth(1)
      .setScale(0.35)
      .setInteractive()
      .on("pointerover", () => {
        this.elmorSpellsDecr = this.add
          .text(
            250,
            95,
            `Атака юнитов увеличена на ${2 * statePlayer.attack}`,
            {
              fontSize: 11,
              align: "justify",
            }
          )
          .setDepth(12);
      })
      .on("pointerout", () => {
        this.elmorSpellsDecr.destroy();
      });
  }
}

export default PlayerModal;
