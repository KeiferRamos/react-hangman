type ModalType = {
  nextLvl: () => void;
  restart: () => void;
};

function Modal({ nextLvl, restart }: ModalType) {
  return (
    <div className="modal">
      <div>
        <p>Yehey! You Got It Right!🥳</p>
        <button onClick={nextLvl}>next level</button>
        <button onClick={restart}>replay</button>
      </div>
    </div>
  );
}

export default Modal;
