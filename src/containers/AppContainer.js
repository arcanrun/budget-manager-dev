import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { logIn } from "../actions";

import { App } from "../App";

const mapStateToProps = state => ({
  vk_id: state.user.vk_id,
  isFetching: state.user.isFetching
});
export const AppContainer = withRouter(
  connect(
    mapStateToProps,
    { logIn }
  )(App)
);
