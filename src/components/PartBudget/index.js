//@flow
import React from "react";

import { DonutChart } from "../index";
import style from "./PartBudget.module.css";

type PROPS = {
  onClickToggleModal: Function,
  typeModal: string,
  costs: Object,
  budget: number
};

class PartBudget extends React.Component<PROPS, {}> {
  render() {
    const { costs, onClickToggleModal, typeModal, budget } = this.props;
    let title = "";
    let costsValue = "";
    let temp = "";
    let maxTodayValue = "";
    let color = "";
    if (typeModal === "common") {
      title = "50";
      costsValue = (budget * 0.5).toFixed(2);
      maxTodayValue = costs.common.maxToday.value;
      temp = costs.common.maxToday.temp;
      color = "#3E2AAA";
    } else if (typeModal === "fun") {
      title = "30";
      costsValue = (budget * 0.3).toFixed(2);
      maxTodayValue = costs.fun.maxToday.value;
      temp = costs.fun.maxToday.temp;
      color = "#FFB200";
    } else if (typeModal === "invest") {
      title = "20";
      costsValue = (budget * 0.2).toFixed(2);
      maxTodayValue = costs.invest.maxToday.value;
      temp = costs.invest.maxToday.temp;
      color = "#F95789";
    }
    return (
      <>
        <DonutChart
          title={title}
          cost={+costsValue}
          temp={+temp}
          maxToday={+maxTodayValue}
          color={color}
        />

        <div className={style.footer}>
          <button
            className={[style.button, style.buttonPlus].join(" ")}
            onClick={() => onClickToggleModal(`${typeModal}_plus`)}
          >
            +
          </button>
          <button
            className={[style.button, style.buttonMinus].join(" ")}
            onClick={() => onClickToggleModal(`${typeModal}_minus`)}
          >
            -
          </button>
        </div>
      </>
    );
  }
}

export { PartBudget };
