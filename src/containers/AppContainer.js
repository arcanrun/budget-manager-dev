import React from "react";
import { connect } from "react-redux";

import { logIn, hideModal, makeProfileOperation } from "../actions";

import { App } from "../App";

const mapStateToProps = state => ({
  typeModal: state.modal.typeModal,
  vk_id: state.user.vk_id,
  isFetching: state.user.isFetching,
  isTutorDone: state.user.is_tutorial_done
});
export const AppContainer = connect(
  mapStateToProps,
  { logIn, hideModal, makeProfileOperation }
)(App);
