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
  return (
    <div className={style.card}>
      <div className={style.title}>
        {typeModal === "budget" ? "Введите бюджет" : ""}
        {typeModal.includes("minus") ? "Расходы" : ""}
        {typeModal.includes("plus") ? "Доходы" : ""}
      </div>
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
      <div className={style.cardBtnsBlock}>
        <button onClick={() => onClick(typeModal)}>отмена</button>
        <button onClick={handleOK}>ок</button>
      </div>
    </div>
  );
};
export { InputCard };
