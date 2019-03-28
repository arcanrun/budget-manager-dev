//@flow

import React from "react";
import ReactDOM from "react-dom";

import "./style.css";

type PROPS = {
  onClick: Function,
  typeModal: string,
  addWholeBudget: Function,
  addPayDay: Function
};

const ModalDiv =
  document.getElementById("modal") || document.createElement("div");

class Modal extends React.Component<PROPS, {}> {
  modalInput: any;
  constructor(props: PROPS) {
    super(props);
    this.modalInput = React.createRef();
  }

  validate = (inputElement: any, typeModal: string) => {
    const val = inputElement.value;

    switch (typeModal) {
      case "budget":
        if (val && !isNaN(val)) {
          return true;
        } else if (isNaN(val)) {
          return false;
        } else {
          return false;
        }
      case "payday":
        if (val && isNaN(val)) {
          return true;
        } else if (!isNaN(val)) {
          return false;
        } else {
          return false;
        }
      default:
        console.log("¯|_(ツ)_/¯");
        break;
    }
  };
  handleOK = () => {
    const errorClass = "modal__card-input_error";
    const input = this.modalInput.current;
    const inputVal = input.value;
    const { typeModal } = this.props;

    if (this.validate(input, this.props.typeModal)) {
      this.props.onClick(this.props.typeModal);
      switch (typeModal) {
        case "budget":
          this.props.addWholeBudget(inputVal);
          break;
        case "payday":
          this.props.addPayDay(inputVal);
          break;
        default:
          console.log("MISSING DISPATCHER FOR TYPE:", typeModal);
          break;
      }
    } else {
      input.classList.add(errorClass);
    }
  };
  handleInput = (e: any, typeModal: string) => {
    const errorClass = "modal__card-input_error";
    const input = e.target;

    if (this.validate(input, typeModal)) {
      input.classList.remove(errorClass);
    } else {
      input.classList.add(errorClass);
    }
    switch (typeModal) {
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
            <button onClick={() => onClick(typeModal)}>отмена</button>
            <button onClick={this.handleOK}>ок</button>
          </div>
        </div>
      </div>,
      ModalDiv
    );
  }
}
export { Modal };
