import { useContext } from "react";
import { GameStateContext } from "../utils/Contexts";
import GameTimer from "./GameTimer";

/**
 * Displays the difficulty rating of the current puzzle.
 */
export function PuzzleDifficulty({}) {
  const gameState = useContext(GameStateContext);

  return <span>Difficulty {gameState.puzzle?.difficulty}</span>;
}

/**
 * Displays a header with info about the current puzzle.
 */
export default function PuzzleInfo({}) {
  const gameState = useContext(GameStateContext);

  if (!gameState.puzzle) {
    return <></>;
  }

  return (
    <span className="puzzle-info text-lg">
      <span>Difficulty {gameState.puzzle?.difficulty}</span>
      <span> | </span>
      <GameTimer />
    </span>
  );
}
