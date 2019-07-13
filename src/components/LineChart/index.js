//@flow
import React from "react";

import style from "./LineChart.module.css";
import ChartistGraph from "react-chartist";
import "./chartist.css";
import { cutNumber } from "../ShortenNumber/helpers";

type PROPS = {
  switcher: boolean,
  history: Array<any>
};

export const LineChart = ({ switcher, history }: PROPS) => {
  let currentMonth = new Date();
  currentMonth = currentMonth.getMonth() + 1;
  const currentMonthData = [];
  history.forEach(el => {
    const month = +Object.keys(el)[0].substr(4, 1);
    if (month === currentMonth) {
      currentMonthData.push(el);
    }
  });
  currentMonthData.reverse();

  var data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    series: [[1, 2, 4, 8, 6, 2, 1, 4, 6, 22, 100]]
  };

  const dataIncome = {
    labels: [],
    series: []
  };
  const dataCosts = {
    labels: [],
    series: []
  };
  const tempSeriesIncome = [];
  const tempSeriesCosts = [];
  currentMonthData.forEach(el => {
    const key = Object.keys(el)[0];
    const day = Object.keys(el)[0].substr(0, 2);
    const dayData = el[key];
    let plus = 0;
    let minus = 0;
    dayData.forEach(item => {
      switch (item.operation) {
        case "minus":
          minus += +item.value;
          break;
        case "plus":
          plus += +item.value;
          break;
        default:
          console.log("unknown operation in Chart");
          break;
      }
    });

    dataIncome.labels.push(day);
    tempSeriesIncome.push(plus);

    dataCosts.labels.push(day);
    tempSeriesCosts.push(minus);
  });
  dataIncome.series.push(tempSeriesIncome);
  dataCosts.series.push(tempSeriesCosts);

  let offset = 25;

  if (switcher) {
    dataIncome.series[0].forEach(el => {
      const toStr = "" + el;
      console.log("--<", offset, toStr.length);

      if (toStr.length === 4) {
        const increment = 30;
        if (offset < increment) offset = increment;
      } else if (toStr.length === 5) {
        const increment = 40;
        if (offset < increment) offset = increment;
      } else if (toStr.length === 6) {
        const increment = 50;
        if (offset < increment) offset = increment;
      } else if (toStr.length >= 7) {
        const increment = 57;
        if (offset < increment) offset = increment;
      }
    });
  } else {
    dataCosts.series[0].forEach(el => {
      const toStr = "" + el;
      if (toStr.length === 4) {
        const increment = 30;
        if (offset < increment) offset = increment;
      } else if (toStr.length === 5) {
        const increment = 40;
        if (offset < increment) offset = increment;
      } else if (toStr.length === 6) {
        const increment = 50;
        if (offset < increment) offset = increment;
      } else if (toStr.length >= 7) {
        const increment = 57;
        if (offset < increment) offset = increment;
      }
    });
  }

  var options = {
    low: 0,
    showArea: true,
    axisY: {
      labelInterpolationFnc: function(value) {
        let cutted = value;
        if (value > 9999999) {
          cutted = cutNumber(value, 0, 6);
        }
        return cutted;
      },
      offset: offset
    },
    classNames: {
      chart: "ct-chart-line",
      label: "ct-label",
      labelGroup: "ct-labels",
      series: "ct-series",
      line: switcher ? style.greenLine : style.redLine,
      point: switcher ? style.greenPoint : style.redPoint,
      area: switcher ? style.greenArea : style.redArea,
      grid: "ct-grid",
      gridGroup: "ct-grids",
      vertical: "ct-vertical",
      horizontal: "ct-horizontal",
      start: "ct-start",
      end: "ct-end"
    }
  };

  var type = "Line";
  return (
    <div className={style.contianer}>
      {" "}
      <ChartistGraph
        // data={data}
        data={switcher ? dataIncome : dataCosts}
        options={options}
        type={type}
      />
    </div>
  );
};
