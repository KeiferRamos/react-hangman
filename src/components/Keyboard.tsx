type keyboardType = {
  el: string;
  userAnswer: string[];
  correctAnswer: string;
  addKey: (key: string) => void;
};

const Keyboard = ({ el, userAnswer, correctAnswer, addKey }: keyboardType) => {
  const isAnswer = userAnswer.includes(el);
  const inCorrect = userAnswer.includes(el) && !correctAnswer.includes(el);
  return (
    <div
      className={
        inCorrect ? "incorrect-answer" : isAnswer ? "key is-answer" : "key"
      }
      onClick={() => addKey(el)}
    >
      {el}
    </div>
  );
};

export default Keyboard;
