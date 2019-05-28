//@flow
import * as React from "react";
import { Route } from "react-router-dom";

import "./style.css";

export const Header = () => (
  <>
    <Route
      path="/profile"
      exact
      children={({ match }) => {
        return match ? <span class="header__title">профиль</span> : "";
      }}
    />

    <Route
      path="/budget-manager"
      exact
      children={({ match }) => {
        return match ? <span class="header__title">менеджер</span> : "";
      }}
    />
    <Route
      path="/history"
      exact
      children={({ match }) => {
        return match ? <span class="header__title">история</span> : "";
      }}
    />
  </>
);
