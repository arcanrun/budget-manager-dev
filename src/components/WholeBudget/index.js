//@flow

import React from "react";

import style from "./WholeBudget.module.css";
import { Button, ButtonGroup } from "../index";

type PROPS = {
  wholeBudget: ?number,
  onClick: Function
};
const WholeBudget = ({ wholeBudget, onClick }: PROPS) => (
  <div className={style.budgetBlock}>
    {wholeBudget ? (
      <>
        <div className={style.budget}>
          {wholeBudget}
          <b className={style.volute}>₽</b>
        </div>
        <div className={style.footer}>
          <ButtonGroup>
            <Button btnColor="green" onClick="" text="+" />
            <Button btnColor="red" onClick="" text="-" />
          </ButtonGroup>
        </div>
      </>
    ) : (
      <span className={style.enter} onClick={onClick}>
        Введите ваш текущий бюджет
      </span>
    )}
  </div>
);

export { WholeBudget };
