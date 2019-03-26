//@flow
import React from "react";
import { connect } from "react-redux";

import { WholeBudget } from "../components";
import { userActions } from "../actions";

export const WholeBudgetContainer = connect(
  null,
  null
)(WholeBudget);
