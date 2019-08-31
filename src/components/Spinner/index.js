//@flow
import React from "react";

import style from "./Spinner.module.css";
import "./size.css";

type PROPS = {
  size: ?string
};

const Spinner = ({ size }: PROPS) => {
  let sizing = "defualt";
  switch (size) {
    case "s":
      sizing = "small";
      break;
    case "m":
      sizing = "medium";
      break;
    default:
      break;
  }
  return (
    <div className={[style.ldsRoller, sizing].join(" ")}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export { Spinner };
