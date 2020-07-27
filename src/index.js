import app from "./app";
import game from "./game";

function onMounted(gameContainer, onGameCreatedHook) {
  game.run(gameContainer, onGameCreatedHook);
}

app.run(onMounted);
