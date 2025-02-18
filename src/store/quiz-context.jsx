import { createContext, useRef, useState } from "react";

import { quiz } from "../quiz.js";
import { shuffleArray } from "../utils.js";

export const QuizContext = createContext({
  buttonsRef: {},
  startQuiz: Boolean(false),
  currentQuestion: [],
  answers: [],
  handleCheckAnswer: () => {},
  handleNextQuestion: () => {},
  handleSkippedQuestion: () => {},
  handleOnStartQuiz: () => {},
});

export default function QuizContextProvider({ children }) {
  const buttonsRef = useRef([]);

  const [startQuiz, setStartQuiz] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const handleOnStartQuiz = () => {
    setStartQuiz((oldState) => !oldState);
    setCurrentQuestion({
      ...quiz[0],
      choices: shuffleArray(quiz[0].choices),
    });
  };

  const handleCheckAnswer = (evt) => {
    const userAnswer = evt.target.textContent;

    if (userAnswer === currentQuestion.answer) {
      console.log("right");
      setAnswers((prevState) => [...prevState, userAnswer]);
    } else if (userAnswer !== currentQuestion.answer) {
      console.log("wrong");
      setAnswers((prevState) => [...prevState, userAnswer]);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prevState) => {
      const lastQuestionIdx = quiz.findIndex(
        ({ question }) => question === prevState.question
      );

      if (lastQuestionIdx + 1 === quiz.length) {
        setStartQuiz(false);
        return null;
      }
      return {
        ...quiz[lastQuestionIdx + 1],
        choices: shuffleArray(quiz[lastQuestionIdx + 1].choices),
      };
    });
  };

  const handleSkippedQuestion = (resetTimerFunc) => {
    const checkAnswers = [];

    for (let i = 0; i < currentQuestion.choices.length; i++) {
      checkAnswers.push(answers.includes(currentQuestion.choices[i]));
    }

    const isThereAnswer = Boolean(
      checkAnswers.reduce((acc, currVal) => acc + currVal)
    );

    if (!isThereAnswer) {
      setAnswers((prevState) => [...prevState, "skipped"]);
      handleNextQuestion();
      resetTimerFunc();
    }
  };

  const ctxValue = {
    buttonsRef,
    startQuiz,
    currentQuestion,
    answers,
    handleOnStartQuiz,
    handleCheckAnswer,
    handleSkippedQuestion,
    handleNextQuestion,
  };

  return (
    <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>
  );
}
