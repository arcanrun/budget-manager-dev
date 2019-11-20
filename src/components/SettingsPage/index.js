//@flow
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { Cell, Switch, List, Button, Div } from "@vkontakte/vkui";

import style from "./SettingsPage.module.css";
import { Card } from "../index";
import { tutorialChangeState, toggleModal } from "../../actions";

export const SettingsPage = () => {
  const [isIn, setIn] = useState(false);
  const [theme, setTheme] = useState(false);

  const dispatch = useDispatch();
  const isTutorialDone = useSelector(state => state.user.is_tutorial_done);
  const isThemeVk = useSelector(state => state.user.is_vk_theme);
  const tsThemeCustom = useSelector(state => state.user.is_costom_dark_theme);

  useEffect(() => {
    setIn(true);
  });

  function toggleTheme(e) {
    console.log("CHECKED---->", e.currentTarget.checked);
  }

  const toggleTutorial = () => {
    dispatch(tutorialChangeState(!isTutorialDone));
  };

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
          <Cell
            asideContent={
              <Switch
                defaultChecked={isThemeVk ? true : false}
                onChange={switchTheme}
              />
            }
          >
            Тема клиента VK {theme}
          </Cell>
          <hr />
          <Cell
            asideContent={
              <Switch
                disabled={isThemeVk ? true : false}
                defaultChecked={tsThemeCustom ? true : false}
                onChange={e => toggleTheme(e)}
              />
            }
          >
            Темная тема
          </Cell>
        </Card>
        <Card headerTitle={"Обучение"} icon={"bulb"}>
          <Cell
            asideContent={
              <Switch
                defaultChecked={isTutorialDone ? false : true}
                onChange={toggleTutorial}
              />
            }
          >
            Показть обучение
          </Cell>
        </Card>
        <Card headerTitle={"История"} icon={"history"}>
          <Cell
            description={"За месяц или за все время"}
            asideContent={<Switch onChange={e => toggleTheme(e)} />}
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

        <Card icon={"profile"} headerTitle="Профиль">
          <hr style={{ opacity: 0 }} />
          <Button
            size="xl"
            level="destructive"
            onClick={() => dispatch(toggleModal("profile_delete"))}
          >
            Удалить профиль
          </Button>
        </Card>
      </div>
    </CSSTransition>
  );
};
