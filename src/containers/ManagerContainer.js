//@flow
import React from "react";
import { connect } from "react-redux";

import { Manager } from "../components";
import {
  toggleModal,
  addWholeBudget,
  addPayDay,
  getWholeBudget,
  getPayDay,
  calcToDayCosts,
  getAllCosts
} from "../actions/";

const mapStateToProps = state => ({
  modalIsVisible: state.modal.modalIsVisible,
  typeModal: state.modal.typeModal,
  budget: state.user.calc.budget,
  payday: state.user.calc.pay_day,
  isFetching_calc: state.user.calc.isFetching,
  daysToPayday: state.user.calc.daysToPayday,
  costs: state.user.calc,
  vk_id: state.user.vk_id
});

export const ManagerContainer = connect(
  mapStateToProps,
  {
    onClickToggleModal: toggleModal,
    addWholeBudget,
    addPayDay,
    getWholeBudget,
    getPayDay,
    calcToDayCosts,
    getAllCosts
  }
)(Manager);
