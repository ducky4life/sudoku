import { useContext, useState } from "react";
import { isHotkeyPressed, useHotkeys } from "react-hotkeys-hook";
import { GameStateContext } from "../utils/Contexts";

interface NumpadProps {
  onInput: (value: number | null, isCandidate: boolean) => void;
}

export default function Numpad({ onInput }: NumpadProps) {
  const gameState = useContext(GameStateContext);

  /** Is the numpad enabled? false when there's no puzzle. */
  const isEnabled = gameState.puzzle != null;

  /** Is the user inputting candidates, or a chosen value? */
  const [isCandidate, setIsCandidate] = useState(false);

  const numbers = Array.from(Array(9).keys()).map((elem) => elem + 1);

  function onNumClick(value: number) {
    onInput(value, isCandidate);
  }

  function onClearClick() {
    onInput(null, isCandidate);
  }

  function onNumKeyPressed(value: number) {
    if (isHotkeyPressed("shift")) {
      // shift + num to give confirmed input
      onInput(value, false);
    } else {
      // by default input as candidates
      onInput(value, true);
    }
  }

  function onClearPressed() {
    // when using hotkeys, always allow clearing both
    onInput(null, true);
  }

  useHotkeys(
    "shift",
    () => {
      setIsCandidate(!isHotkeyPressed("shift"));
    },
    { keydown: true, keyup: true, preventDefault: true }
  );
  useHotkeys(["1", "shift+1"], () => onNumKeyPressed(1));
  useHotkeys(["2", "shift+2"], () => onNumKeyPressed(2));
  useHotkeys(["3", "shift+3"], () => onNumKeyPressed(3));
  useHotkeys(["4", "shift+4"], () => onNumKeyPressed(4));
  useHotkeys(["5", "shift+5"], () => onNumKeyPressed(5));
  useHotkeys(["6", "shift+6"], () => onNumKeyPressed(6));
  useHotkeys(["7", "shift+7"], () => onNumKeyPressed(7));
  useHotkeys(["8", "shift+8"], () => onNumKeyPressed(8));
  useHotkeys(["9", "shift+9"], () => onNumKeyPressed(9));
  useHotkeys(["delete", "backspace"], () => onClearPressed(), {
    description: "Clear the selected tile.",
  });

  const numberButtons = numbers.map((num) => {
    const idx = num - 1;
    const col = idx % 3;
    const row = Math.trunc(idx / 3);

    return (
      <button key={num} className="btn" onClick={() => onNumClick(num)}>
        {isCandidate ? (
          <span className={`num num-sm col-${col} row-${row}`}>{num}</span>
        ) : (
          <span className="num num-lg">{num}</span>
        )}
      </button>
    );
  });

  return (
    <div className={`${isEnabled ? "" : "disabled"}`}>
      <div className={`numpad grid grid-col-3 `}>
        {numberButtons}
        <button className="btn" onClick={onClearClick}>
          <span className="num-lg">X</span>
        </button>
        <button
          className={`btn ${isCandidate ? "dimmed" : "selected"}`}
          onClick={() => setIsCandidate(false)}
        >
          <span className="num-lg">#</span>
        </button>
        <button
          className={`btn ${isCandidate ? "selected" : "dimmed"}`}
          onClick={() => setIsCandidate(true)}
        >
          <span className="num-sm">#</span>
        </button>
      </div>
    </div>
  );
}
