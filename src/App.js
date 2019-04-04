//@flow
import React from "react";
import { Route, Switch } from "react-router-dom";

import { Header, BottomBar } from "./components";
import {
  ManagerContainer,
  HistoryContainer,
  ProfileContainer
} from "./containers";
// import { user } from "./static/user-data";

type PROPS = {
  onClick: () => mixed,
  menuIsVisible: boolean
};

class App extends React.Component<PROPS> {
  render() {
    return (
      <>
        <Header title={"менеджер"} />
        <Switch>
          <Route path="/history" component={HistoryContainer} />
          <Route exact path="/" component={ManagerContainer} />
          <Route path="/profile" component={ProfileContainer} />
        </Switch>

        <BottomBar />
      </>
    );
  }
}

export default App;
