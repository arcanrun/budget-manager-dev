//@flow
import React from "react";
import { connect } from "react-redux";

import { Header, BottomBar, Card } from "./components";
import { WholeBudgetContainer } from "./containers";
import { user } from "./static/user-data";

type PROPS = {
  onClick: () => mixed,
  menuIsVisible: boolean
};
type MenuState = {
  visible: boolean
};

type State = {
  menu: MenuState
};

class App extends React.Component<PROPS> {
  render() {
    return (
      <>
        <Header title={"менеджер"} />
        <Card headerTitle={"общий бюджет"} icon={"money-bag"}>
          <WholeBudgetContainer />
        </Card>

        <BottomBar />
      </>
    );
  }
}

const mapStateToProps = (state: State) => ({});

export default connect(
  mapStateToProps,
  {}
)(App);
