import { useGameContext } from "../context/GameContext";

export function Info() {
  const { timer, wpm } = useGameContext();

  return (
    <div className="flex-container">
      <div className="info">
        {timer > 0 ? timer : `WPM: ${wpm}`}
      </div>
    </div>
  );
}

export default Info;
