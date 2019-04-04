//@flow
import React from "react";
import { connect } from "react-redux";

import { Profile } from "../components/index";

const mapStateToProps = state => ({
  vk_id: state.user.vl_id,
  name: state.user.name,
  sure_name: state.user.sure_name,
  avatar: state.user.avatar
});
export const ProfileContainer = connect(mapStateToProps)(Profile);
