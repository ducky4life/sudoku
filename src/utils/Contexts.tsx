import { createContext } from "react";
import { GameState } from "./gameTypes";
import { NetState } from "./onlineTypes";
import GameWebSocket from "./GameWebSocket";

export const ThemeContext = createContext("dark");

export const GameStateContext = createContext<GameState>({
  history: [],
  solveResult: { isCompleted: false, errors: [] },
});

export const NetStateContext = createContext<NetState>({
  status: "offline",
  userSelection: new Map(),
  selection: [],
});

export const OnlineGameContext = createContext<GameWebSocket | undefined>(
  undefined
);
