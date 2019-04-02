//@flow
import {
  ADD_BUDGET_FAILURE,
  ADD_BUDGET_REQUEST,
  ADD_BUDGET_SUCCESS,
  ADD_PAYDAY_FAILURE,
  ADD_PAYDAY_SUCCESS,
  ADD_PAYDAY_REQUEST,
  GET_PAYDAY_FAILURE,
  GET_PAYDAY_REQUEST,
  GET_PAYDAY_SUCCESS,
  GET_ALL_COSTS_FAILURE,
  GET_ALL_COSTS_SUCCESS,
  GET_ALL_COSTS_REQUEST
} from "../constants";
import { msToDays } from "../components/Calendar/calendarHelper";

type UserState = {
  vk_id: number,
  avatar: string,
  name: string,
  sure_name: string,
  history?: Array<any>,

  pay_day: ?number,
  daysToPayday: ?number,
  calc?: any
};

export const initialState: UserState = {
  vk_id: 123456,
  avatar: "",
  name: "Pavel",
  sure_name: "Durov",
  history: [],
  pay_day: undefined,
  daysToPayday: undefined,
  calc: {
    budget: undefined,
    isFetching: false,
    error: false,
    error_message: undefined,
    common: {
      maxToday: {
        value: undefined,
        temp: undefined
      }
    },
    fun: {
      maxToday: {
        value: undefined,
        temp: undefined
      }
    },
    invest: {
      maxToday: {
        value: undefined,
        temp: undefined
      }
    }
  }
};

export function user(state: UserState = initialState, action: Object) {
  switch (action.type) {
    case ADD_BUDGET_REQUEST:
      return {
        ...state,
        calc: {
          ...state.calc,
          isFetching: action.payload.isFetching
        }
      };

    case ADD_BUDGET_SUCCESS:
      return {
        ...state,
        calc: {
          ...state.calc,
          budget: action.payload.budget,
          isFetching: action.payload.isFetching
        }
      };

    case ADD_BUDGET_FAILURE:
      return {
        ...state,
        calc: { ...state.calc, isFetching: false, error: true }
      };

    // case ADD_PAYDAY_REQUEST:
    // case GET_PAYDAY_REQUEST:
    //   return {
    //     ...state,
    //     pay_day: {
    //       ...state.pay_day,
    //       isFetching: action.payload.isFetching
    //     }
    //   };
    // case ADD_PAYDAY_SUCCESS:
    // case GET_PAYDAY_SUCCESS:
    //   return {
    //     ...state,
    //     pay_day: {
    //       ...state.pay_day,
    //       isFetching: action.payload.isFetching,
    //       pay_day: action.payload.payday
    //     },
    //     daysToPayday: msToDays(Date.parse(action.payload.payday) - Date.now())
    //   };
    // case ADD_PAYDAY_FAILURE:
    // case GET_PAYDAY_FAILURE:
    //   return { ...state, pay_day: action.payload };

    case GET_ALL_COSTS_REQUEST:
      return {
        ...state,
        calc: {
          ...state.calc,
          isFetching: true,
          error: false,
          error_message: undefined
        }
      };
    case GET_ALL_COSTS_FAILURE:
      return {
        ...state,
        calc: {
          ...state.calc,
          isFetching: false,
          error: true,
          error_message: action.error.message
        }
      };
    case GET_ALL_COSTS_SUCCESS:
      return {
        ...state,

        calc: {
          ...state.calc,
          budget: action.payload.costs.budget,
          isFetching: false,
          error: false,
          error_message: undefined,
          common: {
            ...state.calc.common,
            maxToday: {
              ...state.calc.common.maxToday,
              value: action.payload.costs.common.maxToday,
              temp: action.payload.costs.common.temp
            }
          },
          fun: {
            ...state.calc.fun,
            maxToday: {
              ...state.calc.fun.maxToday,
              value: action.payload.costs.fun.maxToday,
              temp: action.payload.costs.fun.temp
            }
          },
          invest: {
            ...state.calc.invest,
            maxToday: {
              ...state.calc.invest.maxToday,
              value: action.payload.costs.invest.maxToday,
              temp: action.payload.costs.invest.temp
            }
          }
        }
      };

    default:
      return state;
  }
}
