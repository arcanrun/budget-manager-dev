//@flow
import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";

import style from "./DonutChart.module.css";
import { toPrettyNumber } from "../../helpers/prettyNumbers";

type PROPS = {
  color: string,
  title: string,
  cost: number,
  temp: number,
  maxToday: number
};

const DonutChart = ({ color, title, cost, temp, maxToday }: PROPS) => {
  let tempValueInPercents = "";
  let colorTemp = "";
  if (temp <= 0) {
    tempValueInPercents = 0;
    colorTemp = "#F72D6B";
  } else {
    tempValueInPercents = (100 * temp) / maxToday;
    colorTemp = color;
  }

  return (
    <div className={[style.donutContainer, "fifth-step"].join(" ")}>
      <div className={style.infoDonut}>
        <div className={style.title}>{title}</div>
        <div className={style.cost}>
          {toPrettyNumber(
            cost,
            true,
            100000000,
            false,
            "",
            "",
            "0.00a",
            "0.0",
            "14px"
          )}
        </div>
        <div className={style.footerTitle}>На сегодня:</div>
        <div className={style.footer}>
          {toPrettyNumber(
            temp,
            true,
            100000,
            false,
            "",
            "",
            "0.00a",
            "0.0",
            "12px"
          )}
          /
          {toPrettyNumber(
            maxToday,
            true,
            100000,
            false,
            "",
            "",
            "0.00a",
            "0.0",
            "12px"
          )}
        </div>
      </div>
      <svg
        viewBox="0 0 35 35"
        className={
          tempValueInPercents <= 20
            ? [style.donut, style.pulseAnimation].join(" ")
            : style.donut
        }
      >
        <circle
          r="15.91549430918952"
          cx="50%"
          cy="50%"
          className={style.circle}
          strokeDasharray={`${tempValueInPercents}, 100`}
          fill={colorTemp}
        />
      </svg>
    </div>
  );
};

DonutChart.defaultProps = {
  color: "red",
  title: "50",
  cost: 5000,
  temp: 100,
  maxToday: 265
};

export { DonutChart };
