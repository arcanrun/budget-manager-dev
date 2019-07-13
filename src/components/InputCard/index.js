//@flow

import React from "react";
import { CSSTransition } from "react-transition-group";

import style from "./InputCard.module.css";
import "./animations.css";
import "./animate.css";
import { Button, ButtonGroup } from "../index";
import { cutNumber, toFixedCustom } from "../ShortenNumber/helpers";

type PROPS = {
  onClick: Function,
  handleInput: Function,
  handleOK: Function,
  inputRef: Function,
  handleTransferState: Function,
  isErrorValidation: boolean,
  typeModal: string,
  calc: Object,
  transferTo: string
};

type STATE = {
  in: boolean
};

class InputCard extends React.Component<PROPS, STATE> {
  mainInput: ?Function;
  constructor(props: Object) {
    super(props);

    this.state = {
      in: false
    };
    this.mainInput = React.createRef();
  }

  componentDidMount() {
    this.toggleAnimation();
  }
  componentWillUnmount() {
    this.toggleAnimation();
  }
  isValid(val: string) {
    if (!isNaN(val)) {
      return true;
    } else if (val.includes("e")) {
      return false;
    }
    return false;
  }
  handleInput = (typeModal: string) => {
    let { value } = this.mainInput.current;
    const { handleInput } = this.props;
    if (this.isValid(value)) {
      handleInput(value, typeModal);
    } else {
      this.mainInput.current.value = "";
    }
  };
  toggleAnimation = () => {
    this.setState({ in: !this.state.in });
  };
  handleTransferCateogry = (e: any) => {
    const transferTo = e.target.dataset.transfer;
    this.props.handleTransferState(transferTo);
  };
  render() {
    const {
      isErrorValidation,
      typeModal,
      onClick,
      handleOK,
      transferTo
    } = this.props;
    const common = this.props.calc.common.value;
    const fun = this.props.calc.fun.value;
    const invest = this.props.calc.invest.value;

    let inputType = "text";

    const btnBlock = (
      <div className={style.cardBtnsBlock}>
        <ButtonGroup>
          <Button
            btnColor="red"
            onClick={() => onClick(typeModal)}
            text="отмена"
          />
          <Button btnColor="green" onClick={handleOK} text="ок" />
        </ButtonGroup>
      </div>
    );
    let isInputRequired = false;
    let transferingCategory = "";
    switch (true) {
      case typeModal.includes("minus"):
      case typeModal.includes("plus"):
      case typeModal === "budget":
        isInputRequired = true;
        inputType = "number";
        break;
      case typeModal.includes("transfer"):
        isInputRequired = true;
        inputType = "number";
        transferingCategory = typeModal.split("_")[0];
        break;
      default:
        isInputRequired = false;
        break;
    }
    let placeHolder = "0000.00";
    switch (transferingCategory) {
      case "common":
        placeHolder = toFixedCustom(common);

        break;
      case "fun":
        placeHolder = toFixedCustom(fun);
        break;
      case "invest":
        placeHolder = toFixedCustom(invest);

        break;
      default:
        break;
    }
    let text = "EMPTY";
    switch (true) {
      case typeModal.includes("profile_delete"):
        text = "Вы действительно хотите удалить профиль?";
        break;
      default:
        text = "NOT MATCHING";
        break;
    }
    const title = (
      <div className={style.title}>
        {typeModal === "budget" ? "Введите бюджет" : ""}
        {typeModal.includes("minus") ? "Расходы" : ""}
        {typeModal.includes("plus") ? "Доходы" : ""}
        {typeModal.includes("profile_delete") ? "Удалить профиль" : ""}
        {typeModal.includes("transfer") ? "Перевод в другую категорию" : ""}
      </div>
    );
    const input = (
      <div className={style.inputContainer}>
        {title}
        <input
          pattern={inputType === "number" ? "[\\d*]" : ""}
          placeholder={placeHolder}
          className={
            isErrorValidation
              ? [style.cardInputError, style.cardInput].join(" ")
              : style.cardInput
          }
          autoFocus
          // onChange={e => handleInput(e, typeModal)}
          onChange={() => this.handleInput(typeModal)}
          type={inputType}
          ref={this.mainInput}
        />
      </div>
    );

    const isTransferBlock = typeModal.includes("transfer") ? true : false;
    const isTransferCommonDisabled =
      transferingCategory === "common" ? true : false;
    const isTransferFunDisabled = transferingCategory === "fun" ? true : false;
    const isTransferInvestDisabled =
      transferingCategory === "invest" ? true : false;

    const transferBlock = (
      <div className={style.transfer}>
        <div
          className={
            isTransferCommonDisabled
              ? [style.transferItem, style.transferItemDisabled].join(" ")
              : style.transferItem
          }
        >
          <div className={style.transferTitle}>50%</div>
          {isTransferCommonDisabled ? (
            ""
          ) : (
            <input
              data-transfer="common"
              type="radio"
              name="transfer"
              onChange={this.handleTransferCateogry}
              checked={transferTo === "common" ? true : false}
            />
          )}
          <div className={style.fakeRadio} />
        </div>

        <div
          className={
            isTransferFunDisabled
              ? [style.transferItem, style.transferItemDisabled].join(" ")
              : style.transferItem
          }
        >
          <div className={style.transferTitle}>30%</div>
          {isTransferFunDisabled ? (
            ""
          ) : (
            <input
              data-transfer="fun"
              type="radio"
              name="transfer"
              onChange={this.handleTransferCateogry}
            />
          )}
          <div className={style.fakeRadio} />
        </div>

        <div
          className={
            isTransferInvestDisabled
              ? [style.transferItem, style.transferItemDisabled].join(" ")
              : style.transferItem
          }
        >
          <div className={style.transferTitle}>20%</div>
          {isTransferInvestDisabled ? (
            ""
          ) : (
            <input
              data-transfer="invest"
              type="radio"
              name="transfer"
              onChange={this.handleTransferCateogry}
              checked={transferTo === "invest" ? true : false}
              ref={this.props.inputRef}
            />
          )}
          <div className={style.fakeRadio} />
        </div>
      </div>
    );
    return (
      <CSSTransition
        in={this.state.in}
        timeout={1500}
        classNames={"alert_input"}
        mountOnEnter
        unmountOnExit
      >
        <div className={style.card}>
          {isInputRequired ? input : text}
          {isTransferBlock ? transferBlock : ""}
          {btnBlock}
        </div>
      </CSSTransition>
    );
  }
}

export { InputCard };
