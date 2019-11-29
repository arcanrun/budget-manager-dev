//@flow
import React from "react";

import { DonutChart, ButtonGroup, Button, RoundButton } from "../index";
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
    let tempMonth = "";
    switch (typeModal) {
      case "common":
        title = "50";
        costsValue = costs.common.value;
        maxTodayValue = costs.common.maxToday.value;
        temp = costs.common.maxToday.temp;
        color = "#3E2AAA";
        tempMonth = costs.common.tempMonth;
        break;
      case "fun":
        title = "30";
        costsValue = costs.fun.value;
        maxTodayValue = costs.fun.maxToday.value;
        temp = costs.fun.maxToday.temp;
        color = "#FFB200";
        tempMonth = costs.fun.tempMonth;

        break;
      case "invest":
        title = "20";
        costsValue = costs.invest.value;
        maxTodayValue = costs.invest.maxToday.value;
        temp = costs.invest.maxToday.temp;
        color = "#F95789";
        tempMonth = costs.invest.tempMonth;

        break;
      default:
        title = "SOME ERROR";
        costsValue = 0;
        maxTodayValue = 0;
        temp = 0;
        color = "#000000";
        tempMonth = 0;

        break;
    }
    const plusBtn = (
      <button
        className={[style.button, style.buttonPlus].join(" ")}
        onClick={() => onClickToggleModal(`${typeModal}_plus`)}
      />
    );
    const minusBtn = (
      <button
        className={[style.button, style.buttonMinus].join(" ")}
        onClick={() => onClickToggleModal(`${typeModal}_minus`)}
      />
    );
    const footer = (
      <div className={style.footer}>
        {plusBtn}
        {minusBtn}
      </div>
    );
    const footer2 = (
      <div className={style.footer}>
        <ButtonGroup>
          <Button
            btnColor="green"
            onClick={() => onClickToggleModal(`${typeModal}_plus`)}
            text="+"
          />
          <Button
            btnColor="blue"
            onClick={() => onClickToggleModal(`${typeModal}_transfer`)}
            text="⇄"
          />
          <Button
            btnColor="red"
            onClick={() => onClickToggleModal(`${typeModal}_minus`)}
            text="-"
          />
        </ButtonGroup>
      </div>
    );
    const footer3 = (
      <div className={style.footer}>
        <RoundButton
          text="plus"
          onClick={() => onClickToggleModal(`${typeModal}_plus`)}
        />
        <RoundButton
          text="minus"
          onClick={() => onClickToggleModal(`${typeModal}_minus`)}
        />
      </div>
    );
    const chart = (
      <DonutChart
        tempMonth={tempMonth}
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
        {footer3}
      </>
    );
  }
}

export { PartBudget };
