//@flow
import {
  CALC_TODAY_COSTS_FAILURE,
  CALC_TODAY_COSTS_REQUEST,
  CALC_TODAY_COSTS_SUCCESS
} from "../constants/costsTypes";
import { API } from "../API";

const calcTempCostsRequest = () => ({
  type: CALC_TODAY_COSTS_REQUEST,
  payload: {
    isFetching: true
  }
});

const calcTempCostsSuccess = (payload: Object) => ({
  type: CALC_TODAY_COSTS_SUCCESS,
  payload: {
    payload,
    isFetching: false
  }
});

export const calcTempCostsFailure = (message: string) => ({
  type: CALC_TODAY_COSTS_FAILURE,
  error: {
    isFetching: false,
    error: true,
    message
  }
});

export const calcTempCosts = (
  value: string,
  vk_id: string,
  type: string,
  operation: string
) => {
  return (dispatch: any) => {
    dispatch(calcTempCostsRequest);
    fetch(API.TEMP_TODAY_COSTS, {
      method: "POST",
      body: JSON.stringify({
        vk_id,
        value,
        type,
        operation
      })
    })
      .then(res => res.json)
      .then(res => {
        console.log("", res);
        dispatch(calcTempCostsSuccess(res.PAYLOAD));
        return res;
      })
      .catch(err => {
        console.log(Error(err));
        dispatch(calcTempCostsFailure(err));
      });
  };
};
