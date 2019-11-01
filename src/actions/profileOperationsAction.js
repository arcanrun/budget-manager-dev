//@flow
import {
  PROFILE_OPERATION_REQUEST,
  PROFILE_OPERATION_SUCCESS,
  PROFILE_OPERATION_FAILURE
} from "../constants";
import { API } from "../API";

const requestProfileOperation = operationType => ({
  type: PROFILE_OPERATION_REQUEST,
  payload: {
    isFetching: true,
    operationType
  }
});
export const successProfileOperation = (payload: Object) => ({
  type: PROFILE_OPERATION_SUCCESS,
  payload: {
    payload,
    isFetching: false
  }
});
export const failuretProfileOperation = (message: string) => ({
  type: PROFILE_OPERATION_FAILURE,
  error: {
    isFetching: false,
    error: true,
    message
  }
});

export const makeProfileOperation = (operationType: string) => {
  return (dispatch: Function) => {
    dispatch(requestProfileOperation(operationType));
    fetch(API.PROFILE_MANAGE, {
      method: "POST",
      body: JSON.stringify({
        params: window.location.search,
        operationType
      })
    })
      .then(res => res.json())
      .then(res => {
        dispatch(successProfileOperation(res));
        return res;
      })
      .catch(err => dispatch(failuretProfileOperation(err)));
  };
};
