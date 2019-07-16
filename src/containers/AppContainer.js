import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { logIn, hideModal, makeProfileOperation } from "../actions";

import { App } from "../App";

const mapStateToProps = state => ({
  typeModal: state.modal.typeModal,
  vk_id: state.user.vk_id,
  isFetching: state.user.isFetching
});
export const AppContainer = withRouter(
  connect(
    mapStateToProps,
    { logIn, hideModal, makeProfileOperation }
  )(App)
);
