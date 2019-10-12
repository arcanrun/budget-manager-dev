//@flow
import {
  GET_HISTORY_FAILURE,
  GET_HISTORY_REQUEST,
  GET_HISTORY_SUCCESS
} from "../constants";
import { API } from "../API";

const requestGetHistory = () => ({
  type: GET_HISTORY_REQUEST,
  payload: {
    isFetching: true
  }
});
export const successGetHistory = (payload: Object) => ({
  type: GET_HISTORY_SUCCESS,
  payload: {
    payload,
    isFetching: false
  }
});
export const failuretGetAllHistroy = (message: string) => ({
  type: GET_HISTORY_FAILURE,
  error: {
    isFetching: false,
    error: true,
    message
  }
});

export const getHistory = (vk_id: number) => {
  return (dispatch: Function) => {
    dispatch(requestGetHistory());
    fetch(API.GET_HISTORY, {
      method: "POST",
      body: JSON.stringify({
        params: window.location.search
      })
    })
      .then(res => res.json())
      .then(res => {
        dispatch(successGetHistory(res.PAYLOAD));
        return res;
      })
      .catch(err => dispatch(failuretGetAllHistroy(err)));
  };
};
