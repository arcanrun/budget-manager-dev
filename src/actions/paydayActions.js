//@flow
import {
  ADD_PAYDAY_REQUEST,
  ADD_PAYDAY_SUCCESS,
  ADD_PAYDAY_FAILURE,
  GET_PAYDAY_REQUEST,
  GET_PAYDAY_FAILURE,
  GET_PAYDAY_SUCCESS
} from "../constants";
import { API } from "../API";

const requestPayDay = () => ({
  type: ADD_PAYDAY_REQUEST,
  payload: {
    isFetching: true
  }
});
export const successPayDay = (payload: Object) => ({
  type: ADD_PAYDAY_SUCCESS,
  payload: {
    payload,
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

export const addPayDay = (toDay: string, payday: string, params: string) => {
  return (dispatch: any) => {
    dispatch(requestPayDay());
    fetch(API.ADD_PAYDAY, {
      method: "POST",
      body: JSON.stringify({
        toDay,
        params: window.vkSign,
        payday
      })
    })
      .then(res => res.json())
      .then(res => {
        // setTimeout(() => dispatch(successAddWholeBudget(res.RESPONSE)), 5000);
        dispatch(successPayDay(res.PAYLOAD));
        return res;
      })
      .catch(err => dispatch(failurePayDay(err)));
  };
};

const requestGetPayDay = () => ({
  type: GET_PAYDAY_REQUEST,
  payload: {
    isFetching: true
  }
});
export const successGetPayDay = (payday: ?string) => ({
  type: GET_PAYDAY_SUCCESS,
  payload: {
    payday,
    isFetching: false
  }
});
const failureGetPayDay = message => ({
  type: GET_PAYDAY_FAILURE,
  error: {
    isFetching: false,
    error: true,
    message
  }
});

export const getPayDay = (payday: string) => {
  return (dispatch: any) => {
    dispatch(requestGetPayDay());
    fetch(API.GET_PAYDAY, {
      method: "POST",
      body: JSON.stringify({ vk_id: "123456", payday })
    })
      .then(res => res.json())
      .then(res => {
        res.RESPONSE
          ? dispatch(successGetPayDay(res.PAYLOAD))
          : dispatch(successGetPayDay(undefined));

        return res;
      })
      .catch(err => dispatch(failureGetPayDay(err)));
  };
};
