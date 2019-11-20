//@flow
import {
  TOGGLE_CUSTOM_DARK_THEME_FAILED,
  TOGGLE_CUSTOM_DARK_THEME_REQUEST,
  TOGGLE_CUSTOM_DARK_THEME_SUCCESS
} from "../constants/index";

import { API } from "../API";
const toggleCustomDarkThemeRequest = () => ({
  type: TOGGLE_CUSTOM_DARK_THEME_REQUEST,
  payload: {
    error: false,
    isFetching: true
  }
});

const toggleCustomDarkThemeSuccess = res => ({
  type: TOGGLE_CUSTOM_DARK_THEME_SUCCESS,
  payload: res
});

const toggleCustomDarkThemeFailure = message => ({
  type: TOGGLE_CUSTOM_DARK_THEME_FAILED,
  error: true,
  payload: {
    message: message
  }
});

export const toggleCustomDarkTheme = (is_costom_dark_theme: boolean) => {
  return (dispatch: Function) => {
    dispatch(toggleCustomDarkThemeRequest());
    fetch(API.TOGGLE_CUSTOM_DARK_THEME, {
      method: "POST",
      body: JSON.stringify({
        is_costom_dark_theme,
        params: window.vkSign
      })
    })
      .then(res => res.json())
      .then(res => dispatch(toggleCustomDarkThemeSuccess(res.PAYLOAD)))
      .catch(err => dispatch(toggleCustomDarkThemeFailure(err)));
  };
};
