//@flow
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, Panel, PanelHeader, Alert } from "@vkontakte/vkui";

import { SettingsPage, PanelMonthPicker } from "../index";
import { makeProfileOperation } from "../../actions";

type PROPS = {
  panel: string,
  history: Object
};

export const SettingsView = ({ panel, history }: PROPS) => {
  const [popupAlert, setPopupAlert] = useState(null);
  const dispatch = useDispatch();

  const deleteProfile = () => {
    dispatch(makeProfileOperation("delete"));
    history.push("/budget-manager");
  };

  const colsoePopout = () => {
    setPopupAlert(null);
  };

  useEffect(() => {
    setPopupAlert(null);
  });

  const openAlert = (alertType: string, payload?: any) => {
    const deleteProfileAlert = (
      <Alert
        actionsLayout="vertical"
        actions={[
          {
            title: "Удалить профиль",
            autoclose: true,
            style: "destructive",
            action: deleteProfile
          },
          {
            title: "Отмена",
            autoclose: true,
            style: "cancel"
          }
        ]}
        onClose={colsoePopout}
      >
        <h2>Подтвердите действие</h2>
        <p>Вы уверены, что хотите удалить профиль?</p>
      </Alert>
    );

    const clearHistoryAlert = (
      <Alert
        actionsLayout="vertical"
        actions={[
          {
            title: "Очистить историю",
            autoclose: true,
            style: "destructive",
            action: () => dispatch(makeProfileOperation("history_delete_all"))
          },
          {
            title: "Отмена",
            autoclose: true,
            style: "cancel"
          }
        ]}
        onClose={colsoePopout}
      >
        <h2>Подтвердите действие</h2>
        <p>Вы уверены, что хотите очистить всю историю?</p>
      </Alert>
    );

    const clearHistoryMonthAlert = (
      <Alert
        actionsLayout="vertical"
        actions={[
          {
            title: "Очистить историю",
            autoclose: true,
            style: "destructive",
            action: () =>
              dispatch(makeProfileOperation("history_delete_month", payload))
          },
          {
            title: "Отмена",
            autoclose: true,
            style: "cancel"
          }
        ]}
        onClose={colsoePopout}
      >
        <h2>Подтвердите действие</h2>
        <p>Вы уверены, что хотите очистить историю за указанный месяц?</p>
      </Alert>
    );

    if (alertType === "profile_delete") {
      setPopupAlert(deleteProfileAlert);
    }
    if (alertType === "history_delete_all") {
      setPopupAlert(clearHistoryAlert);
    }
    if (alertType === "history_delete_month") {
      setPopupAlert(clearHistoryMonthAlert);
    }
  };
  const changePanelSetting = (panel: string) => {
    setPopupAlert(null);
    if (panel.includes("main")) {
      history.goBack();
    } else {
      history.push(`settings_${panel}`);
    }
  };
  return (
    <View activePanel={panel} id="settings" popout={popupAlert}>
      <Panel id="main_panel">
        <PanelHeader>Настройки</PanelHeader>
        <SettingsPage
          openAlert={openAlert}
          changePanelSetting={changePanelSetting}
        />
      </Panel>
      <Panel id="month_picker_panel">
        <PanelMonthPicker goTo={changePanelSetting} openAlert={openAlert} />
      </Panel>
    </View>
  );
};
