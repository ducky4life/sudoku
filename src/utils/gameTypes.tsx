/**
 * Types for gameplay.
 */

/** Represents a fully solved puzzle. */
export type PuzzleSolution = number[];

/** Represents a puzzle to be solved. */
export interface Puzzle {
  /** The initial tiles of the puzzle. */
  tiles: (number | null)[];

  /** The difficult rating. */
  difficulty: number;

  /** The completed solution for the puzzle. */
  solution: PuzzleSolution;
}

/** Properties for a single tile of a solution. */
export interface TileSolveState {
  /** The annotated candidate values for the tile. */
  candidates: number[];

  /** The chosen value for the tile. */
  value?: number;
}

/** Properties for all tiles of a solution. */
export interface SolveState {
  /** Solve state for all tiles. */
  tiles: TileSolveState[];
}

/** An array of SolveStates. */
export type SolveHistory = SolveState[];

export interface SolveResult {
  /** Is the solution correct? */
  isCompleted: boolean;

  /** List of tiles that are incorrect. */
  errors: number[];
}

/** A bundled representing of all game state for passing around. */
export interface GameState {
  /** The puzzle to solve. */
  puzzle?: Puzzle;

  /** The time when the puzzle was started. */
  startTime?: Date;

  /** The time when the puzzle was completed. */
  endTime?: Date;

  /** The full history of solve states. */
  history: SolveHistory;

  /** The currently displayed solve state. */
  solveState?: SolveState;

  /** The current solution result, e.g. is the puzzle solved and any current errors. */
  solveResult: SolveResult;

  /** The currently selected tile. */
  selection?: number;
}
