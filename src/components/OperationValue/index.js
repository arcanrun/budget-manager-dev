//@flow
import React from "react";

import style from "./OperationValue.module.css";
import { ShortenNumber } from "../index";

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
      <ShortenNumber minValToShort={1000000} size={12}>
        {children}
      </ShortenNumber>
    </div>
  );
};

export { OperationValue };
