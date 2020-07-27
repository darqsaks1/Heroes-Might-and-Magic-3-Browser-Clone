import {
  warriorConfig,
  rogueConfig,
  spearConfig,
  arbaletConfig,
} from "./battle-units-config/battle-player-units-config";

export const StateKey = "statePlayer";

export default {
  position: {
     x: 1020,
      y: 1000,
  },
  movement: 1,
  attack: 1,
  shield: 1,
  level: 1,
  day: 1,
  isAxe: false,
  isSheild: false,
  isBoots: false,
  isEpam: false,
  units: [
    {
      unit: warriorConfig,
      key: "warrior",
      count: 1000,
      boardX: 0,
      boardY: 1,
      icon: "warriorPortret",
    },
    {
      unit: rogueConfig,
      key: "rogue",
      count: 300,
      boardX: 0,
      boardY: 4,
      icon: "roguePortret",
    },
    {
      unit: spearConfig,
      key: "spear",
      count: 400,
      boardX: 0,
      boardY: 6,
      icon: "spearPortret",
    },
    {
      unit: arbaletConfig,
      key: "arbalet",
      count: 0,
      boardX: 0,
      boardY: 5,
      icon: "arbaletPortret",
    },
  ],
};
