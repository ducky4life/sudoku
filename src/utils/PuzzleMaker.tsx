import sudoku from "sudoku";
import { Puzzle, PuzzleSolution } from "./gameTypes";

/** Return the block id that contains a tile id. */
export function tileIdToBlockId(tileId: number): number {
  // divide by 9 to get row
  const row = Math.trunc(tileId / 9);
  // subtract to get column
  const col = tileId - row * 9;
  // divide row by 3 to get block row
  const blockRow = Math.trunc(row / 3);
  // divide col by 3 to get block col
  const blockCol = Math.trunc(col / 3);
  // add block col + row offset
  // e.g. col 1, row 1 = (1 + 1 * 3) = the 4th block
  // (left to right, top to bottom)
  return blockCol + blockRow * 3;
}

/**
 * Handles generating puzzles and validating solutions.
 */
export default class PuzzleController {
  /** Generate and return new puzzle. */
  makePuzzle(): Puzzle {
    // generate array of 81 tiles
    var puzzleTiles = sudoku.makepuzzle();
    // rate the puzzle difficulty
    var difficulty = sudoku.ratepuzzle(puzzleTiles, 1);
    // remap 0..8 > 1..9
    puzzleTiles = puzzleTiles.map((num: number) => {
      return num == null ? null : num + 1;
    });
    // solve the puzzle up front for validation along the way
    var solution = this.solvePuzzle(puzzleTiles);

    return { tiles: puzzleTiles, difficulty: difficulty, solution: solution };
  }

  /** Solve a puzzle and return the solution. */
  solvePuzzle(puzzleTiles: (number | null)[]): PuzzleSolution {
    // remap from 1..9 > 0..8
    var puzzleTiles = puzzleTiles.map((num) => (num == null ? null : num - 1));
    var solutionTiles = sudoku.solvepuzzle(puzzleTiles);
    solutionTiles = solutionTiles.map((num: number) => {
      return num == null ? null : num + 1;
    });
    return solutionTiles;
  }
}
