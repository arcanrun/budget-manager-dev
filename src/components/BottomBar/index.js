//@flow
import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

import { Icon } from "../Icon";

const BottomBar = () => (
  <div className="bottom-bar">
    <Link to="/history" className="bottom-bar__item">
      <Icon icon="history" color="#200A9C" />
      <span>Item</span>
    </Link>
    <Link to="/" className="bottom-bar__item">
      <Icon icon="money-bag" color="#200A9C" />
      <span>Item</span>
    </Link>
    <Link to="/profile" className="bottom-bar__item">
      <Icon icon="profile" color="#200A9C" />
      <span>Item</span>
    </Link>
  </div>
);

export { BottomBar };
