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

import { Overlay, SettingsPage } from "./components";
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
  themeVkClient: string
};

type STATE = {
  activeStory: ?string,
  popoutProfile: ?React.Node
};
export class App extends React.Component<PROPS, STATE> {
  state = { activeStory: "manager", popoutProfile: null };

  componentDidMount() {
    this.props.logIn(this.props.params);
  }

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
  deleteProfile = () => {
    this.props.makeProfileOperation("delete");
    this.props.history.push("/budget-manager");
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

    const { typeModal, hideModal, vk_id, isFetching, isTutorDone } = this.props;

    const { activeStory } = this.state;
    let alert = null;
    switch (typeModal) {
      case "profile_delete":
        alert = (
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
            onClose={hideModal}
          >
            <h2>Подтвердите действие</h2>
            <p>Вы уверены, что хотите удалить профиль?</p>
          </Alert>
        );
        break;
      case "history_delete_all":
        alert = (
          <Alert
            actionsLayout="vertical"
            actions={[
              {
                title: "Очистить историю",
                autoclose: true,
                style: "destructive",
                action: () =>
                  this.props.makeProfileOperation(
                    "history_delete_all",
                    this.props.params
                  )
              },
              {
                title: "Отмена",
                autoclose: true,
                style: "cancel"
              }
            ]}
            onClose={hideModal}
          >
            <h2>Подтвердите действие</h2>
            <p>Вы уверены, что хотите очистить всю историю?</p>
          </Alert>
        );
        break;

      default:
        break;
    }

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
      <View activePanel="main_panel" id="profile" popout={alert}>
        <Panel id="main_panel">
          <PanelHeader>Профиль</PanelHeader>
          <ProfileContainer />
        </Panel>
      </View>
    );
    const settingsView = (
      <View activePanel="main_panel" id="settings" popout={alert}>
        <Panel id="main_panel">
          <PanelHeader>Настройки</PanelHeader>
          <SettingsPage />
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
    return <>{vk_id ? epic : entrance}</>;
  }
}
// <>
//   <Overlay isFetching={false} />
//   <View
//     activePanel="main_panel"
//     id="main_view"
//     modal={<ModalContainer />}
//   >
//     <Panel id="main_panel">
//       {vk_id && (
//         <PanelHeader>
//           <Header />
//         </PanelHeader>
//       )}

//       <Switch>
//         <Route path="/history" component={HistoryContainer} />
//         {!vk_id ? (
//           <Redirect exact to="/" from="/budget-manager" />
//         ) : (
//           <Route
//             exact
//             path="/budget-manager"
//             component={ManagerContainer}
//           />
//         )}

//         <Route path="/profile" component={ProfileContainer} />
//         <Route path="/" component={EntranceContainer} />
//       </Switch>
//       {vk_id && <BottomBar />}
//     </Panel>
//     <Panel id="test">Just for test</Panel>
//   </View>
// </>
