//@flow
import React from "react";
import ReactSVG from "react-svg";

import style from "./DonutChart.module.css";

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
    <svg viewBox="0 0 35 35" className={style.donut}>
      <circle
        r="15.91549430918952"
        cx="50%"
        cy="50%"
        className={style.circle}
        strokeDasharray={`${tempValueInPercents}, 100`}
        fill={colorTemp}
      >
        {tempValueInPercents <= 20 ? (
          <animate
            attributeType="XML"
            attributeName="fill"
            from="#F72D6B"
            to="#ffffff"
            dur="2s"
            repeatCount="indefinite"
          />
        ) : (
          ""
        )}
      </circle>
      <g className={style.text}>
        <text
          className={style.title}
          x="50%"
          y="35%"
          transform="rotate(90 17.5 17.5)"
          textAnchor="middle"
        >
          {title}
        </text>
        <text
          className={style.cost}
          x="50%"
          y="50%"
          transform="rotate(90 17.5 17.5)"
          textAnchor="middle"
        >
          {cost}₽
        </text>

        <text
          className={style.footerTitle}
          x="50%"
          y="60%"
          transform="rotate(90 17.5 17.5)"
          textAnchor="middle"
        >
          На сегодня:
        </text>

        <text
          className={style.footerCost}
          x="50%"
          y="68%"
          transform="rotate(90 17.5 17.5)"
          textAnchor="middle"
        >
          {temp}/{maxToday}₽
        </text>
      </g>
    </svg>
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
