//@flow
import connect from "@vkontakte/vkui-connect-promise";

import {
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_STOP_GUIDE
} from "../constants";
import { API } from "../API";

export const stopGuide = () => ({
  type: SIGNUP_STOP_GUIDE
});

const requestSignUp = () => ({
  type: SIGNUP_REQUEST,
  payload: {
    isFetching: true
  }
});
export const successSignUp = (res: Object, vkRes: Object) => ({
  type: SIGNUP_SUCCESS,
  payload: {
    ...res,
    name: vkRes.name,
    sure_name: vkRes.sure_name,
    avatar: vkRes.avatar,
    timezone: vkRes.timezone
  }
});
export const failureSignUp = (res: Object) => ({
  type: SIGNUP_FAILURE,
  error: {
    isFetching: false,
    error: true,
    message: res.error_message
  }
});

export const signUp = () => {
  return (dispatch: Function) => {
    dispatch(requestSignUp());
    // let toDay = new Date();
    // toDay = toDay.toLocaleDateString();
    let vkRes = {
      name: undefined,
      sure_name: undefined,
      avatar: undefined,
      timezone: undefined
    };
    connect.send("VKWebAppInit", {});

    connect
      .send("VKWebAppGetUserInfo", {})
      .then(res => {
        vkRes.avatar = res.data.photo_200;
        vkRes.name = res.data.first_name;
        vkRes.sure_name = res.data.last_name;
        vkRes.timezone = res.data.timezone;
        fetch(API.SIGN_UP, {
          method: "POST",
          body: JSON.stringify({ params: window.location.search })
        })
          .then(res => res.json())
          .then(res => {
            dispatch(successSignUp(res.PAYLOAD, vkRes));
            return res;
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        vkRes.errors = true;
        vkRes.error_message = err;
        dispatch(failureSignUp(vkRes));
      });
  };
};

// export const signUp = () => {
//   return dispatch =>
//     dispatch(
//       successSignUp({
//         vk_id: 65122543
//       })
//     );
// };
