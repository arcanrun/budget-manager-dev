//@flow
import {
  STATISTICS_REQUEST,
  STATISTICS_SUCCESS,
  STATISTICS_FAILURE
} from "../constants";
import { API } from "../API";

const requestStatistics = (vk_id: number) => ({
  type: STATISTICS_REQUEST,
  payload: {
    isFetching: true,
    vk_id
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

export const getStatistics = (vk_id: number) => {
  return (dispatch: Function) => {
    dispatch(requestStatistics(vk_id));
    fetch(API.GET_STATISTICS, {
      method: "POST",
      body: JSON.stringify({
        vk_id
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log("[getStatistics] dispatcner: ", res);
        dispatch(successStatistics(res.PAYLOAD));
        return res;
      })
      .catch(err => dispatch(failuretStatistics(err)));
  };
};
