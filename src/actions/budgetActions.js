//@flow
import {
  ADD_BUDGET_REQUEST,
  ADD_BUDGET_SUCCESS,
  ADD_BUDGET_FAILURE,
  GET_BUDGET_FAILURE,
  GET_BUDGET_SUCCESS,
  GET_BUDGET_REQUEST
} from "../constants";
import { API } from "../API";

const requestAddWholeBudget = () => ({
  type: ADD_BUDGET_REQUEST,
  payload: {
    isFetching: true
  }
});
const successAddWholeBudget = budget => ({
  type: ADD_BUDGET_SUCCESS,

  payload: {
    budget,
    isFetching: false
  }
});
const failuretAddWholeBudget = message => ({
  type: ADD_BUDGET_FAILURE,
  error: {
    isFetching: false,
    error: true,
    message
  }
});

export const addWholeBudget = (budget: number) => {
  return (dispatch: any) => {
    dispatch(requestAddWholeBudget());
    fetch(API.ADD_BUDGET, {
      method: "POST",
      body: JSON.stringify({ vk_id: "123456", budget })
    })
      .then(res => res.json())
      .then(res => {
        // setTimeout(() => dispatch(successAddWholeBudget(res.RESPONSE)), 5000);
        dispatch(successAddWholeBudget(res.PAYLOAD));
        return res;
      })
      .catch(err => dispatch(failuretAddWholeBudget(err)));
  };
};

const getBudgetRequest = () => ({
  type: GET_BUDGET_REQUEST,
  payload: {
    isFetching: true
  }
});
const successGetBudget = budget => ({
  type: GET_BUDGET_SUCCESS,

  payload: {
    budget,
    isFetching: false
  }
});
const failuretGetBudget = message => ({
  type: GET_BUDGET_FAILURE,
  error: {
    isFetching: false,
    error: true,
    message
  }
});

export const getWholeBudget = () => {
  return (dispatch: any) => {
    dispatch(getBudgetRequest());
    fetch(API.ADD_BUDGET, {
      method: "POST",
      body: JSON.stringify({ vk_id: "123456" })
    })
      .then(res => res.json())
      .then(res => {
        !res.STATUS || dispatch(successGetBudget(res.RESPONSE));
        return res;
      })
      .catch(err => dispatch(failuretGetBudget(err)));
  };
};
