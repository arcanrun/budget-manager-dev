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
  budget: number,
  vk_id: string
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
      case "fun_minus":
      case "fun_plus":
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
    const budget = this.props.budget;

    if (this.validate(typeModal)) {
      this.props.onClick(typeModal);
      switch (typeModal) {
        case "budget":
          const type = daysToPayday ? "change" : "add";
          console.log(type);
          this.props.addWholeBudget(inputVal, type, daysToPayday);

          break;
        case "payday":
          this.props.addPayDay(inputVal);
          break;

        case "common_minus":
          this.props.calcToDayCosts(
            inputVal,
            this.props.vk_id,
            "common",
            "-",
            this.props.budget
          );
          break;
        case "common_plus":
          this.props.calcToDayCosts(
            inputVal,
            this.props.vk_id,
            "common",
            "+",
            this.props.budget
          );
          break;
        case "fun_minus":
          this.props.calcToDayCosts(
            inputVal,
            this.props.vk_id,
            "fun",
            "-",
            this.props.budget
          );
          break;
        case "fun_plus":
          this.props.calcToDayCosts(
            inputVal,
            this.props.vk_id,
            "fun",
            "+",
            this.props.budget
          );
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
