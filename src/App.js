//@flow
import React from "react";
import { connect } from "react-redux";

import { Header, BottomBar } from "./components";
import { user } from "./static/user-data";
import { toggleMenu } from "./actions";

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
        <BottomBar />
      </>
    );
  }
}

const mapStateToProps = (state: State) => ({
  menuIsVisible: state.menu.visible
});

export default connect(
  mapStateToProps,
  { onClick: toggleMenu }
)(App);
