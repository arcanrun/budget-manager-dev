//@flow
import React from "react";
import { Link, Route } from "react-router-dom";

import { Icon } from "../index";
import "./style.css";

type PROPS = {
  to: string,
  icon: string
};

const ActiveLink = ({ to, icon }: PROPS) => (
  <Route
    path={to}
    exact
    children={({ match }) => (
      <Link exact to={to} className="bottom-bar__item">
        <Icon icon={icon} color={match ? "#F72D6B" : "#200A9E"} />
        {match ? <div /> : ""}
      </Link>
    )}
  />
);

export { ActiveLink };
