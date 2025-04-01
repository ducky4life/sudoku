import { useContext } from "react";
import { GameStateContext, NetStateContext } from "../utils/Contexts";
import { TileSolveState } from "../utils/gameTypes";

interface TileProps {
  /** The tile's id / index. */
  tileId: number;

  /** The solve state of the tile. */
  state?: TileSolveState;

  /** The function to call when the tile is clicked. */
  onClickEvent: () => void;
}

export default function Tile({ tileId, state, onClickEvent }: TileProps) {
  const netState = useContext(NetStateContext);
  const gameState = useContext(GameStateContext);

  const isSelected = gameState.selection === tileId;
  const isNetSelected = netState.selection.indexOf(tileId) != -1;
  const isPuzzleTile = gameState.puzzle?.tiles[tileId] != null;
  const hasError = gameState.solveResult.errors.includes(tileId);

  const candidates = state ? state.candidates : [];
  const value = state?.value;

  var content;
  if (value != null) {
    content = <span className="num-lg">{value}</span>;
  } else {
    content = candidates.map((num) => {
      const idx = num - 1;
      const col = idx % 3;
      const row = Math.trunc(idx / 3);
      return (
        <span
          key={num}
          className={`num candidate num-sm col-${col} row-${row}`}
        >
          {num}
        </span>
      );
    });
  }

  return (
    <button
      className={`tile ${isSelected ? "selected" : ""} ${
        isNetSelected ? "net-selected" : ""
      } ${isPuzzleTile ? "puzzle" : ""} ${hasError ? "error" : ""}`}
      onClick={() => onClickEvent()}
    >
      {content}
    </button>
  );
}
