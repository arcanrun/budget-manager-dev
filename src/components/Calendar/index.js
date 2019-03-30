//@flow

import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import "./style.css";
import style from "./Calendar.module.css";
import { stringToDate, dateToString, msToDays } from "./calendarHelper";
import { Spinner } from "../index";

type PROPS = {
  handleDayClick: Function,
  handleNewPayDay: Function,
  payday_isFetching: boolean,
  payday: string,
  tempPayDay: ?string
};

class Calendar extends React.Component<PROPS, {}> {
  render() {
    const {
      handleDayClick,
      handleNewPayDay,
      payday_isFetching,
      payday,
      tempPayDay
    } = this.props;
    const paydayEmptyTitle = <div>Выбирите дату получения зарплаты</div>;
    const counterBlock = (
      <div className={style.counterBlock}>
        <div className={style.counter}>
          {msToDays(Date.parse(payday) - Date.now())}
        </div>
        <div className={style.counterFooter}>
          <div>Дней</div>
          <div>до зарплаты</div>
        </div>
      </div>
    );
    const counterChoose = (
      <div>
        Дата получения зарплаты
        <br />
        <b>{dateToString(tempPayDay)}</b>
        <div className="pickle__control-btns" onClick={handleNewPayDay}>
          <button data-btn-type="ok">ok</button>
          {"    "}
          <button data-btn-type="chanel">cancel</button>
        </div>
      </div>
    );

    return (
      <>
        <DayPicker
          showOutsideDays
          todayButton="Сегодня"
          onDayClick={handleDayClick}
          selectedDays={stringToDate(payday)}
        />
        <div className={style.footer}>
          {payday_isFetching ? (
            <Spinner />
          ) : !payday && !tempPayDay ? (
            paydayEmptyTitle
          ) : !tempPayDay ? (
            counterBlock
          ) : (
            counterChoose
          )}
        </div>
      </>
    );
  }
}
export { Calendar };
