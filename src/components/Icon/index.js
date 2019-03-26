//@flow
import React from "react";
import ReactSVG from "react-svg";

import MonyeBag from "../../static/money-bag.svg";

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
    default:
      return <b>{icon}</b>;
  }
};

export { Icon };
