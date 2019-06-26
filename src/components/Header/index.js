//@flow
import * as React from "react";
import { Route } from "react-router-dom";

import style from "./Header.module.css";

export const Header = () => (
  <>
    <Route
      path="/profile"
      exact
      children={({ match }) => {
        return match ? <span className={style.headerTitle}>профиль</span> : "";
      }}
    />

    <Route
      path="/budget-manager"
      exact
      children={({ match }) => {
        return match ? <span className={style.headerTitle}>менеджер</span> : "";
      }}
    />
    <Route
      path="/history"
      exact
      children={({ match }) => {
        return match ? <span className={style.headerTitle}>история</span> : "";
      }}
    />
  </>
);
