//@flow

import React from "react";

import style from "./WholeBudget.module.css";
import { Spinner } from "../index";

type PROPS = {
  wholeBudget: ?number,
  onClick: Function,
  isFetching: boolean
};
const WholeBudget = ({ wholeBudget, onClick, isFetching }: PROPS) => (
  <div className={style.wholeBudget}>
    {isFetching ? (
      <Spinner />
    ) : (
      wholeBudget || (
        <span className={style.enter} onClick={onClick}>
          Введите ваш текущий бюджет
        </span>
      )
    )}
  </div>
);

export { WholeBudget };
