//@flow
import {
  ADD_BUDGET_REQUEST,
  ADD_BUDGET_SUCCESS,
  ADD_BUDGET_FAILURE
} from "../constants";
import { API } from "../API";

const requestLogin = () => ({
  type: ADD_BUDGET_REQUEST,
  payload: {
    isFetching: true
  }
});
export const successAddWholeBudget = (budget: number) => ({
  type: ADD_BUDGET_SUCCESS,
  payload: {
    budget,
    isFetching: false
  }
});
export const failuretAddWholeBudget = (message: string) => ({
  type: ADD_BUDGET_FAILURE,
  error: {
    isFetching: false,
    error: true,
    message
  }
});

export const addWholeBudget = (
  budget: number,
  operation: string,
  daysToPayday: number
) => {
  return (dispatch: Function) => {
    dispatch(requestAddWholeBudget());
    fetch(API.ADD_BUDGET, {
      method: "POST",
      body: JSON.stringify({ vk_id: "123456", budget, operation, daysToPayday })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        dispatch(successAddWholeBudget(res.PAYLOAD));
        return res;
      })
      .catch(err => dispatch(failuretAddWholeBudget(err)));
  };
};
