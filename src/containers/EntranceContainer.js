//@lfow

import React from "react";
import { connect } from "react-redux";
import * as connectVK from "@vkontakte/vkui-connect-promise";

import { Entrance } from "../components/index";
import { signUp } from "../actions";

const mapStateToProps = (state: Object) => ({
  vk_id: state.user.vk_id,
  isFetching: state.user.isFetching_signup,
  error: state.user.error_signup,
  params: state.user.params
});

const EntranceContainer = connect(mapStateToProps, { signUp })(Entrance);

export default EntranceContainer;
