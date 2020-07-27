const COLOR_HEX_BORDER = 0x49599a;

export default class BattleBoard {
  constructor(scene) {
    this.scene = scene;
    this.board = this.scene.rexBoard.add.board({
      grid: {
        gridType: "hexagonGrid",
        x: 250,
        y: 50,
        size: 35,
        staggeraxis: "x",
        staggerindex: "odd",
      },
      width: 10,
      height: 10,
    });
    this.board.setInteractive();
    this.prevShape = null;
  }

  init() {
    this.renderHex();
    return this.board;
  }

  renderHex() {
    const graphics = this.scene.add.graphics({
      lineStyle: {
        width: 2,
        color: COLOR_HEX_BORDER,
        alpha: 1,
      },
    });
    this.board.forEachTileXY((tileXY, boardBattle) => {
      const points = boardBattle.getGridPoints(tileXY.x, tileXY.y, true);
      graphics.strokePoints(points, true);
    });
  }

  handleClicks() {
    this.board
      .on("tileover", (pointer, tileXY) => {
        const tileX = tileXY.x;
        const tileY = tileXY.y;
        const shape = this.board.worldXYToChess(
          pointer.worldX,
          pointer.worldY,
          0
        );
        const chess = this.board.worldXYToChess(
          pointer.worldX,
          pointer.worldY,
          1
        );
        if (!chess && !shape) {
          this.scene.rexBoard.add
            .shape(this.board, tileX, tileY, 0, 0x67daff)
            .setScale(0.9);
          this.prevShape = this.board.tileXYZToChess(tileX, tileY, 0);
        }
      })
      .on("tileout", () => {
        if (this.prevShape) {
          this.prevShape.destroy();
        }
      });
  }
}
