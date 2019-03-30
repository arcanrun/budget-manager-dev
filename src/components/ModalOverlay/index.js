//@flow

import React from "react";
import ReactDOM from "react-dom";

import "./style.css";
import { InputCard } from "../index";

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

class ModalOverlay extends React.Component<PROPS, STATE> {
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
    // const isTypeBudget = typeModal === "budget";
    const { isErrorValidation } = this.state;

    return ReactDOM.createPortal(
      <div className="modal">
        <InputCard
          title={"Введите бюджет"}
          isErrorValidation={isErrorValidation}
          typeModal={typeModal}
          handleInput={this.handleInput}
          onClick={onClick}
          handleOK={this.handleOK}
        />
      </div>,
      ModalDiv
    );
  }
}
export { ModalOverlay };
