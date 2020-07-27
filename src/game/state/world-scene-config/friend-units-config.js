import {
  humanArbaletAnimation,
  humanRogueAnimation,
  humanSpearAnimation,
  humanWarriorAnimation,
} from "../../animations";

import {
  firstHumanArbalet,
  secondHumanArbalet,
  humanRogue,
  humanSpear,
  firstHumanWarrior,
  secondHumanWarrior,
  secondRogue,
} from "../../assets/text/friendUnit";

import { warriorConfig } from "../battle-units-config/battle-player-units-config";

export default [
  {
    name: "firstHumanArbalet",
    sprite: "arbalet",
    key: "arbalet",
    text: firstHumanArbalet,
    animation: humanArbaletAnimation,
    count: 40,
    position: {
      x: 911,
      y: 231,
    },
  },

  {
    name: "secondHumanArbalet",
    sprite: "arbalet",
    key: "arbalet",
    text: secondHumanArbalet,
    animation: humanArbaletAnimation,
    count: 45,
    position: {
      x: 1840,
      y: 841,
    },
  },

  {
    name: "humanRogue",
    sprite: "rogue",
    key: "rogue",
    text: humanRogue,
    animation: humanRogueAnimation,
    count: 35,
    position: {
      x: 1611,
      y: 281,
    },
  },
  {
    name: "SecondhumanRogue",
    sprite: "rogue",
    key: "rogue",
    text: secondRogue,
    animation: humanRogueAnimation,
    count: 30,
    position: {
      x: 1411,
      y: 1200,
    },
  },
  {
    name: "humanSpear",
    sprite: "spear",
    key: "spear",
    text: humanSpear,
    animation: humanSpearAnimation,
    count: 40,
    position: {
      x: 900,
      y: 910,
    },
  },

  {
    name: "firstHumanWarrior",
    key: "warrior",
    sprite: "war",
    text: firstHumanWarrior,
    animation: humanWarriorAnimation,
    count: 30,
    position: {
      x: 320,
      y: 1290,
    },
  },

  {
    name: "secondHumanWarrior",
    key: "warrior",
    sprite: "war",
    text: secondHumanWarrior,
    animation: humanWarriorAnimation,
    count: 60,
    position: {
      x: 330,
      y: 250,
    },
  },
];
