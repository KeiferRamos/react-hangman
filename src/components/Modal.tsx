import React from "react";

type ModalType = {
  children: React.ReactNode;
};

function Modal({ children }: ModalType) {
  return <div className="modal">{children}</div>;
}

export default Modal;
