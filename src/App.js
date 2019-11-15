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

import { Overlay } from "./components";
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
  params: string
};

type STATE = {
  activeStory: ?string,
  popoutProfile: ?React.Node
};
export class App extends React.Component<PROPS, STATE> {
  state = { activeStory: "manager", popoutProfile: null };

  componentDidMount() {
    console.log(window.location);

    this.props.logIn(this.props.params);
  }

  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    if (nextState.activeStory !== window.location.pathname) {
      this.props.hideModal();
      this.setState({ activeStory: window.location.pathname });
      return false;
    }
    if (window.location.pathname === "/budget-manager/") {
      this.props.logIn(this.props.params);

      this.props.history.push("/budget-manager");
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
    this.props.makeProfileOperation("delete", this.props.params);
    this.props.history.push("/budget-manager");
  };

  render() {
    console.log("======>", this.props.history.push);

    console.log("[APP]------->", window.location.pathname);

    const {
      typeModal,
      hideModal,
      vk_id,
      makeProfileOperation,
      isFetching,
      isTutorDone,
      location,
      params
    } = this.props;

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

      default:
        break;
    }

    const tabbar = (
      <Tabbar>
        {isTutorDone ? (
          <TabbarItem
            onClick={this.onStoryChange}
            selected={location.pathname === "/budget-manager/history"}
            data-story="/budget-manager/history"
            // selected={activeStory === "history"}
            // data-story="history"
            text="История"
          >
            <Icon24Recent />
          </TabbarItem>
        ) : (
          ""
        )}
        <TabbarItem
          onClick={this.onStoryChange}
          selected={location.pathname === "/budget-manager"}
          data-story="/budget-manager"
          // selected={activeStory === "manager"}
          // data-story="manager"
          text="Менеджер"
        >
          <Icon24MoneyCircle />
        </TabbarItem>
        {isTutorDone ? (
          <TabbarItem
            onClick={this.onStoryChange}
            selected={location.pathname === "/budget-manager/profile"}
            data-story="/budget-manager/profile"
            // selected={activeStory === "profile"}
            // data-story="profile"
            text="Профиль"
          >
            <Icon24User />
          </TabbarItem>
        ) : (
          ""
        )}
      </Tabbar>
    );
    const historyView = (
      <View
        activePanel="main_panel"
        id="/budget-manager/history"
        // id="history"
        modal={<ModalHistoryContainer />}
      >
        <Panel id="main_panel">
          <PanelHeader>История</PanelHeader>
          <HistoryContainer />
        </Panel>
      </View>
    );
    const managerView = (
      <View
        activePanel="main_panel"
        id="/budget-manager"
        // id="manager"
        modal={<ModalContainer />}
      >
        <Panel id="main_panel">
          <PanelHeader>Менеджер</PanelHeader>
          <ManagerContainer />
        </Panel>
      </View>
    );
    const profileView = (
      <View
        activePanel="main_panel"
        id="/budget-manager/profile"
        // id="profile"
        popout={alert}
      >
        <Panel id="main_panel">
          <PanelHeader>Профиль</PanelHeader>
          <ProfileContainer />
        </Panel>
      </View>
    );
    const epic = (
      <Epic
        tabbar={tabbar}
        activeStory={location.pathname}
        // activeStory={activeStory}
      >
        {historyView}
        {managerView}
        {profileView}
      </Epic>
    );
    const entrance = (
      <>
        <Overlay isFetching={isFetching} />
        // <Overlay isFetching={false} />
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
