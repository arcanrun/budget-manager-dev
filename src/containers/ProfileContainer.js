//@flow
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Profile } from "../components/index";
import {
  toggleModal,
  makeProfileOperation,
  getStatistics,
  getHistoryShort
} from "../actions/";

const mapStateToProps = state => ({
  modalIsVisible: state.modal.modalIsVisible,
  typeModal: state.modal.typeModal,
  vk_id: state.user.vk_id,
  name: state.user.name,
  sure_name: state.user.sure_name,
  avatar: state.user.avatar,
  isFetching: state.user.statistics.isFetching,
  costs: state.user.statistics.costs,
  income: state.user.statistics.income,
  toDayFormated: state.user.calc.toDayFormated,
  registerDate: state.user.register_date,
  calc: state.user.calc,
  history: state.user.history.value,
  timezone: state.user.timezone,
  params: state.user.params,
  currency: state.user.currency
});
export const ProfileContainer = withRouter(
  connect(mapStateToProps, {
    toggleModal,
    makeProfileOperation,
    getStatistics,
    getHistoryShort
  })(Profile)
);
