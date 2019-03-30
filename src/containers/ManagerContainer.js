//@flow
import React from "react";
import { connect } from "react-redux";

import { Manager } from "../components";
import {
  toggleModal,
  addWholeBudget,
  addPayDay,
  getWholeBudget,
  getPayDay
} from "../actions/";

const mapStateToProps = state => ({
  modalIsVisible: state.modal.modalIsVisible,
  typeModal: state.modal.typeModal,
  wholeBudget: state.user.wholeBudget.budget,
  payday: state.user.pay_day.pay_day,
  wholeBudget_isFetching: state.user.wholeBudget.isFetching,
  payday_isFetching: state.user.pay_day.isFetching,
  daysToPayday: state.user.daysToPayday,
  common: state.user.calc["50"]
});

export const ManagerContainer = connect(
  mapStateToProps,
  {
    onClickToggleModal: toggleModal,
    addWholeBudget,
    addPayDay,
    getWholeBudget,
    getPayDay
  }
)(Manager);
