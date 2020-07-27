import Phaser from "phaser";
import statePlayer, { StateKey } from "../../state/player-state";
import { ConfigKey } from "../../state/world-scene-config/world-scene-config";
import { chestConfigKey } from "../../state/world-scene-config/chest-config";
import { armorConfigKey } from "../../state/world-scene-config/armor-config";

class MenuModal extends Phaser.Scene {
  constructor() {
    super("menuModal");
    this.statePlayer = statePlayer;
  }

  create() {
    this.click = this.sound.add("click");

    this.createNewGame();
    this.add.image(480, 295, "fullMenuModal").setDepth(0).setScale(0.57);
    this.add.image(480, 315, "loadGame").setScale(0.075);
    this.add
      .image(537, 202, "saveGame")
      .setScale(0.075)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        const playerState = this.registry.get(StateKey);
        const worldState = this.registry.get(ConfigKey);
        const chestState = this.registry.get(chestConfigKey);
        const armorState = this.registry.get(armorConfigKey);
        const world = this.scene.get("game");
        playerState.position = {
          x: world.player.x,
          y: world.player.y,
        };

        const state = {
          stateEnemy: worldState,
          statePlayer: playerState,
          chestConfig: chestState,
          armorConfig: armorState,
        };
        localStorage.setItem("state", JSON.stringify(state));
      });

    this.add
      .image(424, 202, "leaveFromGame")
      .setScale(0.075)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        this.scene.launch("looseModal");
      });
    this.add
      .image(537, 260, "closeMenuModal")
      .setScale(0.075)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        this.scene.resume("game");
        this.scene.sleep();
      });
  }

  createNewGame() {
    this.add
      .image(424, 260, "newGame")
      .setScale(0.075)
      .setDepth(3)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        this.updateState();
        const gameScene = this.scene.get("game");
        const interfaceScene = this.scene.get("interface");
        gameScene.scene.restart();
        interfaceScene.scene.restart();
        this.scene.sleep();
      });
  }

  updateState() {
    this.statePlayer.attack = 1;
    this.statePlayer.shield = 1;
    this.statePlayer.level = 1;
    this.statePlayer.day = 1;
    this.statePlayer.isAxe = false;
    this.statePlayer.isSheild = false;
    this.statePlayer.units[0].count = 1;
    this.statePlayer.units[1].count = 0;
    this.statePlayer.units[2].count = 0;
    this.statePlayer.units[3].count = 0;
    this.registry.set(StateKey, this.statePlayer);
  }

  openExternalLink() {
    const tweet = "I am testing a button from within a Phaser example";
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweet
    )}`;
    const s = window.open(url, "_blank");
    if (s && s.focus) {
      s.focus();
    } else if (!s) {
      window.location.href = url;
    }
  }
}

export default MenuModal;
