//@flow
import React from "react";
import { connect } from "react-redux";

import { Modal } from "../components";
import {
  hideModal,
  calcBudget,
  calcTempCosts,
  addWholeBudget
} from "../actions";

const mapStateToProps = state => ({
  typeModal: state.modal.typeModal,
  daysToPayday: state.user.calc.daysToPayday,
  vk_id: state.user.vk_id,
  common: state.user.calc.common.value,
  fun: state.user.calc.fun.value,
  invest: state.user.calc.invest.value,
  budget: state.user.calc.budget,
  params: state.user.params
});

export const ModalContainer = connect(
  mapStateToProps,
  { hideModal, calcBudget, calcTempCosts, addWholeBudget }
)(Modal);
