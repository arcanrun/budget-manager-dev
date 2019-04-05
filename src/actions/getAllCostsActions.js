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
export const successGetAllCosts = (payload: Object) => ({
  type: GET_ALL_COSTS_SUCCESS,
  payload: {
    payload,
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
  vk_id: number,
  daysToPayday: number,
  budget: string
) => {
  return (dispatch: Function) => {
    dispatch(requestGetAllCosts());
    fetch(API.GET_ALL_COSTS, {
      method: "POST",
      body: JSON.stringify({
        vk_id,
        daysToPayday,
        budget
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log("[getAllcosts] dispatcner: ", res);
        dispatch(successGetAllCosts(res.PAYLOAD));
        return res;
      })
      .catch(err => dispatch(failuretGetAllCosts(err)));
  };
};