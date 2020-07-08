//@flow

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getHistory, toggleModal, hideModal } from "../actions/index";

import { History } from "../components/index";

const mapStateToProps = (state: Object) => ({
  vk_id: state.user.vk_id,
  history: state.user.history.value,
  isFetching: state.user.history.isFetching,
  params: state.user.params,
  currency: state.user.currency
});

export const HistoryContainer = withRouter(
  connect(mapStateToProps, { getHistory, toggleModal, hideModal })(History)
);
