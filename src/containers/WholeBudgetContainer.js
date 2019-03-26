//@flow
import React from "react";
import { connect } from "react-redux";

import { WholeBudget } from "../components";
import { toggleModal } from "../actions";

const mapStateToProps = state => ({
  wholeBudget: state.user.budget
});

export const WholeBudgetContainer = connect(
  mapStateToProps,
  { onClick: toggleModal }
)(WholeBudget);
