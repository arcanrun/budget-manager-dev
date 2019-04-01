//@flow
import {
  ADD_BUDGET_FAILURE,
  ADD_BUDGET_REQUEST,
  ADD_BUDGET_SUCCESS,
  ADD_PAYDAY_FAILURE,
  ADD_PAYDAY_SUCCESS,
  ADD_PAYDAY_REQUEST,
  GET_BUDGET_REQUEST,
  GET_BUDGET_SUCCESS,
  GET_BUDGET_FAILURE,
  GET_PAYDAY_FAILURE,
  GET_PAYDAY_REQUEST,
  GET_PAYDAY_SUCCESS
} from "../constants";
import { msToDays } from "../components/Calendar/calendarHelper";

type UserState = {
  vk_id: number,
  avatar: string,
  name: string,
  sure_name: string,
  history?: Array<any>,
  wholeBudget?: Object,
  pay_day?: Object,
  daysToPayday: ?number,
  calc?: Object
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
  daysToPayday: undefined,
 
};

export function user(state: UserState = initialState, action: Object) {
  switch (action.type) {
    case ADD_BUDGET_REQUEST:
    case GET_BUDGET_REQUEST:
      return {
        ...state,
        wholeBudget: {
          ...state.wholeBudget,
          isFetching: action.payload.isFetching
        }
      };

    case ADD_BUDGET_SUCCESS:
    case GET_BUDGET_SUCCESS:
      return {
        ...state,
        wholeBudget: {
          ...state.wholeBudget,
          isFetching: action.payload.isFetching,
          budget: action.payload.budget
        },
       
      };

    case ADD_BUDGET_FAILURE:
    case GET_BUDGET_FAILURE:
      return { ...state, budget: action.payload };

    case ADD_PAYDAY_REQUEST:
    case GET_PAYDAY_REQUEST:
      return {
        ...state,
        pay_day: {
          ...state.pay_day,
          isFetching: action.payload.isFetching
        }
      };
    case ADD_PAYDAY_SUCCESS:
    case GET_PAYDAY_SUCCESS:
      return {
        ...state,
        pay_day: {
          ...state.pay_day,
          isFetching: action.payload.isFetching,
          pay_day: action.payload.payday
        },
        daysToPayday: msToDays(Date.parse(action.payload.payday) - Date.now())
      };
    case ADD_PAYDAY_FAILURE:
    case GET_PAYDAY_FAILURE:
      return { ...state, pay_day: action.payload };

    
    default:
      return state;
  }
}
