import createGame from "./createGame";
import createGameInstance from "./createInstance";
import WorldScene from "./scenes/WorldScene";
import InterfaceScene from "./scenes/InterfaceScene";
import BattleScene from "./scenes/BattleScene";
import EndingScene from "./scenes/EndingScene";
import BattleInterface from "./scenes/battleInterface";
import EnemyBattleModal from "./scenes/interface-modals/EnemyBattleModal";
import FriendWorldModal from "./scenes/interface-modals/FriendWorldModal";
import MenuModal from "./scenes/interface-modals/MenuModal";
import MissionModal from "./scenes/interface-modals/MissionModal";
import PlayerModal from "./scenes/interface-modals/PlayerModal";
import ChestModal from "./scenes/interface-modals/ChestModal";
import Preloader from "./scenes/Preloader";
import WinModal from "./scenes/interface-modals/WinModal";
import LooseModal from "./scenes/interface-modals/LooseModal";
import MenuScene from "./scenes/MenuScene";
import PrePreloader from "./scenes/PrePreloader";

function run(container, onGameCreatedHook) {
  const instance = createGameInstance(onGameCreatedHook);

  instance.value = createGame({
    autoStart: false,
    parent: container,
    dom: {
      createContainer: true,
    },
    scene: [
      PrePreloader,
      MenuScene,
      Preloader,
      WorldScene,
      InterfaceScene,
      EnemyBattleModal,
      BattleScene,
      EndingScene,
      BattleInterface,
      MenuModal,
      MissionModal,
      PlayerModal,
      FriendWorldModal,
      ChestModal,
      WinModal,
      LooseModal,
    ],
  });
}

export default { run };
