//@flow
import React from "react";
import ReactSVG from "react-svg";

import "./style.css";
import MonyeBag from "../../static/money-bag.svg";
import History from "../../static/history.svg";
import Profile from "../../static/profile.svg";
import Calendar from "../../static/calendar.svg";
import Pencil from "../../static/pencil.svg";
import Check from "../../static/check.svg";
import Cross from "../../static/cross.svg";

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
    case "calendar":
      return (
        <ReactSVG
          src={Calendar}
          wrapper="span"
          svgClassName="calendar"
          svgStyle={{ fill: color }}
        />
      );
    case "pencil":
      return (
        <ReactSVG
          className="hoverable"
          src={Pencil}
          wrapper="span"
          svgClassName="pencil"
          svgStyle={{ fill: color }}
        />
      );
    case "cross":
      return (
        <ReactSVG
          className="hoverable"
          src={Cross}
          wrapper="span"
          svgClassName="cross"
          svgStyle={{ fill: color }}
        />
      );
    case "check":
      return (
        <ReactSVG
          className="hoverable"
          src={Check}
          wrapper="span"
          svgClassName="check"
          svgStyle={{ fill: color }}
        />
      );

    default:
      return <b>{icon}</b>;
  }
};

export { Icon };
