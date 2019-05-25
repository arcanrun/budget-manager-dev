//@flow

import React from "react";
import { CSSTransition } from "react-transition-group";

import style from "./InputCard.module.css";
import "./animations.css";
import "./animate.css";
import { Button, ButtonGroup } from "../index";

type PROPS = {
  onClick: Function,
  handleInput: Function,
  handleOK: Function,
  isErrorValidation: boolean,
  typeModal: string
};

type STATE = {
  in: boolean
};

class InputCard extends React.Component<PROPS, STATE> {
  state = {
    in: false
  };

  componentDidMount() {
    this.toggleAnimation();
  }
  componentWillUnmount() {
    this.toggleAnimation();
  }

  toggleAnimation = () => {
    this.setState({ in: !this.state.in });
  };
  handleTransferCateogry = (e: any) => {
    console.log("------>", e.target.value);
  };
  render() {
    const {
      isErrorValidation,
      typeModal,
      handleInput,
      onClick,
      handleOK
    } = this.props;
    let inputType = "text";

    const btnBlock = (
      <div className={style.cardBtnsBlock}>
        <button onClick={() => onClick(typeModal)}>отмена</button>
        <button onClick={handleOK}>ок</button>
      </div>
    );
    const btnBlock2 = (
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
    let text = "EMPTY";
    switch (true) {
      case typeModal.includes("profile_delete"):
        text = "Вы действительно хотите удалить профиль?";
        break;
      default:
        text = "NOT MATCHING";
        break;
    }

    const input = (
      <input
        placeholder="0000.00"
        className={
          isErrorValidation
            ? [style.cardInputError, style.cardInput].join(" ")
            : style.cardInput
        }
        autoFocus
        onChange={e => handleInput(e, typeModal)}
        type={inputType}
      />
    );

    const title = (
      <div className={style.title}>
        {typeModal === "budget" ? "Введите бюджет" : ""}
        {typeModal.includes("minus") ? "Расходы" : ""}
        {typeModal.includes("plus") ? "Доходы" : ""}
        {typeModal.includes("profile_delete") ? "Удалить профиль" : ""}
        {typeModal.includes("transfer") ? "Перевеод в другую категорию" : ""}
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
            <input type="radio" name="transfer" />
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
          {isTransferFunDisabled ? "" : <input type="radio" name="transfer" />}
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
            <input type="radio" name="transfer" />
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
          {title}
          {isInputRequired ? input : text}
          {isTransferBlock ? transferBlock : ""}
          {btnBlock2}
        </div>
      </CSSTransition>
    );
  }
}

export { InputCard };
