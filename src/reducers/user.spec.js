import deepcopy from "deepcopy";

import { user, initialState } from "./user";
import { successPayDay, successGetPayDay } from "../actions/paydayActions";
import {
  successGetBudget,
  successAddWholeBudget
} from "../actions/budgetActions";

describe("REDUCERS TESTING", () => {
  it("should return initial state", () => {
    const initialStateForTesting = deepcopy(initialState);

    expect(user(undefined, {})).toEqual(initialState);
  });

  it("should return state with budget", () => {
    const initialStateForTesting = deepcopy(initialState);

    const actionBudget = successAddWholeBudget(15000);
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

  it("should retrun state with budget  after load Manager component", () => {
    const initialStateForTesting = deepcopy(initialState);

    initialStateForTesting.wholeBudget.budget = 15000;
    initialStateForTesting.wholeBudget.isFetching = false;
    const action = successGetBudget(15000);

    expect(user(initialState, action)).toEqual(initialStateForTesting);
  });
  it("should retrun state with payday after load Manager component", () => {
    const initialStateForTesting = deepcopy(initialState);
    const enteredDate = "15.02.2019";
    const action = successGetPayDay(enteredDate);
    initialStateForTesting.pay_day.isFetching = false;
    initialStateForTesting.pay_day.pay_day = enteredDate;

    expect(user(initialState, action)).toEqual(initialStateForTesting);
  });
});
