import { useEffect, useState } from "react";
import "./assets/styles/style.css";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";
import answers from "./data/answer";
import hangman from "./data/hangman";
import letters from "./data/letters";

type hintType = { message: string; author: string };

function App() {
  const [incorrect, setIncorrect] = useState(0);
  const [pass, setPass] = useState(false);
  const [{ message, author }, setHint] = useState<hintType>({} as hintType);
  const [currentLvl, setCurrentLvl] = useState(1);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState<string[]>([]);

  useEffect(() => {
    const current = answers.find(({ level }) => level === currentLvl)!;
    setCorrectAnswer(current.answer);
    setHint(current.hint);
    setUserAnswer([]);
    setPass(false);
    setIncorrect(0);
  }, [currentLvl]);

  useEffect(() => {
    if (userAnswer.length) {
      const isCorrect = Array.from(correctAnswer).every((el) =>
        userAnswer.includes(el)
      );
      setPass(isCorrect);
    }
  }, [userAnswer]);

  const restart = () => {
    setUserAnswer([]);
    setPass(false);
  };

  const nextLvl = () => {
    setCurrentLvl((prev) => prev + 1);
    setIncorrect(0);
  };

  const addKey = (key: string) => {
    if (!correctAnswer.includes(key)) {
      setIncorrect((prev) => prev + 1);
    }
    setUserAnswer([...userAnswer, key]);
  };

  return (
    <div className="App">
      <div className="hangman">
        <div className="ground"></div>
        <div className="pole"></div>
        <div className="hanger"></div>
        <div className="triangle"></div>
        <div className="rope"></div>
        {hangman.map((el, i) => {
          return (
            <div
              key={i}
              className={el}
              style={{ display: incorrect > i ? "block" : "none" }}
            ></div>
          );
        })}
      </div>
      <div className="hint">
        <p>{message}</p>
        <p> -{author}</p>
      </div>
      <div className="answer-box">
        {Array.from(correctAnswer).map((el, i) => {
          return <div key={i}>{userAnswer.includes(el) ? el : ""}</div>;
        })}
      </div>
      <div className="keyboard">
        {Array.from(letters).map((el, i) => (
          <Keyboard key={i} {...{ el, addKey, userAnswer, correctAnswer }} />
        ))}
      </div>
      {pass ? <Modal {...{ restart, nextLvl }} /> : null}
    </div>
  );
}

export default App;
