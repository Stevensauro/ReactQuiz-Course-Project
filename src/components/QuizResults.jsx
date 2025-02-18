import { useContext } from "react";

import { QuizContext } from "../store/quiz-context";
import { quiz } from "../quiz";
import trophyImg from "../assets/quiz-complete.png";

export default function QuizResults() {
  const { answers } = useContext(QuizContext);

  const getTotalResponses = () => {
    let totalSkipped = 0;
    let totalCorrect = 0;
    let totalWrong = 0;

    answers.forEach((answer, idx) => {
      const correctAnswer = quiz[idx].answer;

      if (answer === "skipped") return totalSkipped++;

      if (answer === correctAnswer) return totalCorrect++;

      return totalWrong++;
    });

    return { totalSkipped, totalCorrect, totalWrong };
  };

  const getPercentage = (value) => {
    return (value / answers.length) * 100;
  };

  const summary = getTotalResponses();

  return (
    <section id="summary">
      <img src={trophyImg} alt="A shinning trophy" />
      <h1>quiz completed!</h1>
      <div id="summary-stats">
        <div>
          <p className="number">{getPercentage(summary.totalSkipped)}%</p>
          <p className="text">skipped</p>
        </div>
        <div>
          <p className="number">{getPercentage(summary.totalCorrect)}%</p>
          <p className="text">answered correctly</p>
        </div>
        <div>
          <p className="number">{getPercentage(summary.totalWrong)}%</p>
          <p className="text">answered incorrectly</p>
        </div>
      </div>
      <div>
        <ol>
          {answers.map((answer,idx) => {

            const getClassName = ()=>{
              if(answer==='skipped')
                return 'skipped'

              if(quiz[idx].answer.includes(answer))
                return 'correct'

              return 'wrong'
            }

            return (
              <li key={`answer-summary-${idx}`}>
                <h3>{idx+1}</h3>
                <p className="question">{quiz[idx].question}</p>
                <p className={`user-answer ${getClassName()}`}>{answer}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
