import React, { createContext } from "react";

export const GameContext = createContext(null);

function GameProvider({ children, game }) {
  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}

export default GameProvider;
