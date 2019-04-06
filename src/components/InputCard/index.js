//@flow

import React from "react";

import style from "./InputCard.module.css";

type PROPS = {
  onClick: Function,
  handleInput: Function,
  handleOK: Function,
  isErrorValidation: boolean,
  typeModal: string
};

const InputCard = ({
  isErrorValidation,
  typeModal,
  handleInput,
  onClick,
  handleOK
}: PROPS) => {
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
    />
  );
  const btnBlock = (
    <div className={style.cardBtnsBlock}>
      <button onClick={() => onClick(typeModal)}>отмена</button>
      <button onClick={handleOK}>ок</button>
    </div>
  );
  let isInputRequired = false;
  switch (true) {
    case typeModal.includes("minus"):
    case typeModal.includes("plus"):
    case typeModal === "budget":
      isInputRequired = true;
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

  const title = (
    <div className={style.title}>
      {typeModal === "budget" ? "Введите бюджет" : ""}
      {typeModal.includes("minus") ? "Расходы" : ""}
      {typeModal.includes("plus") ? "Доходы" : ""}
      {typeModal.includes("profile_delete") ? "Удалить профиль" : ""}
    </div>
  );
  return (
    <div className={style.card}>
      {title}
      {isInputRequired ? input : text}
      {btnBlock}
    </div>
  );
};
export { InputCard };
