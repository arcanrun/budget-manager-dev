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
    console.log(costs.common);
    let title = "";
    let costsValue = "";
    let temp = "";
    let maxTodayValue = "";
    let color = "";
    switch (typeModal) {
      case "common":
        title = "50";
        costsValue = costs.common.value;
        maxTodayValue = costs.common.maxToday.value;
        temp = costs.common.maxToday.temp;
        color = "#3E2AAA";
        break;
      case "fun":
        title = "30";
        costsValue = costs.fun.value;
        maxTodayValue = costs.fun.maxToday.value;
        temp = costs.fun.maxToday.temp;
        color = "#FFB200";
        break;
      case "invest":
        title = "20";
        costsValue = costs.invest.value;
        maxTodayValue = costs.invest.maxToday.value;
        temp = costs.invest.maxToday.temp;
        color = "#F95789";
        break;
      default:
        title = "SOME ERROR";
        costsValue = 0;
        maxTodayValue = 0;
        temp = 0;
        color = "#000000";
        break;
    }

    const plusBtn = (
      <button
        className={[style.button, style.buttonPlus].join(" ")}
        onClick={() => onClickToggleModal(`${typeModal}_plus`)}
      >
        +
      </button>
    );
    const minusBtn = (
      <button
        className={[style.button, style.buttonMinus].join(" ")}
        onClick={() => onClickToggleModal(`${typeModal}_minus`)}
      >
        -
      </button>
    );
    const footer = (
      <div className={style.footer}>
        {plusBtn}
        {minusBtn}
      </div>
    );
    const chart = (
      <DonutChart
        title={title}
        cost={costsValue}
        temp={+temp}
        maxToday={+maxTodayValue}
        color={color}
      />
    );
    return (
      <>
        {chart}
        {footer}
      </>
    );
  }
}

export { PartBudget };
