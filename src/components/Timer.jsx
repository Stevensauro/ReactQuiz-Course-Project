import { useContext } from "react";
import { TimerContext } from "../store/timer-context";

export default function Timer() {
  const { STARTING_TIMER, SELECTED_TIMER, ENDING_TIMER, remainingTime, phase } =
    useContext(TimerContext);

  const setMaxInProgressBar = () => {
    switch (phase) {
      case 1:
        return STARTING_TIMER;
      case 2:
        return SELECTED_TIMER;
      case 3:
        return ENDING_TIMER;
    }
  };

  return (
    <progress
      value={remainingTime}
      max={setMaxInProgressBar()}
      className={`${phase === 2 || phase === 3 ? "answered" : ""}`}
    ></progress>
  );
}
