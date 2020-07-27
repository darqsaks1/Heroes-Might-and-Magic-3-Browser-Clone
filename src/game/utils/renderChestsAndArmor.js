import ArmorSprites from "../sprites/ArmorSprites";
import ChestsSprites from "../sprites/ChestsSprite";
import ShipSprite from "../sprites/ShipSprite";
import { setCollision } from "./setCollision";

export const renderChests = (scene, chestsConfig, player, callback) => {
  const chests = chestsConfig.forEach((item) => {
    const {
      sprite,
      position: { x, y },
    } = item;
    const chest = new ChestsSprites(scene, x, y, sprite);
    setCollision(scene, chest, player, callback);
    return chest.setScale(0.3);
  });
  return chests;
};

export const renderArmor = (scene, armorConfig, player, callback) => {
  const armors = armorConfig.forEach((item) => {
    const {
      sprite,
      position: { x, y },
    } = item;
    const armor = new ArmorSprites(scene, x, y, sprite);
    setCollision(scene, armor, player, callback);
    return armor.setScale(0.25);
  });
  return armors;
};

export const renderShip = (scene, armorConfig, player, callback) => {
  const armors = armorConfig.forEach((item) => {
    const {
      sprite,
      position: { x, y },
    } = item;
    const armor = new ShipSprite(scene, x, y, sprite);
    setCollision(scene, armor, player, callback);
    return armor.setScale(0.6);
  });
  return armors;
};
