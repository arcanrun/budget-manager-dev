//@flow

import React from "react";
import ReactDOM from "react-dom";

import "./style.css";
import { InputCard } from "../index";
import { WholeBudget } from "../WholeBudget";

type PROPS = {
  onClick: Function,
  addWholeBudget: Function,
  addPayDay: Function,
  calcToDayCosts: Function,
  typeModal: string,
  daysToPayday: string,
  wholeBudget: number
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
      case "common_minus":
      case "common_plus":
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
    const daysToPayday = this.props.daysToPayday;
    const wholeBudget = this.props.wholeBudget;

    if (this.validate(typeModal)) {
      this.props.onClick(typeModal);
      switch (typeModal) {
        case "budget":
          const type = wholeBudget ? "change" : "add";
          console.log(type);
          this.props.addWholeBudget(inputVal, type, daysToPayday);

          break;
        case "payday":
          this.props.addPayDay(inputVal);
          break;

        case "common_minus":
          this.props.addWholeBudget(inputVal, "-", daysToPayday);
          this.props.calcToDayCosts(
            inputVal,
            "123456",
            "common",
            "-",
            this.props.wholeBudget
          );
          break;
        case "common_plus":
          this.props.addWholeBudget(inputVal, "+", daysToPayday);
          this.props.calcToDayCosts(inputVal, "123456", "common", "+");
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
    const budgetInputCard = (
      <InputCard
        isErrorValidation={isErrorValidation}
        typeModal={typeModal}
        handleInput={this.handleInput}
        onClick={onClick}
        handleOK={this.handleOK}
      />
    );
    return ReactDOM.createPortal(
      <div className="modal">{budgetInputCard}</div>,
      ModalDiv
    );
  }
}
export { ModalOverlay };
