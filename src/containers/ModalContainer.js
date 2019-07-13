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
  vk_id: state.user.vk_id
});

export const ModalContainer = connect(
  mapStateToProps,
  { hideModal, calcBudget, calcTempCosts, addWholeBudget }
)(Modal);
