import deepcopy from "deepcopy";

import { user, initialState } from "./user";
import { successPayDay } from "../actions/paydayActions";

describe("REDUCERS TESTING", () => {
  it("should return initial state", () => {
    const initialStateForTesting = deepcopy(initialState);

    expect(user(undefined, {})).toEqual(initialState);
  });

  it("should return state with budget", () => {
    const initialStateForTesting = deepcopy(initialState);

    const actionBudget = {
      type: "ADD_BUDGET_SUCCESS",
      payload: {
        budget: 15000,
        isFetching: false
      }
    };
    initialStateForTesting.wholeBudget.budget = 15000;
    initialStateForTesting.wholeBudget.isFetching = false;

    expect(user(initialState, actionBudget)).toEqual(initialStateForTesting);
  });

  it("should retrun state with payday date", () => {
    const initialStateForTesting = deepcopy(initialState);

    const enteredDate = "15.02.2019";
    const action = successPayDay(enteredDate);
    initialStateForTesting.pay_day.isFetching = false;
    initialStateForTesting.pay_day.pay_day = enteredDate;
    expect(user(initialState, action)).toEqual(initialStateForTesting);
  });
});
