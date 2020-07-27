import Phaser from "phaser";
import winVideo from "../assets/video/lose.mp4";
import loseVideo from "../assets/video/win.mp4";
import sunVideo from "../assets/video/sun.mp4";
import endVideo from "../assets/video/ending.mp4";
import moonVideo from "../assets/video/moon.mp4";

import tileMapJson from "../assets/maps/map-level-11.json.txt";
import layer from "../assets/images/map/tilets-image/map.png";
import battleground from "../assets/images/battle-scene/battleground.png";

import playerBattleImage from "../assets/images/player-sprites/herobattle.png";
import battleHeroAtlasJson from "../assets/json/battle-hero.json.txt";
import playerAtlasJson from "../assets/json/player.json.txt";
import devilAtlasJson from "../assets/json/devil.json.txt";
import ogrAtlasJson from "../assets/json/ogr.json.txt";
import orcBoarAtlasJson from "../assets/json/orc-boar-stay.json.txt";
import trollAtlasJson from "../assets/json/troll.json.txt";
import orcWolfAtlasJson from "../assets/json/orcWolf.json.txt";
import beastAtlasJson from "../assets/json/beast.json.txt";
import commendantAtlasJson from "../assets/json/commendant.json.txt";
import humanArbaletAtlasJson from "../assets/json/humanArbalet1.json.txt";
import humanRogueAtlasJson from "../assets/json/humanRogue1.json.txt";
import humanSpearAtlasJson from "../assets/json/humanSpear1.json.txt";
import humanWarriorAtlasJson from "../assets/json/humanWarrior1.json.txt";
import ogrAttackAtlasJson from "../assets/json/attack/ogrAttack.json.txt";
import beastAttackAtlasJson from "../assets/json/attack/beast-attack.json.txt";
import commendantAttackAtlasJson from "../assets/json/attack/commendantAttack.json.txt";
import humanArbaletAttackAtlasJson from "../assets/json/attack/humanArbalet.json.txt";
import spearAttackAtlasJson from "../assets/json/attack/spearAttack.json.txt";
import orkBoarAttackAtlasJson from "../assets/json/attack/orkBoarAttack.json.txt";
import orkWolfAttackAtlasJson from "../assets/json/attack/orkWolfAttack.json.txt";
import rogueAttackAtlasJson from "../assets/json/attack/rogueAttack.json.txt";
import trollAttackAtlasJson from "../assets/json/attack/trollAttack.json.txt";
import warriorAttackAtlasJson from "../assets/json/attack/warriorAttack.json.txt";

