import {
  ogrAnimation,
  orkBoarAnimation,
  trollAnimation,
  orcWolfAnimation,
  beastAnimation,
  commendantAnimation,
} from "../../animations/index";

import {
  trollTxt,
  firstBeastTxt,
  secondBeastTxt,
  firstOgrTxt,
  secondOgrTxt,
  commendantTxt,
  orkBoarTxt,
  secondOrcWolf,
  firstOrkWolfTxt,
  secondOrcWolfTxt,
  secondTrollTxt,
} from "../../assets/text/enemyUnit";

import {
  orcWolfConfig,
  ogr,
  troll,
  orcBoar,
  commendant,
  beast,
} from "../battle-units-config/battle-enemy-units-config";
import { orkWolfAttack } from "../../assets/images";

export default [
  {
    name: "firstOrcWolf",
    sprite: "orcWolf",
    text: firstOrkWolfTxt,
    animation: orcWolfAnimation,
    count: 25,
    position: {
      x: 271,
      y: 511,
    },
    units: [
      {
        unit: ogr,
        count: 6,
        boardX: 9,
        boardY: 4,
      },
      //
      {
        unit: orcWolfConfig,
        count: 20,
        boardX: 9,
        boardY: 8,
      },
    ],
  },
  {
    name: "orkBoar",
    sprite: "orkBoar",
    text: orkBoarTxt,
    animation: orkBoarAnimation,
    count: 15,
    position: {
      x: 350,
      y: 910,
    },
    units: [
      {
        unit: ogr,
        count: 21,
        boardX: 9,
        boardY: 1,
      },
      {
        unit: beast,
        count: 5,
        boardX: 9,
        boardY: 4,
      },
    ],
  },
  {
    name: "firstOgr",
    sprite: "ogr",
    animation: ogrAnimation,
    text: firstOgrTxt,
    count: 20,
    position: {
      x: 350,
      y: 1320,
    },
    units: [
      {
        unit: troll,
        count: 10,
        boardX: 9,
        boardY: 1,
      },
      {
        unit: ogr,
        count: 31,
        boardX: 9,
        boardY: 4,
      },
      //
      {
        unit: orcWolfConfig,
        count: 30,
        boardX: 9,
        boardY: 8,
      },
    ],
  },

  {
    name: "secondOgr",
    sprite: "ogr",
    text: secondOgrTxt,
    animation: ogrAnimation,
    count: 25,
    position: {
      x: 1100,
      y: 670,
    },
    units: [
      {
        unit: troll,
        count: 71,
        boardX: 9,
        boardY: 1,
      },
      {
        unit: ogr,
        count: 65,
        boardX: 9,
        boardY: 4,
      },
      //
      {
        unit: orcWolfConfig,
        count: 96,
        boardX: 9,
        boardY: 8,
      },
    ],
  },


  {
    name: "troll",
    sprite: "troll",
    text: `"Это эти уродцы? Убить их!!

    Дакка, дакка, дакка

    Ваааааг! Люди!

    ВААААААГХ!!!!"`,
    animation: trollAnimation,
    count: 15,
    position: {
      x: 900,
      y: 1010,
    },
    units: [
      {
        unit: troll,
        count: 30,
        boardX: 9,
        boardY: 1,
      },
      {
        unit: beast,
        count: 25,
        boardX: 9,
        boardY: 4,
      },
      {
        unit: orcWolfConfig,
        count: 30,
        boardX: 9,
        boardY: 8,
      },
    ],
  },


  {
    name: "firstBeast",
    sprite: "beast",
    animation: beastAnimation,
    text: firstBeastTxt,
    count: 10,
    position: {
      x: 1411,
      y: 281,
    },
    units: [
      {
        unit: beast,
        count: 60,
        boardX: 9,
        boardY: 1,
      },
      {
        unit: ogr,
        count: 61,
        boardX: 9,
        boardY: 4,
      },
      //
      {
        unit: orcWolfConfig,
        count:30,
        boardX: 9,
        boardY: 8,
      },
    ],
  },

  {
    name: "secondTroll",
    sprite: "troll",
    animation: trollAnimation,
    text: secondTrollTxt,
    count: 15,
    position: {
      x: 850,
      y: 630,
    },
    units: [
      {
        unit: troll,
        count: 40,
        boardX: 9,
        boardY: 1,
      },
      {
        unit: ogr,
        count: 45,
        boardX: 9,
        boardY: 4,
      },
      //
      {
        unit: orcWolfConfig,
        count: 70,
        boardX: 9,
        boardY: 8,
      },
    ],
  },
  {
    name: "secondOrcWolf",
    sprite: "orcWolf",
    text: secondOrcWolfTxt,
    animation: orcWolfAnimation,
    count: 35,
    position: {
      x: 1640,
      y: 1041,
    },
    units: [
      {
        unit: troll,
        count: 70,
        boardX: 9,
        boardY: 1,
      },
      {
        unit: beast,
        count: 90,
        boardX: 9,
        boardY: 4,
      },
      //
      {
        unit: orcWolfConfig,
        count: 92,
        boardX: 9,
        boardY: 8,
      },
    ],
  },
  {
    name: "secondBeast",
    sprite: "Beast",
    animation: beastAnimation,
    text: secondBeastTxt,
    count: 12,
    position: {
      x: 1399,
      y: 1750,
    },
    units: [
      {
        unit: ogr,
        count: 61,
        boardX: 9,
        boardY: 5,
      },

      {
        unit: beast,
        count: 100,
        boardX: 9,
        boardY: 1,
      },
    ],
  },

  {
    name: "commendant",
    sprite: "commend",
    text: commendantTxt,
    animation: commendantAnimation,
    count: 1,
    position: {
      x: 1630,
      y: 2000,
    },
    units: [
      {
        unit: commendant,
        count: 3,
        boardX: 9,
        boardY: 1,
      },
      {
        unit: ogr,
        count: 150,
        boardX: 9,
        boardY: 5,
      },
    ],
  },
];
