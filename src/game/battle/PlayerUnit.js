import Unit from "./Unit";

export default class PlayerUnit extends Unit {
  constructor(
    scene,
    texture,
    board,
    movingPoints,
    boardX = 0,
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
    this.isEnemy = false;
  }
}
