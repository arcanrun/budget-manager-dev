import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import getSymbolFromCurrency from "currency-symbol-map";

import { Icon } from "../components/Icon";
import numeral from "numeral";
import { get } from "http";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function toPrettyNumber(
  num,
  iScurrSign = false,
  roundFrom = 1000000000,
  isEasterEgg = false,
  easterEggStartsFrom = 100000000,
  easterEggSize = "",
  format = "0.00a",
  alwaysFromat = false,
  alterSign = false,
  currency = "RUB"
) {
  let res = num;
  const randNumber = getRandomInt(1, 4);
  const easterEgg = (
    <Icon icon={`rich_${randNumber}`} classes={easterEggSize} />
  );

  if (num >= roundFrom || num <= -roundFrom) {
    res = numeral(num).format(`${format}`);
    if (
      isEasterEgg &&
      (num >= easterEggStartsFrom || num <= -easterEggStartsFrom)
    ) {
      return easterEgg;
    }
  } else if (alwaysFromat) {
    res = numeral(num).format(`${alwaysFromat}`);
  }
  // ADDITIONS:
  if (iScurrSign && !alterSign) {
    res += getSymbolFromCurrency(currency);
  } else if (iScurrSign && alterSign) {
    res = (
      <>
        {res}
        <i
          style={{ fontSize: `${alterSign}` }}
          className="fas fa-ruble-sign"
        ></i>
      </>
    );
  }

  return res;
}
