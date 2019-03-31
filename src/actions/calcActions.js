//@flow
import { CALC_TODAY_COMMON, CALC_TODAY_FUN } from "../constants/calcTypes";

export const caclcToDayCOMMON = (money: number) => ({
  type: CALC_TODAY_COMMON,
  payload: {
    money
  }
});

export const plusToDayCOMMON = (money: string) => ({
  type: "PLUS_TODAY_COMMON",
  payload: {
    money
  }
});

export const minusToDayCOMMON = (
  money: string,
  vk_id: string,
  type: string,
  operation: string
) => {
  return (dispatch: any) => {
    dispatch({
      type: "CALC_TODAY_COMMON_REQUEST"
    });
    fetch("http://127.0.0.1:8000/max-cost-to-day-calc/", {
      method: "POST",
      body: JSON.stringify({
        vk_id,
        money,
        type,
        operation
      })
    })
      .then(res => res.json)
      .then(res => {
        console.log(res);
        dispatch({
          type: "CALC_TODAY_COMMON_SUCCESS",
          payload: res.temp
        });
        return res;
      })
      .catch(err => {
        console.log(Error(err));
        dispatch({
          type: "CALC_TODAY_COMMON_ERROR"
        });
      });
  };
};

export const caclcToDayFUN = (money: string) => ({
  type: CALC_TODAY_FUN,
  payload: {
    money
  }
});
