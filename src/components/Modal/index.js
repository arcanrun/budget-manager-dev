//@flow

import React from "react";
import ReactDOM from "react-dom";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import "./style.css";
import { PayDay } from "../PayDay";
import { isDate } from "../Calendar/calendarHelper";
import DPStyle from "../Calendar/Calendar.module.css";
import "../Calendar/calndarRedefined.css";

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

class Input extends React.Component<{ isErrorValidation: boolean }, {}> {
  render() {
    const { isErrorValidation, ...rest } = this.props;
    return (
      <input
        className={
          isErrorValidation
            ? "modal__card-input_error modal__card-input"
            : "modal__card-input"
        }
        {...rest}
      />
    );
  }
}

class Modal extends React.Component<PROPS, STATE> {
  constructor(props: PROPS) {
    super(props);
    this.state = {
      inputValue: null,
      isErrorValidation: false
    };
  }
  displayValidation = (input: any, typeModal: string) => {
    const errorClass = "modal__card-input_error";
    // const inputValue = input.value;
    const inputValue = this.state.inputValue;

    console.log(inputValue);
    this.setState(
      (prevState, props) => {
        return { inputValue };
      },
      () => {
        if (this.validate(typeModal)) {
          this.setState({ isErrorValidation: false });
        } else {
          this.setState({ isErrorValidation: true });
        }
      }
    );
  };
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
      case "payday":
        if (val && isDate(val)) {
          return true;
        } else if (!isDate(val)) {
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
    this.setState({ inputValue: e.target.value }, () => {
      if (this.validate(typeModal)) {
        this.setState({ isErrorValidation: false });
      } else {
        this.setState({ isErrorValidation: true });
      }
    });

    // this.displayValidation(input, this.props.typeModal);
  };
  handleDayChange = (
    selectedDay: ?Date,
    modifiers: Object,
    dayPickerInput: DayPickerInput
  ) => {
    console.log(this.props.typeModal);
    this.setState({ inputValue: dayPickerInput.getInput().props.value }, () => {
      if (this.validate(this.props.typeModal)) {
        this.setState({ isErrorValidation: false });
      } else {
        this.setState({ isErrorValidation: true });
      }
    });
  };
  render() {
    const { onClick, typeModal } = this.props;
    const isTypePayday = typeModal === "payday";
    const isTypeBudget = typeModal === "budget";
    const { isErrorValidation } = this.state;
    return ReactDOM.createPortal(
      <div className="modal">
        <div className="modal__card">
          <div className="modal__title">
            {isTypeBudget ? "Введите бюджет" : null}
            {isTypePayday ? "Введите день зарплаты" : null}
          </div>
          {isTypePayday ? (
            // <DayPickerInput
            //   style={{ width: "100%" }}
            //   classNames={{
            //     overlay: DPStyle.datePicker,
            //     overlayWrapper: DPStyle.datePickerWrapper
            //   }}
            //   onDayChange={this.handleDayChange}
            //   component={props => (
            //     <input
            //       placeholder="ГГГГ-ММ-ДД"
            //       {...props}
            //       className={
            //         isErrorValidation
            //           ? "modal__card-input_error modal__card-input"
            //           : "modal__card-input"
            //       }
            //     />

            //   )}
            // />
            <DayPickerInput
              onDayChange={this.handleDayChange}
              classNames={{
                overlay: DPStyle.datePicker,
                overlayWrapper: DPStyle.datePickerWrapper
              }}
              dayPickerProps={{
                todayButton: "Сегодня",
                fixedWeeks: true
              }}
              inputProps={{ isErrorValidation }}
              component={Input}
            />
          ) : isTypeBudget ? (
            <input
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
