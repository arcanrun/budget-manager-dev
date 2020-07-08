//@flow
import React from "react";

import style from "./OperationValue.module.css";
import { toPrettyNumber } from "../../helpers/prettyNumbers";

type PROPS = {
  children: string,
  sign: string,
  currency: string
};

const OperationValue = ({ children, sign, currency }: PROPS) => {
  return (
    <div
      className={
        sign === "plus"
          ? [style.value, style.valuePlus].join(" ")
          : sign === "transfer"
          ? [style.value, style.valueTransfer].join(" ")
          : [style.value, style.valueMinus].join(" ")
      }
    >
      {toPrettyNumber(
        children,
        true,
        1000000,
        true,
        1e18,
        "",
        "0.00a",
        "0.00",
        false,
        currency
      )}
    </div>
  );
};

export { OperationValue };
