import Phaser from "phaser";
import PlayerSprite from "../sprites/PlayerSprite";
import Minimap from "../Minimap";
import worldState, {
  ConfigKey,
} from "../state/world-scene-config/world-scene-config";
import chestConfig, {
  chestConfigKey,
} from "../state/world-scene-config/chest-config";
import armorConfig, {
  armorConfigKey,
} from "../state/world-scene-config/armor-config";
import shipConfig from "../state/world-scene-config/ship-config";
import statePlayer, { StateKey } from "../state/player-state";
import PathFinder from "../../utils/PathFinder";
import {
  endPoint,
  arrowLeft,
  arrowRight,
  arrowUp,
  arrowDown,
  arrowLeftDown,
  arrowLeftUp,
  arrowRightDown,
  arrowRightUp,
} from "../assets/images";

import { renderEnemyUnits, renderFriendUnits } from "../utils/renderUnits";
import {
  renderChests,
  renderArmor,
  renderShip,
} from "../utils/renderChestsAndArmor";

const DisplayColors = {
  CollidingTileColor: [243, 234, 48, 51],
  FaceColor: [40, 39, 37, 255],
};

const MINIMAP_BACKGROUND_COLOR = 0xbababa;

const pathArrows = {
  arrowLeft,
  arrowRight,
  arrowUp,
  arrowDown,
  arrowLeftUp,
  arrowLeftDown,
  arrowRightDown,
  arrowRightUp,
};

const TILE_MAP_SIZE = 32;

export default class WorldScene extends Phaser.Scene {
  player;

  map;

  miniMap;

  cursor;

  constructor() {
    super({ key: "game" });
    this.point = undefined;
    this.angle = undefined;
    this.devil = undefined;
    this.center = undefined;
    this.statePlayer = null;
    this.worldState = null;
    this.endPoint = undefined;
    this.clickedTile = null;
    this.completePath = null;
    this.prevClickPosition = null;
    this.armorConfig = null;
    this.chestConfig = null;
  }

  create() {
    this.stateEnemy = this.registry.get(ConfigKey) || worldState;
    this.statePlayer = this.registry.get(StateKey) || statePlayer;
    this.chestConfig = this.registry.get(chestConfigKey) || chestConfig;
    this.armorConfig = this.registry.get(armorConfigKey) || armorConfig;

    this.registry.set(StateKey, this.statePlayer);
    this.registry.set(ConfigKey, this.stateEnemy);
    this.registry.set(chestConfigKey, this.chestConfig);
    this.registry.set(armorConfigKey, this.armorConfig);

    Object.keys(pathArrows).forEach((key) => {
      this.textures.addBase64(key, pathArrows[key]);
    });

    this.textures.addBase64("endpoint", endPoint);

    this.scene.sleep("battle");
    this.scene.sleep("enemyModal");
    this.map = this.make.tilemap({
      key: "map",
      tileWidth: TILE_MAP_SIZE,
      tileHeight: TILE_MAP_SIZE,
    });

    const tiles = this.map.addTilesetImage("mapSmall", "tiles");
    const terrain = this.map
      .createStaticLayer("tiles", tiles, 0, 0)
      .setInteractive({
        cursor: `url(blur.cur), pointer`,
      });

    terrain.setCollisionByProperty({ collied: true });
    this.physics.add.collider(terrain, this.player);

    this.player = new PlayerSprite(
      this,
      this.statePlayer.position.x,
      this.statePlayer.position.y,
      "player"
    );
    const width = this.map.widthInPixels;
    const height = this.map.heightInPixels;

    this.rt = this.make.renderTexture(
      {
        width,
        height,
      },
      true
    );
    this.rt.setDepth(50);

    this.rt.fill(0x000000, 0.98);
    this.rt.draw(tiles);
    this.rt.setTint(0x0a2948);

    this.brush = this.make.image({ key: "staticLayer" }, false).setScale(2.9);
    this.rt.erase(this.brush, this.player.x, this.player.y);

    this.player.setScale(1.1);

    const path = new PathFinder(this.map, tiles, this.player, this);
    path.makeGrid();
    path.getAcceptableTiles();

    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.physics.world.bounds.width = this.map.widthInPixels;
    this.physics.world.bounds.height = this.map.heightInPixels;
    renderEnemyUnits(
      this,
      this.stateEnemy.enemyUnits,
      this.player,
      this.onMeetEnemy
    );
    renderFriendUnits(
      this,
      this.stateEnemy.friendUnits,
      this.player,
      this.onMeetFriend
    );

    this.worldSceneMusic = this.scene.get("interface");

    renderChests(this, this.chestConfig, this.player, this.onMeetChest);
    renderShip(this, shipConfig, this.player, this.onEnd);
    renderArmor(this, this.armorConfig, this.player, this.onMeetArmor);

    this.input.setDefaultCursor(`url(hourse.cur), pointer`);

    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;
    this.cursor = this.input.mousePointer;

    this.input.on("pointerdown", (pointer) => {
      if (pointer.primaryDown) {
        const mapX = this.map.worldToTileX(pointer.worldX);
        const mapY = this.map.worldToTileX(pointer.worldY);

        if (this.prevClickPosition) {
          const { x, y } = this.prevClickPosition;

          if (mapX !== x || mapY !== y) {
            path.arrowGroup.children.entries.forEach((item) =>
              item.body.destroy()
            );
          }
          path.arrowGroup.clear(true);
        }

        this.prevClickPosition = {
          x: mapX,
          y: mapY,
        };

        this.clickedTile = terrain.getTileAt(mapX, mapY);
        if (!this.clickedTile.properties.collied) {
          this.player.setDepth(1);
          this.point = {
            x: Math.floor(pointer.worldX),
            y: Math.floor(pointer.worldY),
          };

          this.center = {
            x: Math.floor(this.player.x / 32),
            y: Math.floor(this.player.y / 32),
          };

          path.findPath(
            this.center.x,
            this.center.y,
            Math.floor(this.point.x / 32),
            Math.floor(this.point.y / 32)
          );

          this.endPoint = this.physics.add
            .sprite(this.point.x, this.point.y, "endpoint")
            .setScale(1.5)
            .setInteractive()
            .on("pointerdown", () => {
              path.moveCharacter(path.completePath);
              this.statePlayer.movement +=
                path.arrowGroup.children.entries.length;
              this.registry.set(StateKey, this.statePlayer);
             
            });

          path.arrowGroup.add(this.endPoint);
          path.setCollision();
        }
      }
    });
  }

