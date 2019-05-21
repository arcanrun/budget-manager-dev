//@flow
import React from "react";

import style from "./ButtonGroup.module.css";

type PROPS = {
  children: any
};

export const ButtonGroup = ({ children }: PROPS) => {
  return <div className={style.contianer}>{children}</div>;
};
