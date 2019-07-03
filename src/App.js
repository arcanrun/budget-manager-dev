//@flow
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Header, BottomBar, Overlay } from "./components";
import {
  ManagerContainer,
  HistoryContainer,
  ProfileContainer
} from "./containers";
import EntranceContainer from "./containers/EntranceContainer";
import { View, Panel, PanelHeader } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

type PROPS = {
  logIn: Function,
  vk_id: ?number,
  isFetching: boolean
};

class App extends React.Component<PROPS, {}> {
  componentDidMount() {
    this.props.logIn();
  }
  render() {
    const { vk_id, isFetching } = this.props;
    return (
      <>
        <Overlay isFetching={isFetching} />

        <View activePanel="main_panel" id="main_view">
          <Panel id="main_panel">
            {vk_id && (
              <PanelHeader>
                <Header />
              </PanelHeader>
            )}

            <Switch>
              <Route path="/history" component={HistoryContainer} />
              {!vk_id ? (
                <Redirect exact to="/" from="/budget-manager" />
              ) : (
                <Route
                  exact
                  path="/budget-manager"
                  component={ManagerContainer}
                />
              )}

              <Route path="/profile" component={ProfileContainer} />
              <Route path="/" component={EntranceContainer} />
            </Switch>
            {vk_id && <BottomBar />}
          </Panel>
          <Panel id="test">Just for test</Panel>
        </View>
      </>
    );
  }
}

export default App;
