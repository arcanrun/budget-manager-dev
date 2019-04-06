//@flow
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Header, BottomBar } from "./components";
import {
  ManagerContainer,
  HistoryContainer,
  ProfileContainer
} from "./containers";
import { EntranceContainer } from "./containers/EntranceContainer";
// import { user } from "./static/user-data";

type PROPS = {
  vk_id: ?number
};

class App extends React.Component<PROPS> {
  render() {
    const { vk_id } = this.props;

    return (
      <>
        {vk_id && <Header title={"менеджер"} />}
        <Switch>
          <Route path="/history" component={HistoryContainer} />
          {!vk_id ? (
            <Redirect exact to="/entrance" from="/" />
          ) : (
            <Route exact path="/" component={ManagerContainer} />
          )}

          <Route path="/profile" component={ProfileContainer} />
          <Route path="/entrance" component={EntranceContainer} />
        </Switch>
        {vk_id && <BottomBar />}
      </>
    );
  }
}

export default App;
