//@flow
import React from "react";

import "./style.css";

import { Icon } from "../Icon";

const BottomBar = () => (
  <div className="bottom-bar">
    <div className="bottom-bar__item">
      <Icon icon="money-bag" color="#200A9C" />
      <span>Item</span>
    </div>
    <div className="bottom-bar__item">
      <Icon icon="money-bag" color="#200A9C" />
      <span>Item</span>
    </div>
    <div className="bottom-bar__item">
      <Icon icon="money-bag" color="#200A9C" />
      <span>Item</span>
    </div>
  </div>
);

export { BottomBar };
