//@flow
import * as React from "react";

import "./style.css";
import "../../static/icons.css";

import { Icon } from "../Icon";

type PROPS = {
  children: React.Node,
  headerTitle: string,
  icon: string
};

const Card = ({ children, headerTitle, icon }: PROPS) => (
  <div className="card">
    <div className="card__header">
      <Icon icon={icon} color="#B3B3B3" />
      <span>{headerTitle}</span>
    </div>
    {children}
  </div>
);

export { Card };
