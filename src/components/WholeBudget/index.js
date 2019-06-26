//@flow

import React from "react";

import style from "./WholeBudget.module.css";
import { Button, ButtonGroup, RoundButton } from "../index";

type PROPS = {
  onClickToggleModal: Function,
  typeModal: string,
  wholeBudget: ?number
};
const WholeBudget = ({ wholeBudget, onClickToggleModal, typeModal }: PROPS) => (
  <div className={style.budgetBlock}>
    {wholeBudget ? (
      <>
        <div className={[style.budget, "first-step"].join(" ")}>
          {wholeBudget}
          <b className={style.volute}>₽</b>
        </div>

        <div className={style.footer}>
          <RoundButton
            text="plus"
            onClick={() => onClickToggleModal(`${typeModal}_plus`)}
          />
          <RoundButton
            text="minus"
            onClick={() => onClickToggleModal(`${typeModal}_minus`)}
          />
        </div>
      </>
    ) : (
      <span
        className={style.enter}
        onClick={() => onClickToggleModal(typeModal)}
      >
        Введите ваш текущий бюджет
      </span>
    )}
  </div>
);

export { WholeBudget };
