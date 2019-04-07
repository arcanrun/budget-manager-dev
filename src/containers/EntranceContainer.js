//@lfow

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as connectVK from "@vkontakte/vkui-connect-promise";

import { Entrance } from "../components/index";
import { signUp } from "../actions";

const mapStateToProps = (state: Object) => ({
  vk_id: state.user.vk_id
});

class EntranceContainer extends React.Component {
  componentDidMount() {}
  render() {
    return <Entrance {...this.props} />;
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    { signUp }
  )(EntranceContainer)
);
