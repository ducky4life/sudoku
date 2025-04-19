import { useContext, useEffect, useState } from "react";
import { formatTimeSpan } from "../utils/time";
import { GameStateContext } from "../utils/Contexts";

/**
 * Displays the elapsed since the puzzle started.
 */
export default function Timer({}) {
  const gameState = useContext(GameStateContext);

  const startTime = gameState.startTime;

  /** The current time, updated every interval. */
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const endTime = gameState.endTime ?? currentTime;

  /** Elapsed time since starting in milliseconds. */
  const elapsedTime = startTime
    ? Math.max(endTime.getTime() - startTime.getTime(), 0)
    : 0;

  const elapsedTimeStr = formatTimeSpan(elapsedTime);

  const updateInterval = 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, updateInterval);

    return () => {
      clearInterval(interval);
    };
  }, [elapsedTime]);

  return (
    <span className="" hidden={startTime == null}>
      {elapsedTimeStr}
    </span>
  );
}