  update() {
    if (this.brush) {
      this.rt.erase(this.brush, this.player.x, this.player.y);
    }
  }

  onMeetEnemy = (enemyUnits) => {
    this.worldSceneMusic.music.stop();

    this.statePlayer.position = {
      x: this.player.x + 10,
      y: this.player.y,
    };
    this.registry.set(StateKey, this.statePlayer);
    this.scene.pause("game");

    this.scene.launch("enemyModal", enemyUnits);
  };

  onMeetFriend = (friendUnits, collideObj) => {
    this.scene.launch("friendModal", friendUnits);
    this.scene.pause("game");
    for (let i = 0; i < this.statePlayer.units.length; i += 1) {
      if (this.statePlayer.units[i].key === collideObj.key) {
        this.statePlayer.units[i].count += collideObj.count;
      }
    }
    this.registry.set(StateKey, this.statePlayer);

    collideObj.destroy();
  };

  onMeetChest = (collideObj) => {
    this.scene.launch("chestModal");
    this.scene.pause("game");
    collideObj.destroy();
    this.events.emit("GetArmor");
  };

  onEnd = (collideObj) => {
    this.worldSceneMusic.music.stop();
    this.scene.launch("EndingScene");
    this.scene.sleep("game");
    this.scene.sleep("interface");
    collideObj.destroy();
  };

  onMeetArmor = (collideObj) => {
    if (collideObj.texture.key === "axe") {
      this.statePlayer.isAxe = true;
      this.statePlayer.attack += 4;
      for (let i = 0; i < this.statePlayer.units.length; i++) {
        this.statePlayer.units[i].unit.damage += 8;
      }
      this.registry.set(StateKey, this.statePlayer);
      collideObj.destroy();
    }
    if (collideObj.texture.key === "shield") {
      this.statePlayer.isSheild = true;
      this.statePlayer.shield += 4;
      for (let i = 0; i < this.statePlayer.units.length; i++) {
        this.statePlayer.units[i].unit.hp += 8;
      }
      this.registry.set(StateKey, this.statePlayer);
      collideObj.destroy();
    }
    if (collideObj.texture.key === "epam") {
      this.statePlayer.isEpam = true;
      this.registry.set(StateKey, this.statePlayer);
      collideObj.destroy();
    }
    if (collideObj.texture.key === "boots") {
      this.statePlayer.isBoots = true;

      this.registry.set(StateKey, this.statePlayer);
      collideObj.destroy();
    }

    this.events.emit("GetArmor");
  };
}
