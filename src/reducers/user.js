//@flow
import {
  ADD_BUDGET_FAILURE,
  ADD_BUDGET_REQUEST,
  ADD_BUDGET_SUCCESS
} from "../constants";
type UserState = {
  vk_id: number,
  avatar: string,
  name: string,
  sure_name: string,
  history?: Array<any>,
  wholeBudget?: Object,
  pay_day?: string,
  calc?: {
    "50"?: number,
    "30"?: number,
    "20"?: number,
    M50?: number,
    M30?: number
  }
};

const initialState: UserState = {
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
  pay_day: undefined,
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
    default:
      return state;
  }
}
