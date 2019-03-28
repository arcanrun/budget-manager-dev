//@flow
import {
  ADD_BUDGET_FAILURE,
  ADD_BUDGET_REQUEST,
  ADD_BUDGET_SUCCESS,
  ADD_PAYDAY_FAILURE,
  ADD_PAYDAY_SUCCESS,
  ADD_PAYDAY_REQUEST
} from "../constants";
type UserState = {
  vk_id: number,
  avatar: string,
  name: string,
  sure_name: string,
  history?: Array<any>,
  wholeBudget?: Object,
  pay_day?: Object,
  calc?: {
    "50"?: number,
    "30"?: number,
    "20"?: number,
    M50?: number,
    M30?: number
  }
};

export const initialState: UserState = {
  vk_id: 123456,
  avatar: "",
  name: "Pavel",
  sure_name: "Durov",
  history: [],
  wholeBudget: {
    budget: undefined,
    isFetching: false,
    error: false,
    error_message: undefined
  },
  pay_day: {
    pay_day: undefined,
    isFetching: false,
    error: false,
    error_message: undefined
  },
  calc: {
    "50": undefined,
    "30": undefined,
    "20": undefined,
    M50: undefined,
    M30: undefined
  }
};

export function user(state: UserState = initialState, action: Object) {
  switch (action.type) {
    case ADD_BUDGET_REQUEST:
      return {
        ...state,
        wholeBudget: {
          ...state.wholeBudget,
          isFetching: action.payload.isFetching
        }
      };

    case ADD_BUDGET_SUCCESS:
      return {
        ...state,
        wholeBudget: {
          ...state.wholeBudget,
          isFetching: action.payload.isFetching,
          budget: action.payload.budget
        }
      };

    case ADD_BUDGET_FAILURE:
      return { ...state, budget: action.payload };

    case ADD_PAYDAY_REQUEST:
      return {
        ...state,
        pay_day: {
          ...state.pay_day,
          isFetching: action.payload.isFetching
        }
      };
    case ADD_PAYDAY_SUCCESS:
      return {
        ...state,
        pay_day: {
          ...state.pay_day,
          isFetching: action.payload.isFetching,
          pay_day: action.payload.payday
        }
      };
    case ADD_PAYDAY_FAILURE:
      return { ...state, pay_day: action.payload };
    default:
      return state;
  }
}
