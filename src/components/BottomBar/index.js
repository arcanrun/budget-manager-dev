//@flow
import React from "react";

import "./style.css";

import { ActiveLink } from "../index";

const BottomBar = () => (
  <div className="bottom-bar">
    <ActiveLink to="/history" icon={"history"} />
    <ActiveLink to="/" icon={"money-bag"} />
    <ActiveLink to="/profile" icon={"profile"} />
  </div>
);

export { BottomBar };
