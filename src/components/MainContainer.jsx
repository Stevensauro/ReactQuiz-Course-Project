import { useContext } from "react";
import Quiz from "./Quiz";
import QuizResults from "./QuizResults";
import Startpoint from "./Startpoint";
import {QuizContext} from "../store/quiz-context";
import TimerContextProvider from "../store/timer-context";

export default function MainContainer() {
  const {startQuiz, answers, handleOnStartQuiz} = useContext(QuizContext)

  const ShowComponent = ()=>{
    if(answers.length !== 0 && !startQuiz ){
      return <QuizResults/>
    }else{
      return startQuiz ? <TimerContextProvider><Quiz /></TimerContextProvider> : <Startpoint onClick={handleOnStartQuiz}/>
    }
  }

  return <div>
    {ShowComponent()}
  </div>;
}
