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
    const errorClass = "modal__card-input_error-input";
    const inputVal = this.modalInput.current.value;
    const input = this.modalInput.current;

    if (!inputVal) {
      input.classList.add(errorClass);
    }
  };
  handleInput = (e: any, typeModal: string) => {
    const errorClass = "modal__card-input_error-input";
    const val = e.target.value;
    const input = e.target;
    // console.log(val && !isNaN(val), input);

    switch (typeModal) {
      case "budget":
        if (val && !isNaN(val)) {
          input.classList.remove(errorClass);
        } else if (isNaN(val)) {
          input.classList.add(errorClass);
        } else {
          input.classList.add(errorClass);
        }
        break;
      case "payday":
        if (val && isNaN(val)) {
          input.classList.remove(errorClass);
        } else if (!isNaN(val)) {
          input.classList.add(errorClass);
        } else {
          input.classList.add(errorClass);
        }
        break;
      default:
        console.log("¯_(ツ)_/¯");
        break;
    }
    if (val) {
      input.classList.remove("modal__card-input_error");
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
            onChange={e => this.handleInput(e, typeModal)}
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
