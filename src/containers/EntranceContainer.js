//@flow

import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as connectVK from "@vkontakte/vkui-connect-promise";

import {Entrance} from "../components/index";
import {signUp, addWholeBudget, sendEnterData} from "../actions";

const mapStateToProps = (state: Object) => ({
    vk_id: state.user.vk_id,
    isFetching: state.user.isFetching_signup,
    error: state.user.error_signup,
    params: state.user.params,
    isVkTheme: state.user.is_vk_theme,
    isCostomDarkTheme: state.user.is_costom_dark_theme,
    themeVkClient: state.user.themeVkClient,
    budget: state.user.budget,
    payDay: state.user.calc.pay_day
});

const EntranceContainer = withRouter(
    connect(mapStateToProps, {signUp, addWholeBudget, sendEnterData})(Entrance)
);
export default EntranceContainer;
