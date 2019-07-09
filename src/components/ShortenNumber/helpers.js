export function cutNumber(number) {
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
