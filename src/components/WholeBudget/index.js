//@flow

import React from "react";

import "./style.css";

type PROPS = {
  wholeBudget?: number,
  onClick: Function
};
const WholeBudget = ({ wholeBudget, onClick }: PROPS) => (
  <div className="whole-budget">
    {wholeBudget || (
      <span className="whole-budget__enter" onClick={() => onClick(15000)}>
        Введите ваш текущий бюджет
      </span>
    )}
  </div>
);

export { WholeBudget };
