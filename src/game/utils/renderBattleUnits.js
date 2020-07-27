import PlayerUnit from "../battle/PlayerUnit";
import EnemyUnit from "../battle/enemyUnit";

const renderBattleUnits = (
  arrayOfPlayerUnits,
  arrayOfEnemyUnits,
  scene,
  board
) => {
  const heroes = [];
  arrayOfPlayerUnits.forEach((item) => {
    const {
      movingPoints,
      damage,
      hp,
      sprite,
      animation,
      name,
      iconBattle,
    } = item.unit;
    const { boardX, boardY, icon, count } = item;
    if (count > 0) {
      return heroes.push(
        new PlayerUnit(
          scene,
          sprite,
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
        ).setScale(0.08)
      );
    }
  });
  arrayOfEnemyUnits.forEach((item) => {
    const {
      movingPoints,
      damage,
      hp,
      sprite,
      animation,
      icon,
      name,
      iconBattle,
    } = item.unit;
    const { boardX, boardY, count } = item;
    return heroes.push(
      new EnemyUnit(
        scene,
        sprite,
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
      )
        .setScale(0.6)
        .setFlipX(true)
    );
  });
  return heroes;
};

export default renderBattleUnits;
