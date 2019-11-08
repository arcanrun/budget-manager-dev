//@flow

import React from "react";
import DayPicker from "react-day-picker";
// import "react-day-picker/lib/style.css";

import "./style.css";
import style from "./Calendar.module.css";
import { stringToDate, dateToString, addSuffix } from "./calendarHelper";

type PROPS = {
  handleDayClick: Function,
  handleNewPayDay: Function,
  payday: string,
  tempPayDay: ?string,
  daysToPayday: ?string
};
const WEEKDAYS_SHORT = {
  ru: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
};
const MONTHS = {
  ru: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
  ]
};

const WEEKDAYS_LONG = {
  ru: [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота"
  ]
};

const FIRST_DAY_OF_WEEK = {
  ru: 1
};
// Translate aria-labels
const LABELS = {
  ru: { nextMonth: "следующий месяц", previousMonth: "предыдущий месяц" }
};

class Calendar extends React.Component<PROPS, {}> {
  handleToDayBtn = () => {
    const { handleDayClick } = this.props;
    const toDay = new Date();
    handleDayClick(toDay);
  };
  render() {
    const {
      handleDayClick,
      handleNewPayDay,
      payday,
      tempPayDay,
      daysToPayday
    } = this.props;

    const paydayEmptyTitle = <div>Выберите дату получения зарплаты</div>;
    const counterBlock =
      daysToPayday === 0 || daysToPayday === "0" ? (
        <div className={style.paydayToDay}>зарплата сегодня</div>
      ) : (
        <div className={style.counterBlock}>
          <div className={style.counter}>{daysToPayday}</div>
          <div className={style.counterBlockFooter}>
            <div className={style.highlight}>{addSuffix(daysToPayday)}</div>
            <div>до зарплаты</div>
          </div>
        </div>
      );

    const counterChoose = (
      <div className={style.chooser}>
        Дата получения зарплаты
        <br />
        <b className={style.days}>{dateToString(tempPayDay)}</b>
        <div className="pickle__control-btns" onClick={handleNewPayDay}>
          <button
            data-btn-type="ok"
            className={[style.btn, style.btnOk].join(" ")}
          />
          {"    "}
          <button
            data-btn-type="chanel"
            className={[style.btn, style.btnChanel].join(" ")}
          />
        </div>
      </div>
    );

    return (
      <>
        <DayPicker
          locale={"ru"}
          months={MONTHS["ru"]}
          weekdaysLong={WEEKDAYS_LONG["ru"]}
          weekdaysShort={WEEKDAYS_SHORT["ru"]}
          firstDayOfWeek={FIRST_DAY_OF_WEEK["ru"]}
          labels={LABELS["ru"]}
          todayButton={"сегодня"}
          onTodayButtonClick={this.handleToDayBtn}
          onDayClick={handleDayClick}
          selectedDays={[stringToDate(payday), stringToDate(tempPayDay)]}
          disabledDays={[{ before: new Date() }]}
        />
        <div className={[style.footer, "calendarFooter"].join(" ")}>
          {!payday && !tempPayDay
            ? paydayEmptyTitle
            : !tempPayDay
            ? counterBlock
            : counterChoose}
        </div>
      </>
    );
  }
}
export { Calendar };
