import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import QuizContextProvider from "./store/quiz-context";

export default function App() {
  return (
    <>
      <Header />
      <QuizContextProvider>
        <MainContainer/>
      </QuizContextProvider>
    </>
  );
}
