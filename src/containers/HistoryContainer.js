//@flow

import React from "react";
import { connect } from "react-redux";

import { getHistory, toggleModal, hideModal } from "../actions/index";

import { History } from "../components/index";

const mapStateToProps = (state: Object) => ({
  vk_id: state.user.vk_id,
  history: state.user.history.value,
  isFetching: state.user.history.isFetching,
  params: state.user.params
});

export const HistoryContainer = connect(mapStateToProps, {
  getHistory,
  toggleModal,
  hideModal
})(History);
