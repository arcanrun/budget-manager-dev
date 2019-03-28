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
export const successAddWholeBudget = (budget: number) => ({
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
  return (dispatch: Function) => {
    dispatch(requestAddWholeBudget());
    fetch(API.ADD_BUDGET, {
      method: "POST",
      body: JSON.stringify({ vk_id: "123456", budget })
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

const getBudgetRequest = () => ({
  type: GET_BUDGET_REQUEST,
  payload: {
    isFetching: true
  }
});
export const successGetBudget = (budget: ?number) => ({
  type: GET_BUDGET_SUCCESS,
  payload: {
    budget,
    isFetching: false
  }
});
const failuretGetBudget = (message: string) => ({
  type: GET_BUDGET_FAILURE,
  error: {
    isFetching: false,
    error: true,
    message
  }
});

export const getWholeBudget = () => {
  return (dispatch: Function) => {
    dispatch(getBudgetRequest());
    fetch(API.GET_BUDGET, {
      method: "POST",
      body: JSON.stringify({ vk_id: "123456" })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        res.RESPONSE
          ? dispatch(successGetBudget(res.PAYLOAD))
          : dispatch(successGetBudget(undefined));
        return res;
      })
      .catch(err => dispatch(failuretGetBudget(err)));
  };
};
