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
  GET_HISTORY_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  PROFILE_OPERATION_FAILURE,
  PROFILE_OPERATION_REQUEST,
  PROFILE_OPERATION_SUCCESS,
  STATISTICS_FAILURE,
  STATISTICS_SUCCESS,
  STATISTICS_REQUEST
} from "../constants";

type UserState = {
  vk_id: ?number,
  avatar: ?string,
  name: ?string,
  sure_name: ?string,
  isFetching: boolean,
  error: boolean,
  error_message: boolean,
  history: {
    isFetching: false,
    value: ?Array<any>,
    error: boolean,
    error_message: ?string
  },
  statistics: {
    isFetching: boolean,
    error: boolean,
    error_message: ?string,
    costs: {
      total: ?number,
      common: ?number,
      fun: ?number,
      invest: ?number
    },
    income: {
      total: ?number,
      common: ?number,
      fun: ?number,
      invest: ?number
    }
  },
  isFetching_pyaday: boolean, // temp solutions...
  calc: {
    toDay: ?string,
    toDayFormated: ?string,
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
  vk_id: 2,
  avatar:
    "https://static.mk.ru/upload/entities/2018/06/07/articles/detailPicture/95/72/ce/d7/58bcc7d521cd08692d9364476a060077.jpg",
  name: "Pavel",
  sure_name: "Durov",
  isFetching_pyaday: false,
  isFetching: false,
  error: false,
  error_message: false,
  history: {
    value: [],
    isFetching: false,
    error: false,
    error_message: undefined
  },
  calc: {
    toDay: undefined,
    toDayFormated: undefined,
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
  },
  statistics: {
    isFetching: false,
    error: true,
    error_message: undefined,
    costs: {
      total: undefined,
      common: undefined,
      fun: undefined,
      invest: undefined
    },
    income: {
      total: undefined,
      common: undefined,
      fun: undefined,
      invest: undefined
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
      return {
        ...state,

        calc: {
          ...state.calc,
          toDay: action.payload.toDay,
          toDayFormated: action.payload.toDayFormated,
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
    case LOGIN_REQUEST:
    case PROFILE_OPERATION_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case LOGIN_FAILURE:
    case PROFILE_OPERATION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        error_message: action.payload.message
      };
    case LOGIN_SUCCESS:
      return { ...state, isFetching: false, vk_id: action.payload.vk_id };
    case PROFILE_OPERATION_SUCCESS:
      let res = "";
      if (action.payload.payload === "DELETE_USER_SUCCESS") {
        res = undefined;
      }
      return {
        ...state,
        isFetching: false,
        vk_id: res,
        name: res,
        sure_name: res,
        avatar: res
      };
    case STATISTICS_REQUEST:
      return {
        ...state,
        statistics: { ...state.statistics, isFetching: true, error: false }
      };
    case STATISTICS_FAILURE:
      return {
        ...state,
        statistics: {
          ...state.statistics,
          isFetching: false,
          error: true,
          error_message: action.payload
        }
      };
    case STATISTICS_SUCCESS:
      return {
        ...state,
        statistics: {
          ...state.statistics,
          isFetching: false,
          error_message: false,
          error: false,
          costs: {
            ...state.statistics.costs,
            total: action.payload.payload.costs.total,
            common: action.payload.payload.costs.common,
            fun: action.payload.payload.costs.fun,
            invest: action.payload.payload.costs.invest
          },
          income: {
            ...state.statistics.income,
            total: action.payload.payload.income.total,
            common: action.payload.payload.income.common,
            fun: action.payload.payload.income.fun,
            invest: action.payload.payload.income.invest
          }
        }
      };

    default:
      return state;
  }
}
