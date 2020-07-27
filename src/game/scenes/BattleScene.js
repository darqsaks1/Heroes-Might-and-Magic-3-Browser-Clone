import Phaser from "phaser";
import BattlePlayerSprite from "../sprites/BattlePlayerSprite";
import BattleBoard from "../battle/BattleBoard";
import PlayerUnit from "../battle/PlayerUnit";
import { StateKey } from "../state/player-state";
import battleIconsConfig from "../state/interface-config/battle-icons-config";
import renderBattleUnits from "../utils/renderBattleUnits";
import { ConfigKey } from "../state/world-scene-config/world-scene-config";

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super("battle");
    this.battlePlayer = null;
    this.prevShape = null;
    this.heroes = [];
    this.index = -1;
    this.enemyUnits = null;
    this.worldState = null;
    this.sequenceIcons = [];
    this.needRestart = false;
  }

  init(data) {
    this.enemyName = data.name;
    this.enemyUnits = data.units;
  }

  create() {
    this.isWin = false;

    this.statePlayer = this.registry.get(StateKey);
    this.worldState = this.registry.get(ConfigKey);
    this.battleSceneMusic = this.scene.get("battleInterface");

    this.scene.launch("battleInterface");
    const image = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "battleground"
    );

    const scaleX = this.cameras.main.width / image.width;
    const scaleY = this.cameras.main.height / image.height;
    const scale = Math.max(scaleX, scaleY);

    this.board = new BattleBoard(this).init();
    this.board.setInteractive();

    this.heroes = renderBattleUnits(
      this.statePlayer.units,
      this.enemyUnits,
      this,
      this.board
    );

    this.battlePlayer = new BattlePlayerSprite(this, 50, 120, "battlePlayer");
    image.setScale(scale).setScrollFactor(0);

    if (this.battlePlayer !== null) {
      this.battlePlayer.playAnimation();
    }

    this.events.on("IsDead", this.deleteUnitFromState.bind(this), this);
    this.events.on("TakeDamage", this.onTakeDamage, this);
    this.events.on("MoveComplete", this.nextTurn, this);
    this.events.on("GameOver", this.onGameOver, this);
    this.events.on("OnWin", this.onWin, this);

    this.nextTurn();
  }

  update() {
    if (this.heroes.length && !this.isWin) {
      this.heroes.forEach((item) => {
        if (item.count > 0) {
          const worldXY = item.getWorldXYPosition();
          item.text.x = worldXY.x - 10;
          item.text.y = worldXY.y + 20;
        }
      });
    }
  }

  onWin() {
    if (this.damageText) {
      this.damageText.destroy();
    }
    this.battleSceneMusic.battleMusic.pause();
    this.setPlayerUnitsState();
    this.setEnemyUnitsState();
    this.scene.launch("winModal");

    this.events.off("IsDead", this.deleteUnitFromState, this);
    this.events.off("TakeDamage", this.onTakeDamage, this);
    this.events.off("MoveComplete", this.nextTurn, this);
    this.events.off("GameOver", this.onGameOver, this);
    this.events.off("OnWin", this.onWin, this);

    this.heroes.forEach((item) => {
      item.hideMoveableArea();
      item.text.destroy();
    });
    this.battlePlayer = null;
    this.prevShape = null;
    this.heroes = [];
    this.index = -1;
    this.sequenceIcons = [];
    this.board.removeAllChess(true);
    this.board.destroy();
  }

  onTakeDamage(target, damage) {
    if (target.count > 0) {
      const worldXY = target.getWorldXYPosition();
      this.damageText = this.add
        .text(worldXY.x, worldXY.y - 50, `-${damage}`)
        .setDepth(10);
      setTimeout(() => this.damageText.destroy(), 600);
      // this.displayCountOfUnits();
      if (target.text) {
        target.text.destroy();
        target.text = this.add
          .text(worldXY.x, worldXY.y + 20, `${target.count}`)
          .setDepth(10);
      }
    }
  }

  nextTurn() {
    this.index += 1;
    this.renderSequenceOfMoves();
    let isPlayerUnit = false;
    const enemyUnits = [];
    this.heroes.forEach((item) => {
      item.hideMoveableArea();
      if (item.damageText) {
        item.damageText.destroy();
      }
      if (!item.isEnemy) {
        isPlayerUnit = true;
      } else {
        enemyUnits.push(item);
      }
    });
    if (isPlayerUnit) {
      if (this.index >= this.heroes.length) {
        this.index = 0;
      }
      const hero = this.heroes[this.index];
      if (!hero.isEnemy && !this.isWin) {
        this.time.addEvent({
          delay: 600,
          callback: hero.showMoveableArea,
          callbackScope: hero,
        });
      } else {
        const directions = this.getDirections(this.heroes, hero);
        const endTiles = this.getEndTiles(this.heroes, directions);
        hero.playBattle(endTiles);
      }
    } else {
      this.events.emit("GameOver");
    }
  }

  onGameOver() {
    this.scene.sleep("battleInterface");
    this.battleSceneMusic.battleMusic.pause();
    this.scene.launch("looseModal");
  }

  setPlayerUnitsState() {
    for (let i = 0; i < this.heroes.length; i += 1) {
      const unit = this.heroes[i];
      for (let j = 0; j < this.statePlayer.units.length; j += 1) {
        const unitFromState = this.statePlayer.units[j];
        if (unit.name === unitFromState.key) {
          this.statePlayer.units[j].count = unit.count;
        }
      }
    }
    this.registry.set(StateKey, this.statePlayer);
  }

  setEnemyUnitsState() {
    const { enemyUnits } = this.worldState;
    for (let i = 0; i < enemyUnits.length; i += 1) {
      const enemy = enemyUnits[i];
      if (enemy.name === this.enemyName) {
        enemyUnits.splice(i, 1);
      }
    }
    this.worldState.enemyUnits = enemyUnits;
    this.registry.set(ConfigKey, this.worldState);
  }

  deleteUnitFromState(unit, hero) {
    const index = this.heroes.indexOf(unit);
    this.heroes.forEach((item) => {
      if (item.name === unit.name) {
        item.hideMoveableArea();
        this.heroes.splice(index, 1);
        this.board.removeChess(item, null, null, null, true);
        item.text.destroy();
        item.destroy();
      }
    });
    const enemyUnits = [];
    this.heroes.forEach((item) => {
      if (item.isEnemy) {
        enemyUnits.push(item);
      }
    });
    if (!enemyUnits.length) {
      this.isWin = true;
      this.events.emit("OnWin");
    }
    if (hero.isEnemy && !this.isWin) {
      unit.hideMoveableArea();
      this.events.emit("MoveComplete");
    }
  }

  renderSequenceOfMoves() {
    if (this.sequenceIcons.length) {
      this.sequenceIcons.forEach((item) => {
        item.destroy();
      });
      this.sequenceIcons = [];
    }
    for (let i = 0; i < this.heroes.length; i += 1) {
      const { iconBattle } = this.heroes[i];
      const { x, y } = battleIconsConfig[i];
      if (i === this.index) {
        const { icon } = this.heroes[i];
        const iconActive = this.add
          .image(x, y, iconBattle)
          .setScale(0.08)
          .setDepth(10);
        this.sequenceIcons.push(iconActive);
      } else {
        const iconUnit = this.add
          .image(x, y, iconBattle)
          .setScale(0.08)
          .setDepth(10);
        this.sequenceIcons.push(iconUnit);
      }
    }
  }

  getDirections(heroesArr, currentHero) {
    const directions = [];
    for (let i = 0; i < heroesArr.length; i += 1) {
      if (heroesArr[i] instanceof PlayerUnit) {
        const direction = this.board.directionBetween(
          heroesArr[i],
          currentHero,
          false
        );
        directions.push(direction);
      }
    }
    return directions;
  }

  getEndTiles(heroesArr, directions) {
    const endTiles = [];
    for (let i = 0; i < directions.length; i += 1) {
      const tile = this.board.getNeighborTileXY(
        heroesArr[i],
        `${directions[i]}`
      );
      endTiles.push(tile);
    }
    return endTiles;
  }
}
