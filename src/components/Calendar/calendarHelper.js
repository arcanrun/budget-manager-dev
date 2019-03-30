// (int) The current year
export const THIS_YEAR = +new Date().getFullYear();

// (int) The current month starting from 1 - 12
// 1 => January, 12 => December
export const THIS_MONTH = +new Date().getMonth() + 1;

// Week days names and shortnames
export const WEEK_DAYS = {
  Sunday: "ВС",
  Monday: "ПН",
  Tuesday: "ВТ",
  Wednesday: "СР",
  Thursday: "ЧТ",
  Friday: "ПТ",
  Saturday: "СБ"
};

// Calendar months names and shortnames
export const CALENDAR_MONTHS = {
  January: "ЯНВ",
  February: "ФЕВ",
  March: "МАР",
  April: "АПР",
  May: "МАЯ",
  June: "ИЮН",
  July: "ИЮЛ",
  August: "АВГ",
  September: "СЕН",
  October: "ОКТ",
  November: "НОЯ",
  December: "ДЕК"
};

// Weeks displayed on calendar
export const CALENDAR_WEEKS = 6;

// Pads a string value with leading zeroes(0) until length is reached
// For example: zeroPad(5, 2) => "05"
export const zeroPad = (value, length) => {
  return `${value}`.padStart(length, "0");
};

// (int) Number days in a month for a given year from 28 - 31
export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
  const months30 = [4, 6, 9, 11];
  const leapYear = year % 4 === 0;

  return month === 2
    ? leapYear
      ? 29
      : 28
    : months30.includes(month)
    ? 30
    : 31;
};

// (int) First day of the month for a given year from 1 - 7
// 1 => Sunday, 7 => Saturday
export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
  return +new Date(`${year}-${zeroPad(month, 2)}-01`).getDay() + 1;
};

// (bool) Checks if a value is a date - this is just a simple check
export const isDate = date => {
  // const isDate = Object.prototype.toString.call(date) === "[object Date]";
  const isDate = Date.parse(date);
  const isValidDate = date && !Number.isNaN(date.valueOf());

  return isDate && isValidDate;
};

// (bool) Checks if two date values are of the same month and year
export const isSameMonth = (date, basedate = new Date()) => {
  if (!(isDate(date) && isDate(basedate))) return false;

  const basedateMonth = +basedate.getMonth() + 1;
  const basedateYear = basedate.getFullYear();

  const dateMonth = +date.getMonth() + 1;
  const dateYear = date.getFullYear();

  return +basedateMonth === +dateMonth && +basedateYear === +dateYear;
};

// (bool) Checks if two date values are the same day
export const isSameDay = (date, basedate = new Date()) => {
  if (!(isDate(date) && isDate(basedate))) return false;

  const basedateDate = basedate.getDate();
  const basedateMonth = +basedate.getMonth() + 1;
  const basedateYear = basedate.getFullYear();

  const dateDate = date.getDate();
  const dateMonth = +date.getMonth() + 1;
  const dateYear = date.getFullYear();

  return (
    +basedateDate === +dateDate &&
    +basedateMonth === +dateMonth &&
    +basedateYear === +dateYear
  );
};

// (string) Formats the given date as DD-MM-YYYY
// Months and Days are zero padded
export const getDateISO = (date = new Date()) => {
  if (!isDate(date)) return null;

  return [
    zeroPad(+date.getDate(), 2),
    zeroPad(+date.getMonth() + 1, 2),
    date.getFullYear()
  ].join("-");
};

// ({month, year}) Gets the month and year before the given month and year
// For example: getPreviousMonth(1, 2000) => {month: 12, year: 1999}
// while: getPreviousMonth(12, 2000) => {month: 11, year: 2000}
export const getPreviousMonth = (month, year) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;

  return { month: prevMonth, year: prevMonthYear };
};

// ({month, year}) Gets the month and year after the given month and year
// For example: getNextMonth(1, 2000) => {month: 2, year: 2000}
// while: getNextMonth(12, 2000) => {month: 1, year: 2001}
export const getNextMonth = (month, year) => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;

  return { month: nextMonth, year: nextMonthYear };
};

// Calendar builder for a month in the specified year
// Returns an array of the calendar dates.
// Each calendar date is represented as an array => [YYYY, MM, DD] !- changed to dd mm yyy!!!!!

export default (month = THIS_MONTH, year = THIS_YEAR) => {
  // Get number of days in the month and the month's first day

  const monthDays = getMonthDays(month, year);
  const monthFirstDay = getMonthFirstDay(month, year);

  // Get number of days to be displayed from previous and next months
  // These ensure a total of 42 days (6 weeks) displayed on the calendar

  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth =
    CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);

  // Get the previous and next months and years

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(
    month,
    year
  );
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

  // Get number of days in previous month
  const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);

  // Builds dates to be displayed from previous month

  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return [prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2)];
  });

  // Builds dates to be displayed from current month

  const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
    const day = index + 1;
    return [year, zeroPad(month, 2), zeroPad(day, 2)];
  });

  // Builds dates to be displayed from next month

  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
    const day = index + 1;
    return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
  });

  // Combines all dates from previous, current and next months
  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};

export const stringToDate = string => {
  const ms = Date.parse(string);
  let date = new Date(ms);
  return date;
};

// zeroPad(5, 2) => "05"
export const dateToString = date => {
  if (date) {
    const year = date.getFullYear();
    const month = zeroPad(date.getMonth() + 1, 2);
    const day = zeroPad(date.getDate(), 2);
    return `${day}.${month}.${year}`;
  }

  return "";
};

// export const msToDays = millisec => {
//   if (millisec < 0) return 0;
//   let seconds = (millisec / 1000).toFixed(1);

//   let minutes = (millisec / (1000 * 60)).toFixed(1);

//   let hours = (millisec / (1000 * 60 * 60)).toFixed(1);

//   let days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

//   if (seconds < 60) {
//     return seconds + " Sec";
//   } else if (minutes < 60) {
//     return minutes + " Min";
//   } else if (hours < 24) {
//     return hours + " Hrs";
//   } else {
//     return days;
//   }
// };

export const msToDays = millisec => {
  if (millisec < 0) return 0;
  let seconds = (millisec / 1000).toFixed(1);

  let minutes = (millisec / (1000 * 60)).toFixed(1);

  let hours = (millisec / (1000 * 60 * 60)).toFixed(1);

  let days = (millisec / (1000 * 60 * 60 * 24)).toFixed(0);

  // if (seconds < 60) {
  //   return seconds + " Sec";
  // } else if (minutes < 60) {
  //   return minutes + " Min";
  // } else if (hours < 24) {
  //   return hours + " Hrs";
  // } else {
  //   return days;
  // }
  return days;
};

export const addSuffix = days => {
  switch (days) {
    case "11":
    case "12":
    case "13":
    case "14":
      return "Дней";
    default:
      const number = days % 10;
      switch (number) {
        case 1:
          return "День";
        case 2:
        case 3:
        case 4:
          return "Дня";
        default:
          return "Дней";
      }
  }
};
