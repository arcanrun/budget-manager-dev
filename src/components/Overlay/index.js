import React from "react";

import { Spinner } from "../index";
import style from "./Overlay.module.css";

const Overlay = () => (
  <div className={style.overlay}>
    <Spinner />
  </div>
);

export { Overlay };
