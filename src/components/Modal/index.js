//@flow

import React from "react";
import ReactDOM from "react-dom";

import "./style.css";

type PROPS = {
  onClick: Function,
  typeModal: string
};

const ModalDiv =
  document.getElementById("modal") || document.createElement("div");

class Modal extends React.Component<PROPS, {}> {
  modalInput: any;
  constructor(props: PROPS) {
    super(props);
    this.modalInput = React.createRef();
  }
  handleOK = () => {
    const inputVal = this.modalInput.current.value;
    const input = this.modalInput.current;
    if (!inputVal) {
      input.classList.add("modal__card-input_error");
    }
  };
  handleInput = (e: any) => {
    const val = e.target.value;
    if (val) {
      e.target.classList.remove("modal__card-input_error");
    }
  };

  render() {
    const { onClick, typeModal } = this.props;
    return ReactDOM.createPortal(
      <div className="modal">
        <div className="modal__card">
          <div className="modal__title">
            {typeModal === "budget" ? "Введите бюджет" : null}
            {typeModal === "payday" ? "Введите день зарплаты" : null}
          </div>
          <input
            ref={this.modalInput}
            className="modal__card-input"
            type="text"
            autoFocus
            onChange={this.handleInput}
          />
          <div className="modal__card-btns-block">
            <button onClick={() => onClick("budget")}>отмена</button>
            <button onClick={this.handleOK}>ок</button>
          </div>
        </div>
      </div>,
      ModalDiv
    );
  }
}
export { Modal };
