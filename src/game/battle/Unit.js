/* eslint-disable class-methods-use-this */
import Phaser from "phaser";
import PathFinderBattle from "./PathFinderBattle";
import MoveableMarker from "./moveableMarker";

export default class Unit extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene,
    texture,
    board,
    movingPoints,
    boardX,
    boardY,
    hp,
    damage,
    count,
    animation,
    icon,
    name,
    iconBattle
  ) {
    super(scene, 0, 0, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.animation = animation;

    this.setScale(0.7);
    this.setInteractive();

    this.scene = scene;
    this.board = board;
    this.icon = icon;
    this.name = name;
    this.iconBattle = iconBattle;
    this.battleScene = this.scene.scene.get("battle");

    this.scene.anims.create(this.animation);

    this.movingPoints = movingPoints;
    this.hp = hp;
    this.damage = damage;
    this.count = count;
    this.totalHp = this.hp * this.count;

    this.moveTo = scene.rexBoard.add.moveTo(this, {
      blockerTest: true,
    });
    this.pathFinder = new PathFinderBattle(this.scene, this);
    this.markers = [];
    this.board.addChess(this, boardX, boardY, 0);
    this.displayCountOfUnits();
    this.rexChess.setBlocker();
    this.setDepth(1);
    this.anim = this.scene.anims.get(this.animation.key);
    this.scene.input.mouse.disableContextMenu();
    this.on("board.pointerdown", (pointer) => {
      if (pointer.rightButtonDown()) {
        if (!this.hoverModal) {
          this.hoverModal = this.scene.add
            .image(pointer.x - 70, pointer.y, "hoverUnit")
            .setScale(0.5)
            .setDepth(11);

          this.hoverTextDamage = this.scene.add
            .text(
              pointer.x - 100,
              pointer.y - 44,
              `Урон:
${this.damage}`,
              { color: "black" }
            )
            .setDepth(12)
            .setScale(1);
          this.hoverTextHp = this.scene.add
            .text(
              pointer.x - 105,
              pointer.y + 20,
              `Здоровье:
${this.hp}`,
              { color: "red" }
            )
            .setDepth(12)
            .setScale(1);
        }
      }
    });
    this.on("board.pointerup", () => {
      if (this.hoverModal) {
        this.hoverModal.destroy();
        this.hoverModal = null;
        this.hoverTextDamage.destroy();
        this.hoverTextHp.destroy();
      }
    });
  }

  getNeighbor(srcTileXY) {
    const neighbor = this.board.getNeighborTileXY(srcTileXY, null);
    return neighbor;
  }

  getArrayOfChess(srcTileXY) {
    const neighbors = this.getNeighbor(srcTileXY);
    const chesses = [];
    neighbors.forEach((item) => {
      const { x, y } = item;
      const chess = this.board.tileXYZToChess(x, y, 0);
      if (chess) {
        chesses.push(chess);
      }
    });
    return chesses;
  }

  showMoveableArea() {
    if (this.battleScene.isWin) {
      return;
    }
    this.hideMoveableArea();
    const tileXYArray = this.pathFinder.findArea(this.movingPoints);
    for (let i = 0, cnt = tileXYArray.length; i < cnt; i += 1) {
      const chesses = this.getArrayOfChess(tileXYArray[i]);
      const marker = new MoveableMarker(
        this.scene,
        this.board,
        tileXYArray[i],
        this,
        false
      );
      if (chesses.length) {
        chesses.forEach((item) => {
          if (item.isEnemy) {
            marker.fillColor = "0xff1919";
            marker.canAttack = true;
          }
        });
      }
      this.markers.push(marker);
    }
  }

  hideMoveableArea() {
    for (let i = 0, cnt = this.markers.length; i < cnt; i += 1) {
      this.markers[i].destroy();
    }
    this.markers.length = 0;
  }

  moveToTile(endTile) {
    this.endTile = endTile;
    if (this.moveTo.isRunning) {
      return false;
    }
    const tileXYArray = this.pathFinder.getPath(endTile.rexChess.tileXYZ);
    this.moveAlongPath(tileXYArray);
    return true;
  }

  moveAlongPath(path) {
    if (path.length === 0) {
      if (!this.isEnemy) {
        if (this.endTile) {
          const { x, y } = this.endTile.rexChess.tileXYZ;
          const chess = this.board.tileXYZToChess(x, y, -1);
          this.neighbors = this.getArrayOfChess(chess.rexChess.tileXYZ);
          if (chess.canAttack && !this.isEnemy) {
            for (let i = 0; i < this.neighbors.length; i += 1) {
              if (this.neighbors[i].isEnemy) {
                this.setScale(0.5);
                this.play(this.animation.key);
                this.battleScene.time.addEvent({
                  delay: 500,
                  callback: this.playerAttackEnemy,
                  args: [this.neighbors[i]],
                  callbackScope: this,
                });
              }
            }
          }
          this.hideMoveableArea();
          this.scene.events.emit("MoveComplete");
        }
      } else {
        this.attack();
      }
      return;
    }
    this.moveTo.once(
      "complete",
      () => {
        this.moveAlongPath(path);
      },
      this
    );
    this.moveTo.moveTo(path.shift());
  }

  playerAttackEnemy(enemy) {
    enemy.totalHp -= this.damage * this.count;
    enemy.count = Math.floor(enemy.totalHp / enemy.hp);
    if (enemy.count <= 0) {
      this.battleScene.events.emit("IsDead", enemy, this);
    } else {
      this.battleScene.events.emit(
        "TakeDamage",
        enemy,
        this.damage * this.count
      );
    }
  }

  getWorldXYPosition() {
    const { tileXYZ } = this.rexChess;
    const { x, y } = tileXYZ;
    return this.board.tileXYToWorldXY(x, y);
  }

  displayCountOfUnits() {
    if (this.count <= 0) {
      this.board.removeChess(this, null, null, null, true);
      this.text.destroy();
    } else {
      const worldXY = this.getWorldXYPosition();
      if (this.text) {
        this.text.destroy();
      }
      this.text = this.scene.add
        .text(worldXY.x, worldXY.y + 20, `${this.count}`)
        .setDepth(10);
    }
  }

  onTakeDamage(target, damage) {
    if (target.count > 0) {
      const worldXY = target.getWorldXYPosition();
      this.damageText = this.scene.add
        .text(worldXY.x, worldXY.y - 50, `-${damage}`)
        .setDepth(11);
      setTimeout(this.damageText.destroy(), 1000);
      this.displayCountOfUnits();
    }
  }
}
