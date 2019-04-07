//@flow
import connect from "@vkontakte/vkui-connect-promise";

import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants";
import { API } from "../API";

const requestLogIn = () => ({
  type: LOGIN_REQUEST,
  payload: {
    isFetching: true
  }
});
export const successLogIn = (vk_id: Object) => ({
  type: LOGIN_SUCCESS,
  payload: {
    vk_id,
    isFetching: false
  }
});
export const failureLogIn = (message: string) => ({
  type: LOGIN_FAILURE,
  error: {
    isFetching: false,
    error: true,
    message
  }
});

export const logIn = () => {
  return (dispatch: Function) => {
    dispatch(requestLogIn());
    let vkRes = {
      errors: false,
      error_message:undefined,
      vk_id: undefined,
      name: undefined,
      sure_name: undefined,
      avatar: undefined,
      email: undefined
    }
    
    connect
      .send("VKWebAppInit", {})
      .then(data => console.log(data))
      .catch(error => console.log(error));






      connect.send('VKWebAppGetUserInfo', {}).then(res=>{
        console.log(res)
        vkRes.vk_id = res.data.id
        vkRes.name = res.data.first_name
        vkRes.sure_name = res.data.last_name
        vkRes.avatar = res.data.photo_200
        return res
      }).catch(err=>console.log(Error(err)))
      connect.send('VKWebAppGetEmail', {}).then(res=>{
        console.log(res)
      return res}).catch(err=>console.log(Error(err)))

   

    // fetch("wwww.google.com", {
    //   method: "method",
    //   body: JSON.stringify({})
    // })
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log("[getAllcosts] dispatcner: ", res);
    //     dispatch(successLogIn(res.PAYLOAD));
    //     return res;
    //   })
    //   .catch(err => dispatch(failureLogIn(err)));
  };
};
