import { useContext } from "react";
import { tileIdToBlockId } from "../utils/PuzzleMaker";
import SubGrid from "./SubGrid";
import { GameStateContext, NetStateContext } from "../utils/Contexts";

interface GridProps {
  /** Called when the selection has changed by clicking on the grid. */
  onSelectionChange: (tileId: number) => void;
}

/** A 3x3 grid of SubGrids, each containing a 3x3 grid of tiles. */
export default function Grid({ onSelectionChange }: GridProps) {
  const netState = useContext(NetStateContext);
  const gameState = useContext(GameStateContext);

  var subGridTileIds = Array(9)
    .fill(null)
    .map((elem): number[] => []);
  {
    // build 9 groups of 9 tile ids (81 total),
    // the ids need to be sliced since were building blocks,
    // but tile indexes are organized by rows
    const total = 9 * 9;
    for (let tileId = 0; tileId < total; tileId++) {
      let blockIdx = tileIdToBlockId(tileId);
      subGridTileIds[blockIdx].push(tileId);
    }
  }

  function onTileClick(tileId: number) {
    onSelectionChange(tileId);
  }

  const isCompleted = gameState.solveResult.isCompleted;

  const subGrids = subGridTileIds.map((element, idx) => {
    return <SubGrid key={idx} tileIds={element} onTileClick={onTileClick} />;
  });

  return <div className="grid main-grid grid-col-3 grid-row-3">{subGrids}</div>;
}
