//@flow
import React from "react";

import style from "./OperationSign.module.css";
import { Icon } from "../index";

type PROPS = {
  children: string
};

const OperationSign = ({ children }: PROPS) => {
  let sign = "";
  let classType = "";
  switch (children) {
    case "plus":
      classType = [style.sign, style.signPlus].join(" ");
      break;
    case "minus":
      classType = [style.sign, style.signMinus].join(" ");
      break;
    case "transfer":
      classType = [style.sign, style.signTransfer].join(" ");
      break;
    default:
      classType = [style.sign, style.signTransfer].join(" ");
      break;
  }
  return (
    <div className={classType}>
      <Icon icon={children} color="#fff" />
    </div>
  );
};

export { OperationSign };
