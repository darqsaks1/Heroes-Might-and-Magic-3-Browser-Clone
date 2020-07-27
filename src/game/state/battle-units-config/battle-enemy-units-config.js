import {
  ogrAttackAnimation,
  orkBoarAttackAnimation,
  trollAttackAnimation,
  orkWolfAttackAnimation,
  beastAttackAnimation,
  commendantAttackAnimation,
} from "../../animations/index";

export const orcWolfConfig = {
  name: "orcWolf",
  sprite: "orcWolf",
  animation: orkWolfAttackAnimation,
  icon: "wolfPortret",
  iconBattle: "battleIconWolf",
  naming: "Волчий всадник",
  number: "20",
  movingPoints: 5,
  hp: 10,
  damage: 3,
};

export const orcBoar = {
  name: "orcBoar",
  sprite: "orcBoar",
  animation: orkBoarAttackAnimation,
  icon: "boarPortret",
  iconBattle: "battleIconBoar",
  number: "30",
  naming: "Всадник на кобане",
  movingPoints: 4,
  hp: 12,
  damage: 4,
};

export const troll = {
  name: "troll",
  sprite: "troll",
  animation: trollAttackAnimation,
  icon: "trollPortret",
  iconBattle: "battleIconTroll",
  naming: "Троль",
  number: "35",
  movingPoints: 1,
  hp: 30,
  damage: 2,
};

export const ogr = {
  name: "ogr",
  sprite: "ogr",
  animation: ogrAttackAnimation,
  icon: "ogrPortret",
  iconBattle: "battleIconOgr",
  naming: "Огр",
  number: "30",
  movingPoints: 2,
  hp: 20,
  damage: 5,
};

export const beast = {
  name: "beast",
  sprite: "beast",
  animation: beastAttackAnimation,
  icon: "beastPortret",
  iconBattle: "battleIconBeast",
  naming: "Зверь",
  number: "15",
  movingPoints: 3,
  hp: 25,
  damage: 15,
};

export const commendant = {
  name: "commendant",
  sprite: "commend",
  animation: commendantAttackAnimation,
  icon: "commendantPortret",
  iconBattle: "battleIconCommendant",
  naming: "Коммендант",
  number: "1",
  movingPoints: 7,
  hp: 3000,
  damage: 90,
};
