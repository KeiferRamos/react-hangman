import { useEffect, useState } from "react";
import "./assets/styles/style.css";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";
import answers from "./data/answer";
import hangman from "./data/hangman";
import letters from "./data/letters";
import { Carousel, Slider } from "antd";

type hintType = { message: string; author: string }[];

function App() {
  const [incorrect, setIncorrect] = useState(0);
  const [pass, setPass] = useState(false);
  const [hint, setHint] = useState<hintType>([] as hintType);
  const [currentLvl, setCurrentLvl] = useState(1);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const [replay, setReplay] = useState(false);
  const [final, setFinal] = useState(false);

  useEffect(() => {
    const current = answers.find(({ level }) => level === currentLvl)!;
    setCorrectAnswer(current.answer);
    console.log(current);
    setHint(current.hint);
    setUserAnswer([]);
    setPass(false);
    setIncorrect(0);
  }, [currentLvl]);

  useEffect(() => {
    if (userAnswer.length) {
      console.log(userAnswer);
      const isCorrect = Array.from(correctAnswer).every((el) =>
        userAnswer.includes(el)
      );
      setPass(isCorrect);
    }
  }, [userAnswer]);

  useEffect(() => {
    if (incorrect >= 6) {
      setReplay(true);
    }
  }, [incorrect]);

  const replayGame = () => {
    setUserAnswer([]);
    setReplay(false);
    setIncorrect(0);
  };

  const restart = () => {
    setUserAnswer([]);
    setPass(false);
  };

  const nextLvl = () => {
    if (currentLvl >= answers.length) {
      setFinal(true);
      return;
    }
    setCurrentLvl((prev) => prev + 1);
    setIncorrect(0);
  };

  const playAgain = () => {
    setUserAnswer([]);
    setFinal(false);
    setIncorrect(0);
    setCurrentLvl(1);
  };

  const addKey = (key: string) => {
    if (userAnswer.includes(key)) {
      return;
    }
    if (!correctAnswer.includes(key)) {
      setIncorrect((prev) => prev + 1);
    }
    setUserAnswer([...userAnswer, key]);
  };

  return (
    <div className="App">
      <div className="upper-part">
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

        <div>
          <Carousel className="slider">
            {hint.map(({ message, author }) => {
              return (
                <div className="hint">
                  <p>{message}</p>
                  <p> -{author}</p>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>

      <div className="answer-box">
        {Array.from(correctAnswer).map((el, i) => {
          return (
            <div key={i}>{userAnswer.includes(el.toLowerCase()) ? el : ""}</div>
          );
        })}
      </div>
      <div className="keyboard">
        {Array.from(letters).map((el, i) => (
          <Keyboard key={i} {...{ el, addKey, userAnswer, correctAnswer }} />
        ))}
      </div>
      {pass ? (
        <Modal>
          <div>
            <p>Yehey! You Got It Right!🥳</p>
            <button onClick={nextLvl}>next level</button>
            <button onClick={restart}>replay</button>
          </div>
        </Modal>
      ) : null}
      {replay ? (
        <Modal>
          <div>
            <p>Opps! You Got It Wrong!🥳</p>
            <button onClick={replayGame}>replay</button>
          </div>
        </Modal>
      ) : null}
      {final ? (
        <Modal>
          <div>
            <p>That's it! Thank you for playing!🥳</p>
            <button onClick={playAgain}>Play Again</button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

export default App;
