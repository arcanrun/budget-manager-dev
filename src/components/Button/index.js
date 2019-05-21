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
  let btnStyle = "";
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
      break;
  }
  switch (btnColor) {
    case "red":
      btnStyle = style.redBtn;
      break;
    default:
      btnStyle = style.defautlBtn;
      break;
  }
  console.log("----->", btnStyle);
  return (
    <button
      onClick={onClick}
      className={[btnStyle, style.button].join(" ")}
      style={{
        width: width
      }}
    >
      {text}
    </button>
  );
};
