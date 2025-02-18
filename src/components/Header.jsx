import quizLogo from '../assets/quiz-logo.png'

export default function Header() {
  return <header className='flex flex-col items-center'>
    <img src={quizLogo}></img>
    <h1>REACTQUIZ</h1>
  </header>;
}
