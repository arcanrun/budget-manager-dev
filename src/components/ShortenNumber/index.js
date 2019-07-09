//@flow
import React from "react";
import NumericLabel from "react-pretty-numbers";

import style from "./ShortenNumber.css";
import { Icon } from "../index";

type PROPS = {
  children: number,
  easterEgg: boolean,
  alternative: boolean,
  easterEggSize?: string,
  minValToShort?: number
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function cutNumber(number) {
  let notFullNumber = "" + number;
  notFullNumber = notFullNumber.slice(0, 7);
  if (notFullNumber.includes(".")) {
    const dotPositon = notFullNumber.indexOf(".");
    const lengthStr = notFullNumber.length;
    let factor = `1e${lengthStr - dotPositon - 1}`;
    factor = +factor;
    let res = +notFullNumber * factor;
    res = "" + res;
    res = res.slice(0, res.indexOf("."));
    return `${res}...`;
  }
  return notFullNumber + "...";
}

export const ShortenNumber = ({
  children,
  easterEgg,
  alternative,
  easterEggSize,
  minValToShort
}: PROPS) => {
  const params = {
    justification: "L",
    locales: "ru-RU",
    currencyIndicator: "₽",
    percentage: false,
    precision: 2,
    wholenumber: null,
    commafy: true,
    shortFormat: true,
    shortFormatMinValue: minValToShort ? minValToShort : 1000000000,
    shortFormatPrecision: 1,
    title: true
  };
  if (alternative) {
    if (+children > 1e10) {
      return cutNumber(children);
    } else {
      return children;
    }
  }

  if (+children > 1e18 && easterEgg) {
    const randNumber = getRandomInt(1, 4);
    return <Icon icon={`rich_${randNumber}`} classes={easterEggSize} />;
  } else if (+children > 1e18 && !easterEgg) {
    return cutNumber(children);
  }
  return (
    <span>
      <NumericLabel params={params}>{children}</NumericLabel>{" "}
      <span className={style.volute}>₽</span>
    </span>
  );
};
ShortenNumber.defaultProps = {
  easterEgg: true,
  alternative: false
};
