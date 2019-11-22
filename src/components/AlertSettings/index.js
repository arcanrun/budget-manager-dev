//@flow
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  View,
  Panel,
  Epic,
  PanelHeader,
  Tabbar,
  TabbarItem,
  Alert
} from "@vkontakte/vkui";

import { hideModal, makeProfileOperation } from "../../actions";

type PROPS = {
  history: Object
};

const AlertSettings = ({ history }: PROPS) => {
  const dispatch = useDispatch();
  const typeModal = useSelector(state => state.modal.typeModal);

  const deleteProfile = () => {
    dispatch(() => makeProfileOperation("delete"));
    history.push("/budget-manager");
  };

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
      onClose={() => dispatch(hideModal())}
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
          action: () => console.log("CLEAR")
        },
        {
          title: "Отмена",
          autoclose: true,
          style: "cancel"
        }
      ]}
      onClose={() => dispatch(hideModal())}
    >
      <h2>Подтвердите действие</h2>
      <p>Вы уверены, что хотите очистить всю историю?</p>
    </Alert>
  );

  if (typeModal === "profile_delete") {
    return deleteProfileAlert;
  }
  if (typeModal === "history_delete_all") {
    return clearHistoryAlert;
  }
  return null;
};

export default withRouter(AlertSettings);
