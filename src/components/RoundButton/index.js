//@flow
import React from "react";

import style from "./RoundButotn.module.css";
import { Icon } from "../index";

type PROPS = {
  onClick: Function,
  text: string
};

export const RoundButton = ({ text, onClick }: PROPS) => {
  let icon = "";
  let color = "";
  let type = "";
  switch (text) {
    case "plus":
      icon = "plus";
      color = "#5281b9";
      type = style.greenBtn;
      break;
    case "minus":
      icon = "minus";
      color = "#5281b9";
      type = style.redBtn;
      break;
    default:
      console.log("RoundButton - ???");
      icon = "";
      break;
  }
  return (
    <div className={[style.container, type].join(" ")} onClick={onClick} />
  );
};
