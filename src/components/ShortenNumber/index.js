//@flow
import React from "react";
import NumericLabel from "react-pretty-numbers";
import "@fortawesome/fontawesome-free/css/all.css";

import style from "./ShortenNumber.css";
import { Icon } from "../index";
import { cutNumber, toFixedCustom } from "./helpers";

type PROPS = {
  children: number,
  easterEgg: boolean,
  alternative: boolean,
  curency?: boolean,
  easterEggSize?: string,
  minValToShort?: number,
  size?: number
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const ShortenNumber = ({
  children,
  easterEgg,
  alternative,
  easterEggSize,
  minValToShort,
  curency,
  size
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
    if (+children > 1e7 || +children < -1e7) {
      const res = curency ? (
        <>
          {cutNumber(children)}
          <i
            style={{ fontSize: `${size}px` }}
            className="fas fa-ruble-sign"
          ></i>
        </>
      ) : (
        cutNumber(children)
      );
      return res;
    } else {
      const res = curency ? (
        <>
          {children}
          <i
            style={{ fontSize: `${size}px` }}
            className="fas fa-ruble-sign"
          ></i>
        </>
      ) : (
        children
      );
      return res;
    }
  }

  if ((+children > 1e18 || +children < -1e18) && easterEgg) {
    const randNumber = getRandomInt(1, 4);
    return <Icon icon={`rich_${randNumber}`} classes={easterEggSize} />;
  } else if (+children > 1e18 && !easterEgg) {
    return cutNumber(children);
  }
  return (
    <span>
      <NumericLabel params={params}>{children}</NumericLabel>{" "}
      <span className={style.volute}>
        <i style={{ fontSize: `${size}px` }} className="fas fa-ruble-sign"></i>
      </span>
    </span>
  );
};
ShortenNumber.defaultProps = {
  easterEgg: true,
  alternative: false,
  curency: false
};
