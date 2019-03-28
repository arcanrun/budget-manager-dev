//@flow
import {
  ADD_PAYDAY_REQUEST,
  ADD_PAYDAY_SUCCESS,
  ADD_PAYDAY_FAILURE
} from "../constants";
import { API } from "../API";

const requestPayDay = () => ({
  type: ADD_PAYDAY_REQUEST,
  payload: {
    isFetching: true
  }
});
export const successPayDay = (payday: string) => ({
  type: ADD_PAYDAY_SUCCESS,
  payload: {
    payday,
    isFetching: false
  }
});
const failurePayDay = message => ({
  type: ADD_PAYDAY_FAILURE,
  error: {
    isFetching: false,
    error: true,
    message
  }
});

export const addPayDay = (payday: string) => {
  return (dispatch: any) => {
    dispatch(requestPayDay());
    fetch(API.ADD_PAYDAY, {
      method: "POST",
      body: JSON.stringify({ vk_id: "123456", payday })
    })
      .then(res => res.json())
      .then(res => {
        // setTimeout(() => dispatch(successAddWholeBudget(res.RESPONSE)), 5000);
        dispatch(successPayDay(res.RESPONSE));
        return res;
      })
      .catch(err => dispatch(failurePayDay(err)));
  };
};
