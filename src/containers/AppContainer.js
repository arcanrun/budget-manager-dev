import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import App from "../App";

const mapStateToProps = state => ({
  vk_id: state.user.vk_id
});
export const AppContainer = withRouter(connect(mapStateToProps)(App));
