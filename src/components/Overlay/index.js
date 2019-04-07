//@flow
import React from "react";

import { Spinner } from "../index";
import style from "./Overlay.module.css";

type PROPS = {
  isTransparent?: boolean
};

const Overlay = ({ isTransparent }: PROPS) =>
  isTransparent ? (
    <div className={style.overlay} />
  ) : (
    <div className={style.overlay} style={{ backgroundColor: "#EAEFF2" }}>
      <Spinner />
    </div>
  );

export { Overlay };
