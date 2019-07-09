//@flow
import React from "react";

import style from "./LineChart.module.css";
import ChartistGraph from "react-chartist";
import "./chartist.css";

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

  var options = {
    low: 0,

    showArea: true,
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
        data={switcher ? dataIncome : dataCosts}
        options={options}
        type={type}
      />
    </div>
  );
};
