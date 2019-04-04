//@flow
import React from "react";

import style from "./OperationValue.module.css";

type PROPS = {
  children: string
};

const OperationValue = ({ children }: PROPS) => {
  let operType = "";
  switch (children) {
    case "common":
      operType = "50%";
      break;
    case "fun":
      operType = "30%";
      break;
    case "invest":
      operType = "20%";
      break;
    default:
      operType = "?";
      break;
  }
  return <div className={style.type}>{operType}</div>;
};

export { OperationValue };
