//@flow
import {
  ADD_BUDGET_FAILURE,
  ADD_BUDGET_REQUEST,
  ADD_BUDGET_SUCCESS,
  ADD_PAYDAY_FAILURE,
  ADD_PAYDAY_SUCCESS,
  ADD_PAYDAY_REQUEST,
  GET_ALL_COSTS_FAILURE,
  GET_ALL_COSTS_SUCCESS,
  GET_ALL_COSTS_REQUEST,
  CALC_TODAY_COSTS_REQUEST,
  CALC_TODAY_COSTS_SUCCESS,
  CALC_TODAY_COSTS_FAILURE,
  GET_HISTORY_FAILURE,
  GET_HISTORY_REQUEST,
  GET_HISTORY_SUCCESS
} from "../constants";

type UserState = {
  vk_id: number,
  avatar: string,
  name: string,
  sure_name: string,
  history: {
    isFetching: false,
    value: ?Array<any>,
    error: boolean,
    error_message: ?string
  },
  isFetching_pyaday: boolean, // temp solutions...
  calc: {
    common: {
      maxToday: {
        value: ?number,
        temp: ?number
      }
    },
    fun: {
      maxToday: {
        value: ?number,
        temp: ?number
      }
    },
    invest: {
      maxToday: {
        value: ?number,
        temp: ?number
      }
    }
  }
};

export const initialState: UserState = {
  vk_id: 123456,
  avatar: "",
  name: "Pavel",
  sure_name: "Durov",
  isFetching_pyaday: false,
  history: {
    value: [],
    isFetching: false,
    error: false,
    error_message: undefined
  },
  calc: {
    pay_day: undefined,
    daysToPayday: undefined,
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

    case ADD_BUDGET_FAILURE:
      return {
        ...state,
        calc: { ...state.calc, isFetching: false, error: true }
      };

    case ADD_PAYDAY_REQUEST:
      return {
        ...state,
        calc: {
          ...state.calc,
          isFetching: action.payload.isFetching
        }
      };

    case ADD_PAYDAY_FAILURE:
      return { ...state, calc: { ...state.calc, error: true } };

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
    case CALC_TODAY_COSTS_FAILURE:
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
    case ADD_PAYDAY_SUCCESS:
    case ADD_BUDGET_SUCCESS:
    case CALC_TODAY_COSTS_SUCCESS:
      return {
        ...state,

        calc: {
          ...state.calc,
          budget: action.payload.payload.budget,
          pay_day: action.payload.payload.pay_day,
          daysToPayday: action.payload.payload.days_to_payday,
          isFetching: false,
          error: false,
          error_message: undefined,
          common: {
            ...state.calc.common,
            maxToday: {
              ...state.calc.common.maxToday,
              value: action.payload.payload.common.maxToday,
              temp: action.payload.payload.common.temp
            }
          },
          fun: {
            ...state.calc.fun,
            maxToday: {
              ...state.calc.fun.maxToday,
              value: action.payload.payload.fun.maxToday,
              temp: action.payload.payload.fun.temp
            }
          },
          invest: {
            ...state.calc.invest,
            maxToday: {
              ...state.calc.invest.maxToday,
              value: action.payload.payload.invest.maxToday,
              temp: action.payload.payload.invest.temp
            }
          }
        }
      };
    case CALC_TODAY_COSTS_REQUEST:
      return { ...state, calc: { ...state.calc, isFetching: true } };
    case GET_HISTORY_REQUEST:
      return {
        ...state,
        history: { ...state.history, isFetching: true, error: false }
      };
    case GET_HISTORY_SUCCESS:
      return {
        ...state,
        history: {
          ...state.history,
          value: action.payload.payload,
          isFetching: false,
          error: false
        }
      };

    case GET_HISTORY_FAILURE:
      return {
        ...state,
        history: { ...state.history, isFetching: false, error: true }
      };
    default:
      return state;
  }
}
