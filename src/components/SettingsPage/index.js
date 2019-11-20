//@flow
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { Cell, Switch, List, Button, Div } from "@vkontakte/vkui";
import connect from "@vkontakte/vkui-connect-promise";

import style from "./SettingsPage.module.css";
import { Card } from "../index";
import {
  tutorialChangeState,
  toggleModal,
  toggleVkClientTheme,
  toggleCustomDarkTheme
} from "../../actions";

export const SettingsPage = () => {
  let logger = "";

  connect
    .send("VKWebAppUpdateConfig", {})
    .then(res => {
      logger = res;
      return res;
    })
    .catch(err => {
      logger = err;
      return err;
    });
  console.log("========>", logger);

  const body = document.getElementsByTagName("body")[0];
  const switchCustom = useRef();
  const [isIn, setIn] = useState(false);
  const [theme, setTheme] = useState(false);
  const [test, setTest] = useState(false);

  const dispatch = useDispatch();
  const isTutorialDone = useSelector(state => state.user.is_tutorial_done);
  const isThemeVk = useSelector(state => state.user.is_vk_theme);
  const isThemeCustom = useSelector(state => state.user.is_costom_dark_theme);
  const themeVkClient = useSelector(state => state.user.themeVkClient);

  useEffect(() => {
    setIn(true);
    if (isThemeVk) {
      switchCustom.current.checked = false;
      body.setAttribute("scheme", themeVkClient);
    }
    if (isThemeCustom && !isThemeVk) {
      body.setAttribute("scheme", "client_dark");
    }
    if (!isThemeCustom && !isThemeVk) {
      body.setAttribute("scheme", "client_light");
    }
  });

  function toggleTheme(e) {
    console.log("CHECKED---->", e.currentTarget.checked);
  }

  const toggleVkTheme = () => {
    dispatch(toggleVkClientTheme(!isThemeVk));
  };

  const toggleDarkTheme = () => {
    dispatch(toggleCustomDarkTheme(!isThemeCustom));
  };

  const toggleTutorial = () => {
    dispatch(tutorialChangeState(!isTutorialDone));
  };

  return (
    <CSSTransition in={isIn} timeout={300} classNames={"page"}>
      <div className={style.settings}>
        <Card headerTitle={"Внешний вид"} icon={"eye"}>
          <Cell
            asideContent={
              <Switch
                defaultChecked={isThemeVk ? true : false}
                onChange={toggleVkTheme}
              />
            }
          >
            Тема клиента VK
          </Cell>
          <hr />
          <Cell
            asideContent={
              <Switch
                disabled={isThemeVk ? true : false}
                defaultChecked={isThemeCustom ? true : false}
                onChange={toggleDarkTheme}
                getRef={switchCustom}
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
