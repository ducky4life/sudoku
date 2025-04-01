import { OnlineGameContext } from "./utils/Contexts";
import GameWebSocket from "./utils/GameWebSocket";
import Game from "./components/Game";

import "./App.scss";

// create online connection
var gameSocket = new GameWebSocket();

export default function App() {
  return (
    <OnlineGameContext.Provider value={gameSocket}>
      <Game />
    </OnlineGameContext.Provider>
  );
}
