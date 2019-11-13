//@flow
import {
  STATISTICS_REQUEST,
  STATISTICS_SUCCESS,
  STATISTICS_FAILURE
} from "../constants";
import { API } from "../API";

const requestStatistics = () => ({
  type: STATISTICS_REQUEST,
  payload: {
    isFetching: true
  }
});
export const successStatistics = (payload: Object) => ({
  type: STATISTICS_SUCCESS,
  payload: {
    payload,
    isFetching: false
  }
});
export const failuretStatistics = (message: string) => ({
  type: STATISTICS_FAILURE,
  error: {
    isFetching: false,
    error: true,
    message
  }
});

export const getStatistics = (params: string) => {
  return (dispatch: Function) => {
    dispatch(requestStatistics());
    fetch(API.GET_STATISTICS, {
      method: "POST",
      body: JSON.stringify({
        params
      })
    })
      .then(res => res.json())
      .then(res => {
        dispatch(successStatistics(res.PAYLOAD));
        return res;
      })
      .catch(err => dispatch(failuretStatistics(err)));
  };
};
