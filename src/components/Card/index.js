//@flow
import * as React from "react";

import style from "./Card.module.css";
import "../../static/icons.css";

import { Icon } from "../Icon";

type PROPS = {
  children: React.Node,
  headerTitle: string,
  icon: string,
  rightIcon?: string,
  onClick?: Function
};

const Card = ({ children, headerTitle, icon, rightIcon, onClick }: PROPS) => (
  <div className={style.card}>
    <div className={style.header}>
      <div>
        <Icon icon={icon} color="#B3B3B3" />
        <span className={style.title}>{headerTitle}</span>
      </div>
      <div className={style.options} onClick={onClick}>
        {rightIcon && <Icon icon={rightIcon} color="#B3B3B3" />}
      </div>
    </div>
    {children}
  </div>
);

export { Card };
