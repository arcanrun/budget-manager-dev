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
  common: state.user.calc.common.tempMonth,
  fun: state.user.calc.fun.tempMonth,
  invest: state.user.calc.invest.tempMonth,
  budget: state.user.calc.budget,
  params: state.user.params
});

export const ModalContainer = connect(mapStateToProps, {
  hideModal,
  calcBudget,
  calcTempCosts,
  addWholeBudget
})(Modal);
