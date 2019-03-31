import deepcopy from "deepcopy";

import { user, initialState } from "./user";
import { successPayDay, successGetPayDay } from "../actions/paydayActions";
import { successGetBudget } from "../actions/getBudgetActions";
import { successAddWholeBudget } from "../actions/addBudgetActions";
import { caclcToDayCOMMON } from "../actions/calcActions";

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
    initialStateForTesting.calc["50"] = 7500;
    initialStateForTesting.calc["30"] = 4500;
    initialStateForTesting.calc["20"] = 3000;

    expect(user(initialState, actionBudget)).toEqual(initialStateForTesting);
  });

  it("should retrun state with payday date", () => {
    const initialStateForTesting = deepcopy(initialState);

    const enteredDate = "2019-08-15T09:00:00.000Z";
    const action = successPayDay(enteredDate);
    initialStateForTesting.pay_day.isFetching = false;
    initialStateForTesting.pay_day.pay_day = enteredDate;
    initialStateForTesting.daysToPayday = "137";
    expect(user(initialState, action)).toEqual(initialStateForTesting);
  });

  it("should retrun state with budget  after load Manager component", () => {
    const initialStateForTesting = deepcopy(initialState);

    initialStateForTesting.wholeBudget.budget = 15000;
    initialStateForTesting.wholeBudget.isFetching = false;
    const action = successGetBudget(15000);
    initialStateForTesting.calc["50"] = 7500;
    initialStateForTesting.calc["30"] = 4500;
    initialStateForTesting.calc["20"] = 3000;

    expect(user(initialState, action)).toEqual(initialStateForTesting);
  });
  it("should retrun state with payday after load Manager component", () => {
    const initialStateForTesting = deepcopy(initialState);
    const enteredDate = "2019-08-15T09:00:00.000Z";
    const action = successGetPayDay(enteredDate);
    initialStateForTesting.pay_day.isFetching = false;
    initialStateForTesting.pay_day.pay_day = enteredDate;
    initialStateForTesting.daysToPayday = "137";

    expect(user(initialState, action)).toEqual(initialStateForTesting);
  });
  it("should retrun state with common costs for today", () => {
    const initialStateForTesting = deepcopy(initialState);
    const action = caclcToDayCOMMON(1500);
    initialStateForTesting.calc.M50.temp = 1500;
    initialStateForTesting.calc.M50.value = 1500;

    expect(user(initialState, action)).toEqual(initialStateForTesting);
  });
});
