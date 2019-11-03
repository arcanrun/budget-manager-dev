import React from "react";
import { connect } from "react-redux";

import { ModalHistory } from "../components";
import { hideModal } from "../actions/index";

const mapStateToProps = state => ({
  typeModal: state.modal.typeModal,
  payload: state.modal.payload
});

export const ModalHistoryContainer = connect(
  mapStateToProps,
  { hideModal }
)(ModalHistory);
