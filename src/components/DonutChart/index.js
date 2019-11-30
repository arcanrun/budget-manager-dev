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
  maxToday: number,
  tempMonth: number
};

const DonutChart = ({
  color,
  title,
  cost,
  temp,
  maxToday,
  tempMonth
}: PROPS) => {
  let tempValueInPercents = "";
  if (temp <= 0) {
    tempValueInPercents = 0;
  } else {
    tempValueInPercents = (100 * temp) / maxToday;
  }

  let tempMonthInPercents = "";
  if (tempMonth <= 0) {
    tempMonthInPercents = 0;
  } else {
    tempMonthInPercents = (100 * tempMonth) / cost;
  }
  let circleOutter = "";
  if (title === "50") {
    circleOutter = (
      <circle
        r="15.91549430918952"
        cx="50%"
        cy="50%"
        className={[style.circleOutter, style.circleOutterCommon].join(" ")}
        strokeDasharray={`${tempMonthInPercents}, 100`}
        fillOpacity="0"
      />
    );
  }
  if (title === "30") {
    circleOutter = (
      <circle
        r="15.91549430918952"
        cx="50%"
        cy="50%"
        className={[style.circleOutter, style.circleOutterFun].join(" ")}
        strokeDasharray={`${tempMonthInPercents}, 100`}
        fillOpacity="0"
      />
    );
  }
  if (title === "20") {
    circleOutter = (
      <circle
        r="15.91549430918952"
        cx="50%"
        cy="50%"
        className={[style.circleOutter, style.circleOutterInvest].join(" ")}
        strokeDasharray={`${tempMonthInPercents}, 100`}
        fillOpacity="0"
      />
    );
  }

  return (
    <div className={[style.donutContainer, "fifth-step"].join(" ")}>
      <div className={title === "30" ? style.infoDonutBlack : style.infoDonut}>
        <div className={style.title}>{title}</div>
        <div className={style.cost}>
          {toPrettyNumber(
            tempMonth,
            true,
            10000000,
            false,
            "",
            "",
            "0.00a",
            "0.0",
            "14px"
          )}
          /
          {toPrettyNumber(
            cost,
            true,
            10000000,
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
            ? [style.donut, style.flashAnimation, style.svgCircle].join(" ")
            : [style.donut, style.svgCircle].join(" ")
        }
      >
        <circle
          r="15.91549430918952"
          cx="50%"
          cy="50%"
          className={style.circle}
          strokeDasharray={`${tempValueInPercents}, 100`}
          fill={color}
        />
      </svg>
      <svg
        viewBox="0 0 35 35"
        className={
          tempMonthInPercents <= 20
            ? [style.donutOuter, style.pulseAnimation].join(" ")
            : style.donutOuter
        }
      >
        {circleOutter}
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
