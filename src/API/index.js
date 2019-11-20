// const ENDPOINT = "https://budget-manger-dev.herokuapp.com/";
const ENDPOINT = "http://127.0.0.1:8000/";

export const API = {
  ADD_BUDGET: `${ENDPOINT}add-or-change-budget/`,
  ADD_PAYDAY: `${ENDPOINT}add-payday/`,
  CALC_BUDGET: `${ENDPOINT}calc-budget/`,
  GET_ALL_COSTS: `${ENDPOINT}manager-page/`,
  TEMP_TODAY_COSTS: `${ENDPOINT}temp-today-cost/`,
  GET_HISTORY: `${ENDPOINT}history-page/`,
  PROFILE_MANAGE: `${ENDPOINT}profile-manage/`,
  GET_STATISTICS: `${ENDPOINT}profile_page/`,
  SIGN_UP: `${ENDPOINT}sign-up/`,
  LOG_IN: `${ENDPOINT}log-in/`,
  CHANGE_TUTROIAL_STATE: `${ENDPOINT}tutorial-state/`,
  GET_SHORT_HISTORY: `${ENDPOINT}history-short/`,
  TOGGLE_VK_CLIENT_THEME: `${ENDPOINT}vk_client_theme/`
};
