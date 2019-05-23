//@flow
import React from "react";

import style from "./OperationSign.module.css";
import { Icon } from "../index";

type PROPS = {
  children: string
};

const OperationSign = ({ children }: PROPS) => {
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
      <Icon icon={children} color="#fff" />
    </div>
  );
};

export { OperationSign };
