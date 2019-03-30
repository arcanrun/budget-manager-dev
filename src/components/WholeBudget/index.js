//@flow

import React from "react";

import style from "./WholeBudget.module.css";

type PROPS = {
  wholeBudget: ?number,
  onClick: Function
};
const WholeBudget = ({ wholeBudget, onClick }: PROPS) => (
  <div className={style.budgetBlock}>
    {(
      <div className={style.budget}>
        {wholeBudget}
        <b className={style.volute}>₽</b>
      </div>
    ) || (
      <span className={style.enter} onClick={onClick}>
        Введите ваш текущий бюджет
      </span>
    )}
  </div>
);

export { WholeBudget };
