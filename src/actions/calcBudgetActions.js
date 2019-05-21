//@flow
import {
  CALC_BUDGET_REQUEST,
  CALC_BUDGET_SUCCESS,
  CALC_BUDGET_FAILURE
} from "../constants";
import { API } from "../API";

const calcBudgetRequest = () => ({
  type: CALC_BUDGET_REQUEST,
  payload: {
    isFetching: true
  }
});

const calcBudgetSuccess = (payload: Object) => ({
  type: CALC_BUDGET_SUCCESS,
  payload: {
    payload,
    isFetching: false
  }
});

export const calcBudgetFailure = (message: string) => ({
  type: CALC_BUDGET_FAILURE,
  error: {
    isFetching: false,
    error: true,
    message
  }
});

export const calcBudget = (
  value: number,
  vk_id: string,
  type: string,
  operation: string,
  date_now: string
) => {
  return (dispatch: any) => {
    dispatch(calcBudgetRequest());
    fetch(API.CALC_BUDGET, {
      method: "POST",
      body: JSON.stringify({
        vk_id,
        value,
        type,
        operation,
        date_now
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log("[calcBudget - action]", res);
        dispatch(calcBudgetSuccess(res.PAYLOAD));
        return res;
      })
      .catch(err => {
        console.log(Error(err));
        dispatch(calcBudgetFailure(err));
      });
  };
};
