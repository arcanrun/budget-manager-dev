//@flow
import React from "react";
import ReactSVG from "react-svg";

import "./style.css";
import MonyeBag from "../../static/money-bag.svg";
import MonyeBag2 from "../../static/money-bag-2.svg";
import History from "../../static/history.svg";
import Profile from "../../static/profile.svg";
import Calendar from "../../static/calendar.svg";
import CalendarNumber from "../../static/calendar-number.svg";
import Pencil from "../../static/pencil.svg";
import Check from "../../static/check.svg";
import Cross from "../../static/cross.svg";
import Settings from "../../static/settings.svg";
import BudgetLogo from "../../static/budget-logo.svg";
import PyamentLogo from "../../static/payment-logo.svg";
import FunLogo from "../../static/fun-logo.svg";
import InvestLogo from "../../static/invest-logo.svg";
import ProtectLogo from "../../static/protect-logo.svg";
import Hieroglyph from "../../static/hieroglyph.svg";
import PieChartLogo from "../../static/pie-chart-logo.svg";

type PROPS = {|
  icon: string,
  color?: string,
  width?: string,
  height?: string,
  fontSize?: string
|};
const Icon = ({ icon, color, width, height, fontSize }: PROPS) => {
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
    case "money-bag-2":
      return (
        <ReactSVG
          src={MonyeBag2}
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
    case "calendar-number":
      return (
        <ReactSVG
          src={CalendarNumber}
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
    case "settings":
      return (
        <ReactSVG
          className="hoverable"
          src={Settings}
          wrapper="span"
          svgClassName="check"
          svgStyle={{ fill: color }}
        />
      );
    case "budget-logo":
      return (
        <ReactSVG
          className="hoverable"
          src={BudgetLogo}
          wrapper="span"
          svgClassName="budget-logo"
          svgStyle={{ width: width, height: height, fill: color }}
        />
      );
    case "payment-logo":
      return (
        <ReactSVG
          className="hoverable"
          src={PyamentLogo}
          wrapper="span"
          svgClassName="payment-logo"
          svgStyle={{ width: width, height: height, fill: color }}
        />
      );
    case "fun-logo":
      return (
        <ReactSVG
          className="hoverable"
          src={FunLogo}
          wrapper="span"
          svgClassName="fun-logo"
          svgStyle={{ width: width, height: height, fill: color }}
        />
      );
    case "invest-logo":
      return (
        <ReactSVG
          className="hoverable"
          src={InvestLogo}
          wrapper="span"
          svgClassName="fun-logo"
          svgStyle={{ width: width, height: height, fill: color }}
        />
      );
    case "protect-logo":
      return (
        <ReactSVG
          className="hoverable"
          src={ProtectLogo}
          wrapper="span"
          svgClassName="protect-logo"
          svgStyle={{ width: width, height: height, fill: color }}
        />
      );
    case "hieroglyph":
      return (
        <ReactSVG
          className="hoverable"
          src={Hieroglyph}
          wrapper="span"
          svgClassName="hieroglyph"
          svgStyle={{ width: width, height: height, fill: color }}
        />
      );
    case "pie-chart-logo":
      return (
        <ReactSVG
          className="hoverable"
          src={PieChartLogo}
          wrapper="span"
          svgClassName="pie-chart-logo"
          svgStyle={{ width: width, height: height, fill: color }}
        />
      );

    default:
      return (
        <b className="default-display" style={{ fontSize: fontSize }}>
          {icon}
        </b>
      );
  }
};

export { Icon };
