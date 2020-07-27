import Phaser from "phaser";
import EasyStar from "easystarjs";
import { update } from "lodash";
import statePlayer, { StateKey } from "../game/state/player-state";
import {
  right,
  upright,
  rightdown,
  down,
  up,
} from "../game/animations/player-animations";

const angelUpMinus = -1.57;
const angelDownMinus = -3.14;
const angelUpPlus = 1.57;
const angelDownPlus = 3.14;

export default class PathFinder {
  constructor(map, tiles, player, scene) {
    this.statePlayer = statePlayer;
    this.path = new EasyStar.js();
    this.map = map;
    this.tiles = tiles;
    this.player = player;
    this.scene = scene;
    this.maxMovement = 18;
    this.pathInPixels = null;
    this.completePath = null;
    this.arrowGroup = this.scene.add.group();
    this.tileSize = 32;
    this.path.enableDiagonals();
    this.countArrow = [];
    this.path.enableCornerCutting();
    this.path.enableSync();
  }

  makeGrid() {
    const grid = [];
    for (let y = 0; y < this.map.height; y += 1) {
      const col = [];
      for (let x = 0; x < this.map.width; x += 1) {
        col.push(this.getTileId(x, y));
      }
      grid.push(col);
    }
    this.path.setGrid(grid);
  }

  getAcceptableTiles() {
    const tileset = this.map.tilesets[0];
    const properties = tileset.tileProperties;
    const acceptableTiles = [];
    for (let i = tileset.firstgid - 1; i < this.tiles.total; i += 1) {
      if (!properties.hasOwnProperty(i)) {
        acceptableTiles.push(i + 1);
        continue;
      }
      if (!properties[i].collied) {
        acceptableTiles.push(i + 1);
      }
    }
    this.path.setAcceptableTiles(acceptableTiles);
  }

  findPath(fromX, fromY, toX, toY) {
    this.path.findPath(fromX, fromY, toX, toY, (path) => {
      if (path !== null) {
        this.getTilePixelPositionFromPath(path);
        this.setArrows();
        this.completePath = path;
      }
    });
    this.path.calculate();
  }

  moveCharacter = (path) => {
    const horse = this.scene.sound.add("horse");
    horse.play();

    if ((this.statePlayer.isBoots = true)) {
      this.maxMovement = 24;
    }
    if (this.statePlayer.movement <= this.maxMovement) {
      this.animateMotion();
      this.timelineMovement = this.scene.tweens.createTimeline();
      let pathX = this.player.x;
      let pathY = this.player.y;
      if (path) {
        for (let i = 0; i < path.length; i++) {
          if (i !== 0) {
            pathX = Math.floor(path[i].x * this.tileSize);
            pathY = Math.floor(path[i].y * this.tileSize);
          }
          let angle;
          if (path[i + 1]) {
            angle = Phaser.Math.Angle.Between(
              path[i].x * this.tileSize,
              path[i].y * this.tileSize,
              path[i + 1].x * this.tileSize,
              path[i + 1].y * this.tileSize
            );
          } else {
            angle = Phaser.Math.Angle.Between(
              path[i - 1].x * this.tileSize,
              path[i - 1].y * this.tileSize,
              path[i].x * this.tileSize,
              path[i].y * this.tileSize
            );
          }
          const unitSpeed = 180;

          this.timelineMovement.add({
            targets: this.player,
            x: pathX,
            y: pathY,
            duration: unitSpeed,
            ease: "",
            onStart: () => {
              this.animateMotion(angle, i);
            },
            onComplete: () => {
              if (path.length === i + 1) {
                horse.stop();
                this.player.anims.stop();
              }
            },
          });
        }
        this.timelineMovement.play();
      }
    } else {
      horse.pause();
    }
  };

