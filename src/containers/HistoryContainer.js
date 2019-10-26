//@flow

import React from "react";
import { connect } from "react-redux";

import { getHistory } from "../actions/index";

import { History } from "../components/index";

const mapStateToProps = (state: Object) => ({
  vk_id: state.user.vk_id,
  history: state.user.history.value,
  isFetching: state.user.history.isFetching
});

export const HistoryContainer = connect(
  mapStateToProps,
  { getHistory }
)(History);
