//@flow
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

export const logIn = (vk_id: number) => {
  return (dispatch: Function) => {
    dispatch(requestLogIn());
    dispatch(successLogIn(vk_id));

    // fetch("wwww.google.com", {
    //   method: "method",
    //   body: JSON.stringify({
    //     vk_id // FROM VK APPS API
    //   })
    // })
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log("[getAllcosts] dispatcner: ", res);
    //     dispatch(successLogIn(res.PAYLOAD));
    //     return res;
    //   })
    // .catch(err => dispatch(failureLogIn(err)));
  };
};