  animateMotion(angle, index = 0) {
    this.previousAngle = angle;

    if (parseFloat(angle).toFixed(2) == angelUpMinus) {
      this.player.anims.play(up.key);
    }
    if (
      parseFloat(angle).toFixed(2) < angelUpMinus &&
      parseFloat(angle).toFixed(2) > angelDownMinus
    ) {
      this.player.anims.play(upright.key);
      this.player.flipX = true;
    }

    if (
      parseFloat(angle).toFixed(2) <= -0.01 &&
      parseFloat(angle).toFixed(2) > angelUpMinus
    ) {
      this.player.anims.play(upright.key);
      this.player.flipX = false;
    }
    if (angle == 0) {
      this.player.anims.play(right.key);
      this.player.flipX = false;
    }
    if (
      parseFloat(angle).toFixed(2) > 0 &&
      parseFloat(angle).toFixed(2) < angelUpPlus
    ) {
      this.player.anims.play(rightdown.key);
      this.player.flipX = false;
    }
    if (parseFloat(angle).toFixed(2) == angelUpPlus) {
      this.player.anims.play(down.key);
    }
    if (
      parseFloat(angle).toFixed(2) > angelUpPlus &&
      parseFloat(angle).toFixed(2) < angelDownPlus
    ) {
      this.player.anims.play(rightdown.key);
      this.player.flipX = true;
    }
    if (parseFloat(angle).toFixed(2) == angelDownPlus) {
      this.player.anims.play(right);
      this.player.flipX = true;
    }
  }

  getTilePixelPositionFromPath(path) {
    const positions = [];
    for (let i = 0; i < path.length; i += 1) {
      const pixelPos = {};
      const { x, y } = path[i];
      const tile = this.map.getTileAt(x, y);
      pixelPos.x = tile.pixelX;
      pixelPos.y = tile.pixelY;
      positions.push(pixelPos);
    }
    this.pathInPixels = positions;
  }

  setArrows() {
    for (let i = 0; i < this.pathInPixels.length - 1; i += 1) {
      const currX = this.pathInPixels[i].x;
      const currY = this.pathInPixels[i].y;
      const nextX = this.pathInPixels[i + 1].x;
      const nextY = this.pathInPixels[i + 1].y;

      if (currX <= nextX && currY === nextY) {
        this.arrowGroup.add(
          this.scene.physics.add.sprite(currX, currY, "arrowRight")
        );
      }
      if (currX >= nextX && currY === nextY) {
        this.arrowGroup.add(
          this.scene.physics.add.sprite(currX, currY, "arrowLeft")
        );
      }
      if (currY > nextY && currX === nextX) {
        this.arrowGroup.add(
          this.scene.physics.add.sprite(currX, currY, "arrowUp")
        );
      }
      if (currY < nextY && currX === nextX) {
        this.arrowGroup.add(
          this.scene.physics.add.sprite(currX, currY, "arrowDown")
        );
      }
      if (currY < nextY && currX > nextX) {
        this.arrowGroup.add(
          this.scene.physics.add.sprite(currX, currY, "arrowLeftDown")
        );
      }
      if (currY < nextY && currX < nextX) {
        this.arrowGroup.add(
          this.scene.physics.add.sprite(currX, currY, "arrowRightDown")
        );
      }
      if (currY > nextY && currX > nextX) {
        this.arrowGroup.add(
          this.scene.physics.add.sprite(currX, currY, "arrowLeftUp")
        );
      }
      if (currY > nextY && currX < nextX) {
        this.arrowGroup.add(
          this.scene.physics.add.sprite(currX, currY, "arrowRightUp")
        );
      }
      this.scene.physics.collide(
        this.arrowGroup.children.entries[i],
        this.player,
        () => this.arrowGroup.children.entries[i].body.destroy()
      );
    }
    this.countArrow.push(this.arrowGroup.children.entries.length);
  }

  setCollision() {
    this.arrowGroup.children.entries.forEach((item) => {
      this.scene.physics.add.overlap(item, this.player, () => item.destroy());
    });
  }

  getTileId(x, y) {
    const tile = this.map.getTileAt(x, y);
    return tile.index;
  }
}