import {
  endMission,
  bootsPort,
  boots,
  epam,
  epamPort,
  ship,
  NPCimage,
  ogrImage,
  playerImage,
  orcBoarImage,
  trollImage,
  orcWolfImage,
  beastImage,
  axe,
  sheild,
  chest,
  humanArbaletImage,
  humanRogueImage,
  humanSpearImage,
  humanWarriorImage,
  tiles as tilesImage,
  commendantImage,
  interfaceFull,
  ElmorAvatar,
  ElmorArmy,
  ElmorSpels,
  InterfaceMenu,
  heroIn,
  mission,
  quetMenu,
  round,
  onMusic,
  offMusic,
  elmorArmorInterface,
  smallAvatar,
  spearPortret,
  warriorPortret,
  arbaletPortret,
  roguePortret,
  hoverUnitBattle,
  leaveFromGame,
  loadGame,
  fullMenuModal,
  mainMenu,
  newGame,
  saveGame,
  closeMenuModal,
  fullChest,
  attackFullChest,
  shieldFullChest,
  enemyModalSubmit,
  enemyModal,
  closeMissionModal,
  fullMissionModal,
  fullPlayerModal,
  closePlayerModalButton,
  axePortret,
  win,
  lose,
  sheildPortret,
  fullBattleInterface,
  battleMusOn,
  battleMusOff,
  roundWait,
  fightLose,
  menuBattle,
  orkWolfAttack,
  orkBoarAttack,
  ogrAttack,
  rogueAttack,
  warriorAttack,
  beastAttack,
  trollAttack,
  commendantAttack,
  spearAttack,
  humanArbaletAttack,
  fullRound,
  closeRound,
  okRound,
  trollPortret,
  wolfPortret,
  ogrPortret,
  beastPortret,
  boarPortret,
  commendantPortret,
  logo,
  battleIconArbalet,
  battleIconBeast,
  battleIconBoar,
  battleIconCommendant,
  battleIconOgr,
  staticLayer,
  battleIconRogue,
  battleIconSpear,
  battleIconTroll,
  battleIconWarrior,
  battleIconWolf,
} from "../assets/images/index";
import horse from "../assets/audio/horse.ogg";
import epamAudio from "../assets/audio/epam.mp3";
import battleAudio from "../assets/audio/battleSceneAudio.ogg";
import worldSceneAudio from "../assets/audio/worldSceneAudio.ogg";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: "preloader" });
  }

  preload() {
    this.load.image("battleIconArbalet", battleIconArbalet);
    this.load.image("battleIconBeast", battleIconBeast);
    this.load.image("battleIconBoar", battleIconBoar);
    this.load.image("battleIconCommendant", battleIconCommendant);
    this.load.image("battleIconOgr", battleIconOgr);
    this.load.image("battleIconRogue", battleIconRogue);
    this.load.image("battleIconSpear", battleIconSpear);
    this.load.image("battleIconTroll", battleIconTroll);
    this.load.image("battleIconWarrior", battleIconWarrior);
    this.load.image("battleIconWolf", battleIconWolf);
    this.load.image("ship", ship);
    this.load.image("spearPortret", spearPortret);
    this.load.image("warriorPortret", warriorPortret);
    this.load.image("arbaletPortret", arbaletPortret);
    this.load.image("roguePortret", roguePortret);
    this.load.image("endMission", endMission);
    this.load.image("wolfPortret", wolfPortret);
    this.load.image("trollPortret", trollPortret);
    this.load.image("ogrPortret", ogrPortret);
    this.load.image("beastPortrer", beastPortret);
    this.load.image("boarPortret", boarPortret);
    this.load.image("commendantPortret", commendantPortret);
    this.load.video("ending", endVideo);
    this.load.video("moonVideo", moonVideo);
    this.load.video("sunVideo", sunVideo);
    this.load.video("winVideo", winVideo);
    this.load.video("loseVideo", loseVideo);
    this.load.image("fullRound", fullRound);
    this.load.image("closeRound", closeRound);
    this.load.image("okRound", okRound);
    this.load.image("epam", epam);
    this.load.tilemapTiledJSON("map", tileMapJson);
    this.load.audio("battleAudio", battleAudio);
    this.wolrdAudio = this.load.audio("mainAudio", worldSceneAudio);
    this.load.audio("horse", horse);

    this.load.audio("epamAudio", epamAudio);
    this.load.image("epam", epam);
    this.load.image("win", win);
    this.load.image("lose", lose);
    this.load.image("epamPort", epamPort);
    this.load.image("boots", boots);
    this.load.image("bootsPort", bootsPort);
    this.load.image("shield", sheild);
    this.load.image("axe", axe);
    this.load.image("chest", chest);
    this.load.image("modal", "../../images/interface/modal.png");
    this.load.image("tiles", tilesImage);
    this.load.image("elmorArmorInterface", elmorArmorInterface);
    this.load.image("small-avatar", smallAvatar);
    this.load.image("playerModal", heroIn);
    this.load.image("round", round);
    this.load.image("misson", mission);
    this.load.image("exitMenu", quetMenu);
    this.load.image("interfaceImage", interfaceFull);
    this.load.image("ElmorAvatar", ElmorAvatar);

    this.load.image("ElmorArmy", ElmorArmy);
    this.load.image("ElmorSpels", ElmorSpels);
    this.load.image("hoverButton", hoverUnitBattle);
    this.load.image("interfaceMenu", InterfaceMenu);
    this.load.image("onMusic", onMusic);
    this.load.image("offMusic", offMusic);
    this.load.image("layer", layer);
    this.load.image("battleground", battleground);
    this.load.image("hoverUnit", hoverUnitBattle);
    this.load.image("fullBattleInterface", fullBattleInterface);
    this.load.image("battleMusOn", battleMusOn);
    this.load.image("roundWait", roundWait);
    this.load.image("battleMusOff", battleMusOff);
    this.load.image("fightLose", fightLose);
    this.load.image("menuBattle", menuBattle);
    this.load.image("fullPlayerModal", fullPlayerModal);
    this.load.image("closePlayerModalButton", closePlayerModalButton);
    this.load.image("shieldFullChest", shieldFullChest);
    this.load.image("attackFullChest", attackFullChest);
    this.load.image("axePortret", axePortret);
    this.load.image("sheildPortret", sheildPortret);
    this.load.image("ElmorSpels", ElmorSpels);
    this.load.image("hoverUnitBattle", hoverUnitBattle);
    this.load.image("closeMissionModal", closeMissionModal);
    this.load.image("fullMissionModal", fullMissionModal);
    this.load.image("enemyModal", enemyModal);
    this.load.image("enemyModalSubmit", enemyModalSubmit);
    this.load.image("fullChest", fullChest);
    this.load.image("attackFullChest", attackFullChest);
    this.load.image("shieldFullChest", shieldFullChest);
    this.load.image("fullMenuModal", fullMenuModal);
    this.load.image("loadGame", loadGame);
    this.load.image("saveGame", saveGame);
    this.load.image("newGame", newGame);
    this.load.image("leaveFromGame", leaveFromGame);
    this.load.image("mainMenu", mainMenu);
    this.load.image("closeMenuModal", closeMenuModal);
    this.load.image("staticLayer", staticLayer);
    this.load.atlas("beastAttack", beastAttack, beastAttackAtlasJson);
    this.load.atlas(
      "commendantAttack",
      commendantAttack,
      commendantAttackAtlasJson
    );
    this.load.atlas(
      "humanArbaletAttack",
      humanArbaletAttack,
      humanArbaletAttackAtlasJson
    );
    this.load.atlas("player", playerImage, playerAtlasJson);
    this.load.atlas("npc", NPCimage, devilAtlasJson);
    this.load.atlas("ogr", ogrImage, ogrAtlasJson);
    this.load.atlas("troll", trollImage, trollAtlasJson);
    this.load.atlas("orkBoar", orcBoarImage, orcBoarAtlasJson);
    this.load.atlas("orcWolf", orcWolfImage, orcWolfAtlasJson);
    this.load.atlas("beast", beastImage, beastAtlasJson);
    this.load.atlas("commend", commendantImage, commendantAtlasJson);
    this.load.atlas("warrior", humanWarriorImage, humanWarriorAtlasJson);
    this.load.atlas("spear", humanSpearImage, humanSpearAtlasJson);
    this.load.atlas("rogue", humanRogueImage, humanRogueAtlasJson);
    this.load.atlas("arbalet", humanArbaletImage, humanArbaletAtlasJson);
    this.load.atlas("ogrAttack", ogrAttack, ogrAttackAtlasJson);
    this.load.atlas("orkBoarAttack", orkBoarAttack, orkBoarAttackAtlasJson);
    this.load.atlas("orkWolfAttack", orkWolfAttack, orkWolfAttackAtlasJson);
    this.load.atlas("rogueAttack", rogueAttack, rogueAttackAtlasJson);
    this.load.atlas("spearAttack", spearAttack, spearAttackAtlasJson);
    this.load.atlas("trollAttack", trollAttack, trollAttackAtlasJson);
    this.load.atlas("warriorAttack", warriorAttack, warriorAttackAtlasJson);
    this.load.atlas("battlePlayer", playerBattleImage, battleHeroAtlasJson);

    this.graphics = this.add.graphics();
    this.newGraphics = this.add.graphics();
    const progressBar = new Phaser.Geom.Rectangle(334, 200, 450, 50);
    const progressBarFill = new Phaser.Geom.Rectangle(205, 205, 290, 40);

    this.graphics.fillStyle(0xffffff, 1);
    this.graphics.fillRectShape(progressBar);

    this.newGraphics.fillStyle(0x3587e2, 1);
    this.newGraphics.fillRectShape(progressBarFill);

    const loadingText = this.add.text(390, 280, "Загрузка: ", {
      fontFamily: "MedFont",
      fontSize: "60px",
      color: "#fff",
      fontWeight: "bold",
    });

    this.createImage();
    this.load.on("progress", this.updateBar, {
      newGraphics: this.newGraphics,
      loadingText,
    });
    this.load.on("complete", this.complete, { scene: this.scene });
  }

  createImage() {
    this.add.image(537, 292, "loaderBackground").setScale(0.57).setDepth(-1);
  }

  updateBar(percentage) {
    this.newGraphics.clear();
    this.newGraphics.fillStyle(0x0000ff, 1);
    this.newGraphics.fillRectShape(
      new Phaser.Geom.Rectangle(340, 205, percentage * 440, 40)
    );

    percentage *= 100;
    this.loadingText.setText(`Загрузка: ${percentage.toFixed(2)}%`);
  }

  complete() {
    this.scene.start("game");
    this.scene.run("interface");
  }
}
