//@flow
import React from "react";
import { connect } from "react-redux";

import { Manager } from "../components";
import { toggleModal } from "../actions";

const mapStateToProps = state => ({
  modalIsVisible: state.modal.modalIsVisible
});

export const ManagerContainer = connect(
  mapStateToProps,
  { onClickToggleModal: toggleModal }
)(Manager);
