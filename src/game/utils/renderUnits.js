import NonPlayerCharacterSprite from "../sprites/NonPlayerCharacterSprite";
import { setCollisionWithArg } from "./setCollision";

export const renderFriendUnits = (
  scene,
  friendUnitConfig,
  player,
  callback
) => {
  const units = friendUnitConfig.forEach((item) => {
    const {
      position: { x, y },
      sprite,
      key,
      animation,
      text,
      count,
    } = item;
    const unit = new NonPlayerCharacterSprite(
      scene,
      x,
      y,
      sprite,
      animation,
      text,
      key,
      count
    ).setInteractive({
      cursor: `url(fr.cur), pointer`,
    });
    setCollisionWithArg(scene, unit, player, callback, text, key, count);
    return unit.setScale(0.08);
  });
  return units;
};

export const renderEnemyUnits = (scene, enemyUnitConfig, player, callback) => {
  const nonPlayerChar = enemyUnitConfig.forEach((item) => {
    const {
      position: { x, y },
      sprite,
      animation,
      text,
      name,
    } = item;
    if (item.units) {
      const { units } = item;
      const unit = new NonPlayerCharacterSprite(
        scene,
        x,
        y,
        sprite,
        animation,
        units,
        text
      ).setInteractive({
        cursor: `url(knife.cur), pointer`,
      });
      setCollisionWithArg(scene, unit, player, callback, { units, text, name });
      return unit;
    }
  });
  return nonPlayerChar;
};
