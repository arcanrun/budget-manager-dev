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

type STATE = {
  inputValue: ?string,
  isErrorValidation: boolean
};

const ModalDiv =
  document.getElementById("modal") || document.createElement("div");

class Modal extends React.Component<PROPS, STATE> {
  constructor(props: PROPS) {
    super(props);
    this.state = {
      inputValue: null,
      isErrorValidation: false
    };
  }

  validate = (typeModal: string) => {
    const val = this.state.inputValue;

    switch (typeModal) {
      case "budget":
        if (val && !isNaN(val)) {
          return true;
        } else if (isNaN(val)) {
          return false;
        } else {
          return false;
        }

      default:
        console.log("typeModal: ¯|_(ツ)_/¯");
        break;
    }
  };
  handleOK = () => {
    const inputVal = this.state.inputValue;
    const { typeModal } = this.props;

    if (this.validate(typeModal)) {
      this.props.onClick(typeModal);
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
      this.setState({ isErrorValidation: true });
    }
  };

  handleInput = (e: any, typeModal: string) => {
    const input = e.target;
    this.setState({ inputValue: input.value }, () => {
      if (this.validate(typeModal)) {
        this.setState({ isErrorValidation: false });
      } else {
        this.setState({ isErrorValidation: true });
      }
    });
  };

  render() {
    const { onClick, typeModal } = this.props;
    const isTypeBudget = typeModal === "budget";
    const { isErrorValidation } = this.state;

    return ReactDOM.createPortal(
      <div className="modal">
        <div className="modal__card">
          <div className="modal__title">
            {isTypeBudget ? "Введите бюджет" : null}
          </div>
          {isTypeBudget ? (
            <input
              placeholder="00000.00"
              className={
                isErrorValidation
                  ? "modal__card-input_error modal__card-input"
                  : "modal__card-input"
              }
              autoFocus
              onChange={e => this.handleInput(e, typeModal)}
            />
          ) : (
            ""
          )}

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
