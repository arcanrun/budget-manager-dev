//@flow
import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Cell, Switch, List, Button, Div } from "@vkontakte/vkui";

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
          <Cell asideContent={<Switch defaultChecked />}>Тема клиента VK</Cell>
          <hr />
          <Cell asideContent={<Switch disabled />}>Темная тема</Cell>
        </Card>
        <Card headerTitle={"Обучение"} icon={"bulb"}>
          <Cell asideContent={<Switch />}>Показть обучение</Cell>
        </Card>
        <Card headerTitle={"История"} icon={"history"}>
          <Cell
            description={"За месяц или за все время"}
            asideContent={<Switch defaultChecked />}
          >
            Показывать всю историю
          </Cell>
          <hr style={{ marginBottom: "20px" }} />
          <div style={{ marginBottom: "20px" }}>
            <Button
              size="xl"
              level="secondary"
              onClick={() => console.log("unrealized")}
            >
              Очисить историю за месяц
            </Button>
          </div>
          <Button
            size="xl"
            level="destructive"
            onClick={() => console.log("unrealized")}
          >
            Очисить историю
          </Button>
        </Card>
      </div>
    </CSSTransition>
  );
};
