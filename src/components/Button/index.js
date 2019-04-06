//@flow

import React from "react";

import style from "./Button.module.css";

type PROPS = {
  onClick: Function,
  text: string,
  btnColor: string,
  size: string
};

export const Button = ({ text, btnColor, size, onClick }: PROPS) => {
  let width = "";
  switch (size) {
    case "L":
      width = "100%";
      break;
    case "M":
      width = "50%";
      break;
    case "S":
      width = "30%";
      break;
    default:
      width = "20%";
  }
  return (
    <button
      onClick={onClick}
      className={style.button}
      style={{ background: btnColor, width: width }}
    >
      {text}
    </button>
  );
};
