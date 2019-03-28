//@flow
import * as React from "react";

import style from "./Card.module.css";
import "../../static/icons.css";

import { Icon } from "../Icon";

type PROPS = {
  children: React.Node,
  headerTitle: string,
  icon: string
};

const Card = ({ children, headerTitle, icon }: PROPS) => (
  <div className={style.card}>
    <div className={style.header}>
      <Icon icon={icon} color="#B3B3B3" />
      <span className={style.title}>{headerTitle}</span>
    </div>
    {children}
  </div>
);

export { Card };
