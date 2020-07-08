//@flow
import { API } from "../API/index";
import {
  SEND_ENTER_DATA_FAILED,
  SEND_ENTER_DATA_REQUEST,
  SEND_ENTER_DATA_SUCCESS
} from "../constants";

const sendEnterDataRequest = () => {
  return {
    type: SEND_ENTER_DATA_REQUEST,
    payload: {
      isFetching: true,
      error: false
    }
  };
};

const sendEnterDataFailed = (err: string) => {
  return {
    type: SEND_ENTER_DATA_FAILED,
    payload: {
      error: true,
      isFetching: false,
      error_message: err
    }
  };
};

const sendEnterDataSuccess = res => {
  return {
    type: SEND_ENTER_DATA_SUCCESS,
    payload: res.PAYLOAD,
    error: false,
    isFetching: false
  };
};

export const sendEnterData = (
  currency: string,
  budget: string,
  payday: string
) => {
  return (dispatch: Function) => {
    dispatch(sendEnterDataRequest());
    fetch(API.SEND_ENTER_DATA, {
      method: "POST",
      body: JSON.stringify({
        params: window.vkSign,
        currency,
        budget,
        payday
      })
    })
      .then(res => res.json())
      .then(res => dispatch(sendEnterDataSuccess(res)))
      .catch(err => sendEnterDataFailed(err));
  };
};
