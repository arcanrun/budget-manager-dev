import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Entrance } from "../components/index";

export const EntranceContainer = withRouter(connect()(Entrance));
