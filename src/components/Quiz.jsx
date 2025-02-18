import { useContext } from "react";

import Timer from "./Timer";

import { QuizContext } from "../store/quiz-context";
import { TimerContext } from "../store/timer-context";

export default function Quiz() {
  const { buttonsRef, currentQuestion, answers, handleCheckAnswer } =
    useContext(QuizContext);

  const { handleTimerOnSelectedAnswer, phase } = useContext(TimerContext);

  const getClassNameOnSelected = (choice) => {
    if (answers.includes(choice)) {
      if (phase === 2) return "selected";

      if (phase === 3)
        return currentQuestion.answer === choice ? "correct" : "wrong";
    }
  };

  return (
    <div id="quiz">
      <div id="question">
        <Timer />
        <h2>{currentQuestion.question}</h2>
      </div>
      <ul id="answers">
        {currentQuestion.choices.map((choice, idx) => (
          <li
            ref={(el) => (buttonsRef.current[idx] = el)}
            key={`choice-${idx}`}
            className="answer"
          >
            <button
              className={`${getClassNameOnSelected(choice)} ${
                phase === 2 || phase === 3 ? "pointer-events-none" : ""
              }`}
              onClick={(evt) => (
                handleCheckAnswer(evt), handleTimerOnSelectedAnswer()
              )}
            >
              {choice}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
