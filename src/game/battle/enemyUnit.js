import Unit from "./Unit";
import PathFinderBattle from "./PathFinderBattle";
import MoveableMarker from "./moveableMarker";
import PlayerUnit from "./PlayerUnit";

export default class EnemyUnit extends Unit {
  constructor(
    scene,
    texture,
    board,
    movingPoints,
    boardX = 9,
    boardY = 0,
    hp,
    damage,
    count,
    animation,
    icon,
    name,
    iconBattle
  ) {
    super(
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
    );
    this.board = board;
    this.isEnemy = true;
  }

  attack() {
    this.battleScene = this.scene.scene.get("battle");
    this.chesses = this.getArrayOfChess(this.rexChess.tileXYZ);
    this.arrOfPlayerUnits = [];
    if (this.chesses.length > 0) {
      this.chesses.forEach((item) => {
        if (!item.isEnemy && item.count > 0) {
          this.arrOfPlayerUnits.push(item);
        }
      });
      if (this.arrOfPlayerUnits.length > 0) {
        this.play(this.animation.key);
        this.battleScene.time.addEvent({
          delay: 1000,
          callback: this.attackClosestUnit.bind(this),
          callbackScope: this,
        });
      } else {
        this.scene.events.emit("MoveComplete");
      }
    } else {
      return this.scene.events.emit("MoveComplete");
    }
  }

  attackClosestUnit() {
    this.arrOfPlayerUnits[0].scene = this.battleScene;
    this.arrOfPlayerUnits[0].totalHp -= this.damage * this.count;
    this.arrOfPlayerUnits[0].count = Math.floor(
      this.arrOfPlayerUnits[0].totalHp / this.arrOfPlayerUnits[0].hp
    );
    this.battleScene.events.emit(
      "TakeDamage",
      this.arrOfPlayerUnits[0],
      Math.floor(this.damage * this.count)
    );
    if (
      this.arrOfPlayerUnits[0].count <= 0 &&
      this.arrOfPlayerUnits[0].scene !== undefined
    ) {
      this.battleScene.events.emit("IsDead", this.arrOfPlayerUnits[0], this);
    } else {
      this.battleScene.events.emit("MoveComplete");
    }
  }

  getPath(tileXY) {
    const tileXYArray = this.pathFinder.findPath(tileXY);
    return tileXYArray;
  }

  getArrayOfAvaliablePathes(endTiles) {
    const paths = [];
    for (let i = 0; i < endTiles.length; i += 1) {
      const path = this.getPath(endTiles[i]);
      paths.push(path);
    }
    return paths;
  }

  chooseTarget(endTiles) {
    const avaliablePathes = this.getArrayOfAvaliablePathes(endTiles);
    avaliablePathes.sort((a, b) => a.length - b.length);
    return avaliablePathes[0];
  }

  getEndTileToMove(endTiles) {
    if (endTiles.length) {
      const avaliableTiles = this.chooseTarget(endTiles);
      if (!avaliableTiles.length) {
        return false;
      }
      const endTile = avaliableTiles[avaliableTiles.length - 1];
      return endTile;
    }
  }

  getShortestPath(tile) {
    if (tile) {
      const chess = new MoveableMarker(this.scene, this.board, tile, this);
      const pathFinder = new PathFinderBattle(this.scene, chess);
      const avaliablePathes = [];
      const tileXYArray = this.pathFinder.findArea(this.movingPoints);
      for (let i = 0; i < tileXYArray.length; i += 1) {
        const path = pathFinder.findPath(tileXYArray[i]);
        avaliablePathes.push(path);
      }
      this.board.removeChess(chess, null, null, null, true);
      const truePath = avaliablePathes.sort((a, b) => a.length - b.length)[0];
      return truePath[truePath.length - 1];
    }
    return false;
  }

  getChessToFindPath(tileXY) {
    const endPoint = new MoveableMarker(this.scene, this.board, tileXY, this);
    endPoint.rexChess.setTileZ(-1);
    const path = this.pathFinder.getPath(endPoint.rexChess.tileXYZ);
    this.board.removeChess(endPoint, null, null, null, true);
    return path;
  }

  playBattle(endTiles) {
    if (endTiles) {
      const endTile = this.getEndTileToMove(endTiles);
      const avaliablePath = this.getShortestPath(endTile);
      if (avaliablePath) {
        const heroPath = this.getChessToFindPath(avaliablePath);
        const endTileCost = endTile.cost;
        for (let i = 0; i < heroPath.length; i += 1) {
          const { cost } = heroPath[i];
          if (endTileCost !== cost) {
            this.moveAlongPath(heroPath);
            return;
          }
          const path = this.getPath(endTile);
          this.moveAlongPath(path);
        }
      } else if (endTile) {
        const path = this.getPath(endTile);
        this.moveAlongPath(path);
      } else {
        this.attack();
      }
    }
  }
}
