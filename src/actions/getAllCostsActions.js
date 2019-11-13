//@flow
import {
  GET_ALL_COSTS_FAILURE,
  GET_ALL_COSTS_REQUEST,
  GET_ALL_COSTS_SUCCESS
} from "../constants";
import { API } from "../API";

const requestGetAllCosts = () => ({
  type: GET_ALL_COSTS_REQUEST,
  payload: {
    isFetching: true
  }
});
export const successGetAllCosts = (
  payload: Object,
  toDay: string,
  toDayFormated: string
) => ({
  type: GET_ALL_COSTS_SUCCESS,
  payload: {
    payload,
    toDay,
    toDayFormated,
    isFetching: false
  }
});
export const failuretGetAllCosts = (message: string) => ({
  type: GET_ALL_COSTS_FAILURE,
  error: {
    isFetching: false,
    error: true,
    message
  }
});

export const getAllCosts = (
  daysToPayday: number,
  toDay: string,
  toDayFormated: string,
  params: string
) => {
  return (dispatch: Function) => {
    dispatch(requestGetAllCosts());
    fetch(API.GET_ALL_COSTS, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        params,
        toDay
      }),

      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded"
        "X-Content-Type-Options": "nosniff"
      }
    })
      .then(res => res.json())
      .then(res => {
        dispatch(successGetAllCosts(res.PAYLOAD, toDay, toDayFormated));
        return res;
      })
      .catch(err => dispatch(failuretGetAllCosts(err)));
  };
};
