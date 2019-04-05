//@lfow

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Entrance } from "../components/index";
import { logIn } from "../actions";

const mapStateToProps = (state: Object) => ({
  vk_id: state.user.vk_id
});

export const EntranceContainer = withRouter(
  connect(
    mapStateToProps,
    { logIn }
  )(Entrance)
);
