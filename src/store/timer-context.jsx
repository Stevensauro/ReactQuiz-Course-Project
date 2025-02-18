import { createContext, useContext, useEffect, useRef, useState } from "react";
import { QuizContext } from "./quiz-context";

const STARTING_TIMER = 5000;
const SELECTED_TIMER = 500;
const ENDING_TIMER = 1000;

export const TimerContext = createContext({
  STARTING_TIMER: 0,
  SELECTED_TIMER: 0,
  ENDING_TIMER: 0,
  remainingTime: 0,
  phase: 0,
  handleTimerOnSelectedAnswer: () => {},
});

export default function TimerContextProvider({ children }) {
  const { handleNextQuestion, handleSkippedQuestion } = useContext(QuizContext);

  const startingTimerRef = useRef();

  const [isRunning, setIsRunning] = useState(true);
  const [timer, setTimer] = useState({
    phase: 1,
    remainingTime: STARTING_TIMER,
  });

  const { remainingTime, phase } = timer;

  if (remainingTime <= 0 && isRunning) {
    setIsRunning(false);
  }

  const handleStartingTimer = () => {
    startingTimerRef.current = setInterval(() => {
      setTimer((prevState) => ({
        ...prevState,
        remainingTime: prevState.remainingTime - 10,
      }));
    }, 10);
  };

  const handleTimerOnSelectedAnswer = () => {
    if (phase === 1) {
      clearInterval(startingTimerRef.current);
      setTimer(() => ({
        phase: 1,
        remainingTime: 0,
      }));
    }
  };

  useEffect(() => {
    if (isRunning) {
      handleStartingTimer();
      if (phase === 1 && document.activeElement.localName === "button")
        document.activeElement.blur();
    } else {
      if (phase === 1) {
        setTimer(() => ({ remainingTime: SELECTED_TIMER, phase: 2 }));
        handleSkippedQuestion(() =>
          setTimer(() => ({ remainingTime: STARTING_TIMER, phase: 1 }))
        );
      }
      if (phase === 2)
        setTimer(() => ({ remainingTime: ENDING_TIMER, phase: 3 }));

      if (phase === 3) {
        setTimer(() => ({ remainingTime: STARTING_TIMER, phase: 1 }));
        handleNextQuestion();
      }
      clearInterval(startingTimerRef.current);
      setIsRunning(true);
    }
    return () => clearInterval(startingTimerRef.current);
  }, [isRunning]);

  const ctxValue = {
    STARTING_TIMER,
    SELECTED_TIMER,
    ENDING_TIMER,
    phase,
    remainingTime,
    handleTimerOnSelectedAnswer,
  };

  return (
    <TimerContext.Provider value={ctxValue}>{children}</TimerContext.Provider>
  );
}
