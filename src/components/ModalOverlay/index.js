//@flow

import React from "react";
import ReactDOM from "react-dom";

import "./style.css";
import { InputCard } from "../index";
import { CSSTransition } from "react-transition-group";

type PROPS = {
  makeProfileOperation: Function,
  onClick: Function,
  addWholeBudget: Function,
  addPayDay: Function,
  calcTempCosts: Function,
  calcBudget: Function,
  typeModal: string,
  daysToPayday: string,
  budget: number,
  vk_id: number,
  calc: Object
};

type STATE = {
  inputValue: ?string,
  isErrorValidation: boolean,
  in: boolean,
  isSetTransfer: boolean,
  transferTo: ?string
};

const ModalDiv =
  document.getElementById("modal") || document.createElement("div");

class ModalOverlay extends React.Component<PROPS, STATE> {
  constructor(props: PROPS) {
    super(props);
    this.state = {
      inputValue: null,
      isErrorValidation: false,
      in: false,
      isSetTransfer: false,
      transferTo: undefined
    };
  }
  componentDidMount() {
    this.toggleAnimation();
  }
  componentWillUnmount() {
    this.toggleAnimation();
  }
  toggleAnimation = () => {
    this.setState({ in: !this.state.in });
  };
  handleTransferState = (transferTo: string) => {
    const { isSetTransfer } = this.state;
    this.setState({ isSetTransfer: !isSetTransfer, transferTo });
  };
  validate = (typeModal: string) => {
    const val = this.state.inputValue;
    const common = this.props.calc.common.value;
    const fun = this.props.calc.fun.value;
    const invest = this.props.calc.invest.value;

    switch (typeModal) {
      case "budget":
      case "common_minus":
      case "common_plus":
      case "fun_minus":
      case "fun_plus":
      case "invest_minus":
      case "invest_plus":
      case "budget_plus":
      case "budget_minus":
        if (val && !isNaN(val)) {
          return true;
        } else if (isNaN(val)) {
          return false;
        } else {
          return false;
        }
      case "common_transfer":
        if (val && !isNaN(val) && +val <= common) {
          return true;
        } else if (isNaN(val)) {
          return false;
        } else {
          return false;
        }
      case "fun_transfer":
        if (val && !isNaN(val) && +val <= fun) {
          return true;
        } else if (isNaN(val)) {
          return false;
        } else {
          return false;
        }
      case "invest_transfer":
        if (val && !isNaN(val) && +val <= invest) {
          return true;
        } else if (isNaN(val)) {
          return false;
        } else {
          return false;
        }
      case "profile_delete":
        return true;

      default:
        console.log("typeModal[" + typeModal + "]: ¯|_(ツ)_/¯");
        break;
    }
  };
  handleOK = () => {
    const { vk_id } = this.props;
    const { inputValue, isSetTransfer } = this.state;
    const [typeModal, operation] = this.props.typeModal.split("_");
    const daysToPayday = this.props.daysToPayday;
    const dateNow = new Date().toLocaleDateString();

    const validateMethod =
      operation === "transfer"
        ? this.validate(this.props.typeModal) && isSetTransfer
        : this.validate(this.props.typeModal);

    if (validateMethod) {
      this.props.onClick(this.props.typeModal);
      switch (typeModal) {
        case "budget":
          if (operation) {
            this.props.calcBudget(
              inputValue,
              this.props.vk_id,
              typeModal,
              operation,
              dateNow
            );
            break;
          }
          const type = daysToPayday ? "change" : "add";
          console.log("handleOK[ModalOverlay]:", operation);
          this.props.addWholeBudget(vk_id, inputValue, type, daysToPayday);
          this.toggleAnimation();
          break;

        case "common":
          this.props.calcTempCosts(
            inputValue,
            this.props.vk_id,
            "common",
            operation,
            dateNow,
            this.state.transferTo
          );
          this.toggleAnimation();
          break;

        case "fun":
          this.props.calcTempCosts(
            inputValue,
            this.props.vk_id,
            "fun",
            operation,
            dateNow,
            this.state.transferTo
          );
          this.toggleAnimation();
          break;

        case "invest":
          // if (operation === "transfer") {
          //   if (!isSetTransfer) {
          //     this.setState({ isErrorValidation: true });
          //     break;
          //   }
          // }
          this.props.calcTempCosts(
            inputValue,
            this.props.vk_id,
            "invest",
            operation,
            dateNow,
            this.state.transferTo
          );
          this.toggleAnimation();
          break;
        case "profile":
          this.props.makeProfileOperation(vk_id, operation);
          this.toggleAnimation();
          break;

        default:
          console.log(
            "MISSING DISPATCHER FOR TYPE:",
            typeModal,
            "AND OPERATION:",
            operation
          );
          break;
      }
    } else {
      this.setState({ isErrorValidation: true });
    }
  };

  handleInput = (e: any, typeModal: string) => {
    const input = e.target;
    console.log("---s", this.validate(typeModal));
    this.setState({ inputValue: input.value }, () => {
      if (this.validate(typeModal)) {
        this.setState({ isErrorValidation: false });
      } else {
        this.setState({ isErrorValidation: true });
      }
    });
  };

  render() {
    const { onClick, typeModal, calc } = this.props;
    const { isErrorValidation } = this.state;

    const budgetInputCard = (
      <InputCard
        isErrorValidation={isErrorValidation}
        typeModal={typeModal}
        handleInput={this.handleInput}
        onClick={onClick}
        handleOK={this.handleOK}
        handleTransferState={this.handleTransferState}
        calc={calc}
      />
    );

    return ReactDOM.createPortal(
      <CSSTransition
        in={this.state.in}
        timeout={500}
        classNames="modal_overlay"
        unmountOnExit
      >
        <div className="modal">{budgetInputCard}</div>
      </CSSTransition>,
      ModalDiv
    );
  }
}
export { ModalOverlay };
