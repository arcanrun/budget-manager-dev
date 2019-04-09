//@flow
import React from "react";

import style from "./BottomBar.module.css";

import { ActiveLink } from "../index";

const BottomBar = () => (
  <div className={style.bottomBar}>
    {/* <ActiveLink to="/history" icon={"history"} />
    <ActiveLink to="/" icon={"money-bag"} />
    <ActiveLink to="/profile" icon={"profile"} /> */}
    <ActiveLink to="/history" icon={"history"} />
    <ActiveLink to="/budget-manager" icon={"money-bag"} />
    <ActiveLink to="/profile" icon={"profile"} />
  </div>
);

export { BottomBar };
