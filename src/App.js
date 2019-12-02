//@flow
import React from "react";

import EntranceContainer from "./containers/EntranceContainer";
import {
  View,
  Panel,
  PanelHeader,
  Epic,
  Tabbar,
  TabbarItem,
  Alert
} from "@vkontakte/vkui";
import Icon24MoneyCircle from "@vkontakte/icons/dist/24/money_circle";
import Icon24User from "@vkontakte/icons/dist/24/user";
import Icon24Recent from "@vkontakte/icons/dist/24/recent";
import Icon24Settings from "@vkontakte/icons/dist/24/settings";

import { Overlay, SettingsPage, PanelMonthPicker } from "./components";
import {
  ManagerContainer,
  HistoryContainer,
  ProfileContainer,
  ModalContainer,
  ModalHistoryContainer
} from "./containers";

type PROPS = {
  logIn: Function,
  hideModal: Function,
  makeProfileOperation: Function,
  vk_id: ?number,
  isFetching: boolean,
  typeModal: ?string,
  isTutorDone: boolean,
  history: Array<any>,
  location: Object,
  params: string,
  isVkTheme: boolean,
  isCostomDarkTheme: boolean,
  themeVkClient: string,
  budget: string,
  payDay: string,
  currency: string
};

type STATE = {
  activeStory: ?string,
  popupAlert: ?React.Node,
  settingsPanels: string
};
export class App extends React.Component<PROPS, STATE> {
  state = {
    activeStory: "manager",
    popupAlert: null,
    settingsPanels: "main_panel"
  };

  componentDidMount() {
    this.props.logIn(this.props.params);
  }

  deleteProfile = () => {
    this.props.makeProfileOperation("delete");
    this.props.history.push("/budget-manager");
  };

  openAlert = (alertType: string, payload?: any) => {
    const deleteProfileAlert = (
      <Alert
        actionsLayout="vertical"
        actions={[
          {
            title: "Удалить профиль",
            autoclose: true,
            style: "destructive",
            action: this.deleteProfile
          },
          {
            title: "Отмена",
            autoclose: true,
            style: "cancel"
          }
        ]}
        onClose={this.colsoePopout}
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
            action: () => this.props.makeProfileOperation("history_delete_all")
          },
          {
            title: "Отмена",
            autoclose: true,
            style: "cancel"
          }
        ]}
        onClose={this.colsoePopout}
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
              this.props.makeProfileOperation("history_delete_month", payload)
          },
          {
            title: "Отмена",
            autoclose: true,
            style: "cancel"
          }
        ]}
        onClose={this.colsoePopout}
      >
        <h2>Подтвердите действие</h2>
        <p>Вы уверены, что хотите очистить историю за указанный месяц?</p>
      </Alert>
    );

    if (alertType === "profile_delete") {
      this.setState({ popupAlert: deleteProfileAlert });
    }
    if (alertType === "history_delete_all") {
      this.setState({ popupAlert: clearHistoryAlert });
    }
    if (alertType === "history_delete_month") {
      this.setState({ popupAlert: clearHistoryMonthAlert });
    }
  };

  colsoePopout = () => {
    this.setState({ popupAlert: null });
  };

  changePanelSetting = (panel: string) => {
    this.setState({ settingsPanels: panel });
    this.setState({ popupAlert: null });
    if (panel.includes("main")) {
      this.props.history.goBack();
    } else {
      this.props.history.push(`settings_${panel}`);
    }
  };

  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    const body = document.getElementsByTagName("body")[0];
    if (this.props.isVkTheme) {
      body.setAttribute("scheme", this.props.themeVkClient);
    }
    if (this.props.isCostomDarkTheme && !this.props.isVkTheme) {
      body.setAttribute("scheme", "client_dark");
    }
    if (!this.props.isCostomDarkTheme && !this.props.isVkTheme) {
      body.setAttribute("scheme", "client_light");
    }

    if (nextState.activeStory !== window.location.pathname) {
      this.props.hideModal();
      this.setState({ activeStory: window.location.pathname });
      this.setState({ popupAlert: null });

      return false;
    }

    return true;
  }
  onStoryChange = (e: Object) => {
    window.scroll(0, 0);
    const { story } = e.currentTarget.dataset;
    this.props.hideModal();
    this.setState({ activeStory: story });

    this.props.history.push(story);
  };

  render() {
    let page = "manager";

    if (window.location.pathname.includes("profile")) {
      page = "profile";
    }
    if (window.location.pathname.includes("history")) {
      page = "history";
    }
    if (window.location.pathname.includes("settings")) {
      page = "settings";
    }

    let panel = "main_panel";

    if (window.location.pathname.includes("settings_month_picker_panel")) {
      panel = "month_picker_panel";
    }

    const {
      typeModal,
      hideModal,
      vk_id,
      isFetching,
      isTutorDone,
      budget,
      payDay,
      currency
    } = this.props;

    const { activeStory } = this.state;

    const tabbar = (
      <Tabbar>
        {isTutorDone ? (
          <TabbarItem
            onClick={this.onStoryChange}
            selected={page === "history"}
            data-story="history"
            text="История"
          >
            <Icon24Recent />
          </TabbarItem>
        ) : (
          ""
        )}
        <TabbarItem
          onClick={this.onStoryChange}
          selected={page === "manager"}
          data-story="manager"
          text="Менеджер"
        >
          <Icon24MoneyCircle />
        </TabbarItem>
        {isTutorDone ? (
          <TabbarItem
            onClick={this.onStoryChange}
            selected={page === "profile"}
            data-story="profile"
            text="Профиль"
          >
            <Icon24User />
          </TabbarItem>
        ) : (
          ""
        )}
        {isTutorDone ? (
          <TabbarItem
            onClick={this.onStoryChange}
            selected={page === "settings"}
            data-story="settings"
            text="Настройки"
          >
            <Icon24Settings />
          </TabbarItem>
        ) : (
          ""
        )}
      </Tabbar>
    );
    const historyView = (
      <View
        activePanel="main_panel"
        id="history"
        modal={<ModalHistoryContainer />}
      >
        <Panel id="main_panel">
          <PanelHeader>История</PanelHeader>
          <HistoryContainer />
        </Panel>
      </View>
    );
    const managerView = (
      <View activePanel="main_panel" id="manager" modal={<ModalContainer />}>
        <Panel id="main_panel">
          <PanelHeader>Менеджер</PanelHeader>
          <ManagerContainer />
        </Panel>
      </View>
    );
    const profileView = (
      <View activePanel="main_panel" id="profile">
        <Panel id="main_panel">
          <PanelHeader>Профиль</PanelHeader>
          <ProfileContainer />
        </Panel>
      </View>
    );
    const settingsView = (
      <View activePanel={panel} id="settings" popout={this.state.popupAlert}>
        <Panel id="main_panel">
          <PanelHeader>Настройки</PanelHeader>
          <SettingsPage
            openAlert={this.openAlert}
            changePanelSetting={this.changePanelSetting}
          />
        </Panel>
        <Panel id="month_picker_panel">
          <PanelMonthPicker
            goTo={this.changePanelSetting}
            openAlert={this.openAlert}
          />
        </Panel>
      </View>
    );
    const epic = (
      <Epic tabbar={tabbar} activeStory={page}>
        {historyView}
        {managerView}
        {profileView}
        {settingsView}
      </Epic>
    );
    const entrance = (
      <>
        <Overlay isFetching={isFetching} />
        <EntranceContainer />
      </>
    );
    return <>{vk_id && budget && payDay && currency ? epic : entrance}</>;
  }
}
