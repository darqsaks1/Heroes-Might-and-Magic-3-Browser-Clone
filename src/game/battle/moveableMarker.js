export default class MoveableMarker {
  constructor(scene, board, tileXY, chess, canAttack) {
    this.scene = scene;
    this.board = board;
    this.tileXY = tileXY;
    this.chess = chess;
    this.basicColor = "0x67daff";
    this.attackColor = "0xff1919";
    this.canAttack = canAttack;

    this.marker = this.scene.rexBoard.add
      .shape(this.board, this.tileXY.x, this.tileXY.y, -1, this.basicColor)
      .setScale(0.8)
      .on("board.pointerdown", () => {
        if (!this.chess.moveToTile(this.marker)) {
          return;
        }
        this.marker.setFillStyle(this.basicColor);
      });
    return this.marker;
  }
}
