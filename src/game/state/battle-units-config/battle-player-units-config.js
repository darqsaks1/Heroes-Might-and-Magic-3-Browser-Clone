import {
  warriorAttackAnimation,
  rogueAttackAnimation,
  spearAttackAnimation,
  humanArbaletAttackAnimation,
} from "../../animations/index";

export const warriorConfig = {
  name: "warrior",
  sprite: "warrior",
  animation: warriorAttackAnimation,
  icon: "warriorPortret",
  iconBattle: "battleIconWarrior",
  naming: "Воин",
  movingPoints: 3,
  hp: 15,
  damage: 3,
};

export const rogueConfig = {
  name: "rogue",
  sprite: "rogue",
  animation: rogueAttackAnimation,
  icon: "roguePortret",
  iconBattle: "battleIconRogue",
  naming: "Разбойник",
  movingPoints: 4,
  hp: 10,
  damage: 6,
};

export const spearConfig = {
  name: "spear",
  sprite: "spear",
  animation: spearAttackAnimation,
  icon: "spearPortret",
  iconBattle: "battleIconSpear",
  naming: "Копейщик",
  movingPoints: 3,
  hp: 20,
  damage: 10,
};

export const arbaletConfig = {
  name: "arbalet",
  sprite: "arbalet",
  animation: humanArbaletAttackAnimation,
  icon: "arbaletPortret",
  iconBattle: "battleIconArbalet",
  naming: "Арбалетчик",
  movingPoints: 3,
  hp: 5,
  damage: 10,
};
