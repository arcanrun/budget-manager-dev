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
export const successSignUp = (res: Object, avatar: strting) => ({
  type: SIGNUP_SUCCESS,
  payload: { ...res, avatar: avatar }
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
    let toDay = new Date();
    toDay = toDay.toLocaleDateString();
    let vkRes = {
      params: undefined,
      name: undefined,
      sure_name: undefined,
      toDay
    };
    let avatar = "";
    connect
      .send("VKWebAppInit", {})
      .then(data => console.log(data))
      .catch(error => console.log(error));

    connect
      .send("VKWebAppGetUserInfo", {})
      .then(res => {
        console.log(res);
        avatar = res.data.photo_200;
        vkRes.params = window.location.search;
        vkRes.name = res.data.first_name;
        vkRes.sure_name = res.data.last_name;
        fetch(API.SIGN_UP, {
          method: "POST",
          body: JSON.stringify(vkRes)
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            dispatch(successSignUp(res.PAYLOAD, avatar));
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
