import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { logIn, hideModal, makeProfileOperation } from "../actions";

import { App } from "../App";

const mapStateToProps = state => ({
  typeModal: state.modal.typeModal,
  vk_id: state.user.vk_id,
  isFetching: state.user.isFetching,
  isTutorDone: state.user.is_tutorial_done,
  params: state.user.params,
  isVkTheme: state.user.is_vk_theme,
  isCostomDarkTheme: state.user.is_costom_dark_theme,
  themeVkClient: state.user.themeVkClient,
  budget: state.user.calc.budget,
  payDay: state.user.calc.pay_day,
  currency: state.user.currency
});
export const AppContainer = withRouter(
  connect(mapStateToProps, { logIn, hideModal, makeProfileOperation })(App)
);
