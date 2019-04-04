//@flow
import React from "react";
import { Route, Switch } from "react-router-dom";

import { Header, BottomBar, Profile } from "./components";
import { ManagerContainer, HistoryContainer } from "./containers";
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
          <Route path="/profile" component={Profile} />
        </Switch>

        <BottomBar />
      </>
    );
  }
}

export default App;
