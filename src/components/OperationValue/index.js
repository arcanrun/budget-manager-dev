//@flow
import React from "react";

import style from "./OperationValue.module.css";

type PROPS = {
  children: string,
  sign: string
};

const OperationValue = ({ children, sign }: PROPS) => {
  return (
    <div
      className={
        sign === "plus"
          ? [style.value, style.valuePlus].join(" ")
          : [style.value, style.valueMinus].join(" ")
      }
    >
      {children}
    </div>
  );
};

export { OperationValue };
