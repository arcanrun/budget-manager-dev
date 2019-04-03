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

  // it("should retrun state with payday date", () => {
  //   const initialStateForTesting = deepcopy(initialState);

  //   const enteredDate = "2019-08-15T09:00:00.000Z";
  //   const action = successPayDay(enteredDate);
  //   initialStateForTesting.pay_day.isFetching = false;
  //   initialStateForTesting.pay_day.pay_day = enteredDate;
  //   initialStateForTesting.daysToPayday = "137";
  //   expect(user(initialState, action)).toEqual(initialStateForTesting);
  // });

  // it("should retrun state with payday after load Manager component", () => {
  //   const initialStateForTesting = deepcopy(initialState);
  //   const enteredDate = "2019-08-15T09:00:00.000Z";
  //   const action = successGetPayDay(enteredDate);
  //   initialStateForTesting.pay_day.isFetching = false;
  //   initialStateForTesting.pay_day.pay_day = enteredDate;
  //   initialStateForTesting.daysToPayday = "137";

  //   expect(user(initialState, action)).toEqual(initialStateForTesting);
  // });
});
