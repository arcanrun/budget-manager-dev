//@flow
import {
  ADD_BUDGET_REQUEST,
  ADD_BUDGET_SUCCESS,
  ADD_BUDGET_FAILURE
} from "../constants";
import { API } from "../API";

const requestAddWholeBudget = () => ({
  type: ADD_BUDGET_REQUEST,
  payload: {
    isFetching: true
  }
});
export const successAddWholeBudget = (payload: Object) => ({
  type: ADD_BUDGET_SUCCESS,
  payload: {
    payload,
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
  params: string
) => {
  return (dispatch: Function) => {
    dispatch(requestAddWholeBudget());
    fetch(API.ADD_BUDGET, {
      method: "POST",
      body: JSON.stringify({
        params: window.vkSign,
        budget,
        operation
      })
    })
      .then(res => res.json())
      .then(res => {
        dispatch(successAddWholeBudget(res.PAYLOAD));
        return res;
      })
      .catch(err => dispatch(failuretAddWholeBudget(err)));
  };
};
