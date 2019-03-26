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
      <span
        onClick={() => onClick(15000)}
        style={{ color: "#B3B3B3", fontWeight: "bold", fontSize: "25px" }}
      >
        Введите ваш текущий бюджет
      </span>
    )}
  </div>
);

export { WholeBudget };
