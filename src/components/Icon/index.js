//@flow
import React from "react";
import ReactSVG from "react-svg";

import "./style.css";
import MonyeBag from "../../static/money-bag.svg";
import History from "../../static/history.svg";
import Profile from "../../static/profile.svg";

type PROPS = {|
  icon: string,
  color: string
|};
const Icon = ({ icon, color }: PROPS) => {
  switch (icon) {
    case "money-bag":
      return (
        <ReactSVG
          src={MonyeBag}
          wrapper="span"
          svgClassName="money-bag-icon"
          svgStyle={{ fill: color }}
        />
      );
    case "history":
      return (
        <ReactSVG
          src={History}
          wrapper="span"
          svgClassName="history"
          svgStyle={{ fill: color }}
        />
      );
    case "profile":
      return (
        <ReactSVG
          src={Profile}
          wrapper="span"
          svgClassName="profile"
          svgStyle={{ fill: color }}
        />
      );
    default:
      return <b>{icon}</b>;
  }
};

export { Icon };
