//@flow
import connect from "@vkontakte/vkui-connect-promise";

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

const toggleVkThemeSuccess = (res: Object, themeVkClient: string) => {
  if (res.is_vk_theme && themeVkClient === "client_dark") {
    connect.send("VKWebAppSetViewSettings", {
      status_bar_style: "light",
      action_bar_color: "#2C2D2F"
    });
  }
  if (res.is_vk_theme && themeVkClient === "client_light") {
    connect.send("VKWebAppSetViewSettings", {
      status_bar_style: "light",
      action_bar_color: "#110261"
    });
  }
  if (!res.is_vk_theme) {
    connect.send("VKWebAppSetViewSettings", {
      status_bar_style: "light",
      action_bar_color: "#110261"
    });
  }

  return {
    type: TOGGLE_VK_CLIENT_SUCCESS,
    payload: res
  };
};

const toggleVkThemeFailure = message => ({
  type: TOGGLE_VK_CLIENT_FAILED,
  error: true,
  payload: {
    message: message
  }
});

export const toggleVkClientTheme = (
  is_vk_theme: boolean,
  themeVkClient: string
) => {
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
      .then(res => dispatch(toggleVkThemeSuccess(res.PAYLOAD, themeVkClient)))
      .catch(err => dispatch(toggleVkThemeFailure(err)));
  };
};
