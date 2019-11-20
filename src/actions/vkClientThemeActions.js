//@flow
import {
  TOGGLE_VK_CLIENT_SUCCESS,
  TOGGLE_VK_CLIENT_REQUEST,
  TOGGLE_VK_CLIENT_FAILED
} from "../constants/index";

import { API } from "../API";
const toggleVkThemeRequest = () => ({
  type: TOGGLE_VK_CLIENT_REQUEST,
  payload: {
    error: false,
    isFetching: true
  }
});

const toggleVkThemeSuccess = res => ({
  type: TOGGLE_VK_CLIENT_SUCCESS,
  payload: res
});

const toggleVkThemeFailure = message => ({
  type: TOGGLE_VK_CLIENT_FAILED,
  error: true,
  payload: {
    message: message
  }
});

export const toggleVkClientTheme = (is_vk_theme: boolean) => {
  return (dispatch: Function) => {
    dispatch(toggleVkThemeRequest());
    fetch(API.TOGGLE_VK_CLIENT_THEME, {
      method: "POST",
      body: JSON.stringify({
        is_vk_theme,
        params: window.vkSign
      })
    })
      .then(res => res.json())
      .then(res => dispatch(toggleVkThemeSuccess(res.PAYLOAD)))
      .catch(err => dispatch(toggleVkThemeFailure(err)));
  };
};
