//@flow
import React from "react";
import { connect } from "react-redux";

import { Profile } from "../components/index";
import { toggleModal, makeProfileOperation } from "../actions/";

const mapStateToProps = state => ({
  modalIsVisible: state.modal.modalIsVisible,
  typeModal: state.modal.typeModal,
  vk_id: state.user.vk_id,
  name: state.user.name,
  sure_name: state.user.sure_name,
  avatar: state.user.avatar
});
export const ProfileContainer = connect(
  mapStateToProps,
  { toggleModal, makeProfileOperation }
)(Profile);
