import Phaser from "phaser";

import ScalePlugin from "phaser3-rex-plugins/plugins/scale-plugin";
import MoveToPlugin from "phaser3-rex-plugins/plugins/moveto-plugin";
import BoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";

export const config = {
  type: Phaser.AUTO,
  width: 1068,
  height: 595.2,
  audio: {
    disableWebAudio: true,
  },
  plugins: {
    global: [
      {
        key: "rexScale",
        plugin: ScalePlugin,
        start: true,
      },
      {
        key: "rexMoveTo",
        plugin: MoveToPlugin,
        start: true,
      },
    ],
    scene: [
      {
        key: "rexBoard",
        plugin: BoardPlugin,
        mapping: "rexBoard",
      },
    ],
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

const createGame = (partialConfig) =>
  new Phaser.Game({ ...config, ...partialConfig });

export default createGame;
