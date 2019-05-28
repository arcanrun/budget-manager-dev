const ENDPOINT = "http://127.0.0.1:8000/";
// const ENDPOINT = "https://afternoon-cove-62572.herokuapp.com/";

export const API = {
  ADD_BUDGET: `${ENDPOINT}add-budget/`,
  ADD_PAYDAY: `${ENDPOINT}add-payday/`,
  CALC_BUDGET: `${ENDPOINT}calc-budget/`,
  GET_ALL_COSTS: `${ENDPOINT}get-costs-all/`,
  TEMP_TODAY_COSTS: `${ENDPOINT}temp-today-cost/`,
  GET_HISTORY: `${ENDPOINT}get-history/`,
  PROFILE_MANAGE: `${ENDPOINT}profile-manage/`,
  GET_STATISTICS: `${ENDPOINT}get-statistics/`,
  SIGN_UP: `${ENDPOINT}sign-up/`,
  LOG_IN: `${ENDPOINT}log-in/`
};
