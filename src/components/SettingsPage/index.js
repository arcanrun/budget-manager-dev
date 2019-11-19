//@flow
import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import style from "./SettingsPage.module.css";
import { Card } from "../index";

export const SettingsPage = () => {
  const [isIn, setIn] = useState(false);
  useEffect(() => {
    setIn(true);
  });

  function switchTheme() {
    const body = document.getElementsByTagName("body")[0];
    console.log(body.getAttribute("scheme"));
    const scheme = body.getAttribute("scheme");
    if (scheme === "client_dark") {
      body.setAttribute("scheme", "client_light");
    } else if (scheme === "client_light") {
      body.setAttribute("scheme", "client_dark");
    } else {
      body.setAttribute("scheme", "client_dark");
    }
  }

  return (
    <CSSTransition in={isIn} timeout={300} classNames={"page"}>
      <div className={style.settings}>
        <Card headerTitle={"Внешний вид"} icon={"eye"}>
          theme
        </Card>
        <Card headerTitle={"Обучение"} icon={"bulb"}>
          theme
        </Card>
        <Card headerTitle={"История"} icon={"history"}>
          theme
        </Card>
      </div>
    </CSSTransition>
  );
};
