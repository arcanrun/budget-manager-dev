//@flow
import React from "react";

import style from "./OperationType.module.css";

type PROPS = {
  children: string
};

const OperationType = ({ children }: PROPS) => {
  let sign = "";
  switch (children) {
    case "plus":
      sign = "+";
      break;
    case "minus":
      sign = "-";
      break;
    default:
      sign = "?";
      break;
  }
  return (
    <div
      className={
        sign === "+"
          ? [style.sign, style.signPlus].join(" ")
          : [style.sign, style.signMinus].join(" ")
      }
    >
      {children}
    </div>
  );
};

export { OperationType };
