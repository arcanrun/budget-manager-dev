//@flow

import React from "react";

import style from "./WholeBudget.module.css";
import { Button, ButtonGroup } from "../index";

type PROPS = {
  onClickToggleModal: Function,
  typeModal: string,
  wholeBudget: ?number
};
const WholeBudget = ({ wholeBudget, onClickToggleModal, typeModal }: PROPS) => (
  <div className={style.budgetBlock}>
    {wholeBudget ? (
      <>
        <div className={style.budget}>
          {wholeBudget}
          <b className={style.volute}>₽</b>
        </div>
        <div className={style.footer}>
          <ButtonGroup>
            <Button
              btnColor="green"
              onClick={() => onClickToggleModal(`${typeModal}_plus`)}
              text="+"
            />
            <Button
              btnColor="red"
              onClick={() => onClickToggleModal(`${typeModal}_minus`)}
              text="-"
            />
          </ButtonGroup>
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
