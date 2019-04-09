//@flow
import * as React from "react";
import { Route } from "react-router-dom";

import "./style.css";

type PROPS = {
  title: string
};

export const Header = ({ title }: PROPS) => (
  <header className="header">
    <Route
      path="/profile"
      exact
      children={({ match }) => {
        return <p className="header__title">{match ? "профиль" : ""}</p>;
      }}
    />
    {/* <Route
      path="/"
      exact
      children={({ match }) => {
        return <p className="header__title">{match ? "менеджер" : ""}</p>;
      }}
    /> */}
    <Route
      path="/budget-manager"
      exact
      children={({ match }) => {
        return <p className="header__title">{match ? "менеджер" : ""}</p>;
      }}
    />
    <Route
      path="/history"
      exact
      children={({ match }) => {
        return <p className="header__title">{match ? "история" : ""}</p>;
      }}
    />
  </header>
);
