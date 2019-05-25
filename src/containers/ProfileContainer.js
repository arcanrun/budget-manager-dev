//@flow
import React from "react";
import { connect } from "react-redux";

import { Profile } from "../components/index";
import { toggleModal, makeProfileOperation, getStatistics } from "../actions/";

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
  calc: state.user.calc
});
export const ProfileContainer = connect(
  mapStateToProps,
  { toggleModal, makeProfileOperation, getStatistics }
)(Profile);
