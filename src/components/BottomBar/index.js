//@flow
import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./style.css";

import { Icon } from "../Icon";

const BottomBar = () => (
  <div className="bottom-bar">
    <NavLink exact to="/history" className="bottom-bar__item">
      <Icon icon="history" color="#200A9C" />
      <div />
    </NavLink>
    <NavLink exact to="/" className="bottom-bar__item">
      <Icon icon="money-bag" color="#200A9C" />
      <div />
    </NavLink>
    <NavLink exact to="/profile" className="bottom-bar__item">
      <Icon icon="profile" color="#200A9C" />
      <div />
    </NavLink>
  </div>
);

export { BottomBar };
