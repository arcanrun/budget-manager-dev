//@flow
import React from "react";
import "./style.css";
import "../../static/icons.css";

const BottomBar = () => (
  <div className="bottom-bar">
    <div className="bottom-bar__item">
      <i className="money-bag-icon" />
      <span>Item</span>
    </div>
    <div className="bottom-bar__item">
      <i className="money-bag-icon" />
      <span>Item</span>
    </div>
    <div className="bottom-bar__item">
      <i className="money-bag-icon" />
      <span>Item</span>
    </div>
  </div>
);

export { BottomBar };
