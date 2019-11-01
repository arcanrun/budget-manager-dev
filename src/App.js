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

import { Header, BottomBar, Overlay } from "./components";
import {
  ManagerContainer,
  HistoryContainer,
  ProfileContainer,
  ModalContainer
} from "./containers";

type PROPS = {
  logIn: Function,
  hideModal: Function,
  makeProfileOperation: Function,
  vk_id: ?number,
  isFetching: boolean,
  typeModal: ?string,
  isTutorDone: boolean
};

type STATE = {
  activeStory: ?string,
  popoutProfile: ?React.Node
};

export class App extends React.Component<PROPS, STATE> {
  state = { activeStory: "manager", popoutProfile: null };

  componentDidMount() {
    this.props.logIn();
  }

  onStoryChange = (e: Object) => {
    const { isTutorDone } = this.props;
    if (isTutorDone) {
      window.scroll(0, 0);
      const { story } = e.currentTarget.dataset;
      this.setState({ activeStory: story });
    } else {
      this.setState({ activeStory: "manager" });
    }
  };

  render() {
    const {
      typeModal,
      hideModal,
      vk_id,
      makeProfileOperation,
      isFetching
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
                action: () => makeProfileOperation("delete")
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
        <TabbarItem
          onClick={this.onStoryChange}
          selected={activeStory === "history"}
          data-story="history"
          text="История"
        >
          <Icon24Recent />
        </TabbarItem>
        <TabbarItem
          onClick={this.onStoryChange}
          selected={activeStory === "manager"}
          data-story="manager"
          text="Менеджер"
        >
          <Icon24MoneyCircle />
        </TabbarItem>
        <TabbarItem
          onClick={this.onStoryChange}
          selected={activeStory === "profile"}
          data-story="profile"
          text="Профиль"
        >
          <Icon24User />
        </TabbarItem>
      </Tabbar>
    );
    const epic = (
      <Epic tabbar={tabbar} activeStory={activeStory}>
        <View activePanel="main_panel" id="history">
          <Panel id="main_panel">
            <PanelHeader>История</PanelHeader>
            <HistoryContainer />
          </Panel>
        </View>
        <View activePanel="main_panel" id="manager" modal={<ModalContainer />}>
          <Panel id="main_panel">
            <PanelHeader>Менеджер</PanelHeader>
            <ManagerContainer />
          </Panel>
        </View>
        <View activePanel="main_panel" id="profile" popout={alert}>
          <Panel id="main_panel">
            <PanelHeader>Профиль</PanelHeader>
            <ProfileContainer />
          </Panel>
        </View>
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
