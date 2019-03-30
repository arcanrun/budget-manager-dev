//@flow
import { CALC_TODAY_COMMON, CALC_TODAY_FUN } from "../constants/calcTypes";

export const caclcToDayCOMMON = (money: string) => ({
  type: CALC_TODAY_COMMON,
  payload: {
    money
  }
});
export const caclcToDayFUN = (money: string) => ({
  type: CALC_TODAY_FUN,
  payload: {
    money
  }
});
