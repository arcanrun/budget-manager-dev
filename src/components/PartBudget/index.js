//@flow
import React from "react";

import { DonutChart } from "../index";

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
      color = "#F2EC70";
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
        <h1>{title}</h1>
        <div>
          <div>{costsValue}</div>
          <div>
            {" "}
            на сегодня: {temp} / <b>{maxTodayValue}</b>
          </div>
          <div>
            <button onClick={() => onClickToggleModal(`${typeModal}_plus`)}>
              +
            </button>
            <button onClick={() => onClickToggleModal(`${typeModal}_minus`)}>
              -
            </button>
          </div>
        </div>
      </>
    );
  }
}

export { PartBudget };
