//@flow
import { CALC_TODAY_COMMON, CALC_TODAY_FUN } from "../constants/costsTypes";

export const calcToDayCosts = (
  money: string,
  vk_id: string,
  type: string,
  operation: string,
  budget: number
) => {
  return (dispatch: any) => {
    dispatch({
      type: "CALC_TODAY_COSTS_REQUEST"
    });
    fetch("http://127.0.0.1:8000/temp-today-cost/", {
      method: "POST",
      body: JSON.stringify({
        vk_id,
        money,
        type,
        operation,
        budget
      })
    })
      .then(res => res.json)
      .then(res => {
        console.log("", res);
        dispatch({
          type: "CALC_TODAY_COSTS_SUCCESS",
          payload: res.temp
        });
        return res;
      })
      .catch(err => {
        console.log(Error(err));
        dispatch({
          type: "CALC_TODAY_COSTS_ERROR"
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
