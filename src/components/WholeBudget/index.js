//@flow

import React from "react";

import "./style.css";

type PROPS = {
  wholeBudget?: number
};
const WholeBudget = ({ wholeBudget }: PROPS) => (
  <div className="whole-budget">
    {wholeBudget || (
      <span style={{ color: "#B3B3B3", fontWeight: "bold" }}>
        Введите ваш текущий бюджет
      </span>
    )}
  </div>
);

export { WholeBudget };
