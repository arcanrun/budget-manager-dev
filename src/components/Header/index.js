//@flow
import * as React from "react";
import "./style.css";
import "../../static/icons.css";

type PROPS = {
  title: string
};

export const Header = ({ title }: PROPS) => (
  <header className="header">
    <p className="header__title">{title}</p>
  </header>
);
