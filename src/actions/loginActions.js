//@flow
import connect from "@vkontakte/vkui-connect-promise";

import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants";
import { API } from "../API";

const requestLogIn = () => ({
  type: LOGIN_REQUEST,
  payload: {
    isFetching: true,
    params: window.location.search
  }
});
export const successLogIn = (res: Object, vkRes: Object) => ({
  type: LOGIN_SUCCESS,
  payload: {
    ...res,
    name: vkRes.name,
    sure_name: vkRes.sure_name,
    avatar: vkRes.avatar,
    params: vkRes.params
  }
});
export const failureLogIn = (msg: string) => ({
  type: LOGIN_FAILURE,
  error: {
    isFetching: false,
    error: true,
    message: msg
  }
});

export const logIn = (params: string) => {
  return (dispatch: Function) => {
    dispatch(requestLogIn());
    let vkRes = {
      name: undefined,
      sure_name: undefined,
      avatar: undefined,
      timezone: undefined,
      params: undefined
    };

    connect.send("VKWebAppInit", {});

    connect
      .send("VKWebAppGetUserInfo", {})
      .then(res => {
        vkRes.avatar = res.data.photo_200;
        vkRes.name = res.data.first_name;
        vkRes.sure_name = res.data.last_name;
        vkRes.timezone = res.data.timezone;
        vkRes.params = window.location.search ? window.location.search : params;
        console.log("window...", window.location.search);
        console.log("params...", params);
        fetch(API.LOG_IN, {
          method: "POST",
          // mode: "cors",
          body: JSON.stringify({
            params: vkRes.params,
            timezone: vkRes.timezone
          }),
          headers: {
            "Content-Type": "application/json"
            // "Content-Type": "application/x-www-form-urlencoded"
            // "X-Content-Type-Options": "nosniff"
          }
        })
          .then(res => res.json())
          .then(res => {
            let response = res.RESPONSE;
            if (response === "LOGIN_ERROR") {
              dispatch(failureLogIn(response));
            } else {
              dispatch(successLogIn(res.PAYLOAD, vkRes));
            }

            return res;
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        vkRes.errors = true;
        vkRes.error_message = err;
        dispatch(failureLogIn(vkRes.error_message));
      });
    //   .catch(err => console.log(Error(err)));
    // connect
    //   .send("VKWebAppGetEmail", {})
    //   .then(res => {
    //     console.log(res);
    //     vkRes.email = res.data.email;
    //     vkRes.errors = false;
    //     vkRes.error_message = undefined;
    //     return res;
    //   })
    //   .catch(err => console.log(Error(err)));

    // !vkRes.errors
    //   ? dispatch(successLogIn(vkRes))
    //   : dispatch(failureLogIn(vkRes));
  };
};
