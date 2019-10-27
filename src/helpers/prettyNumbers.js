import React from "react";

import { Icon } from "../components/Icon";
import numeral from "numeral";

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
  format = "0.00a"
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
  }
  // ADDITIONS:
  if (iScurrSign) {
    res += " ₽";
  }

  return res;
}
