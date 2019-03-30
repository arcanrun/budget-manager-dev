//@flow

import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import "./style.css";
import { stringToDate, dateToString, msToDays } from "./calendarHelper";
import { Spinner } from "../index";

type PROPS = {
  handleDayClick: Function,
  handleNewPayDay: Function,
  payday_isFetching: boolean,
  payday: string,
  tempPayDay: string
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
    return (
      <>
        <DayPicker
          showOutsideDays
          todayButton="Сегодня"
          onDayClick={handleDayClick}
          selectedDays={stringToDate(payday)}
        />
        <div className="pickle__footer">
          {payday_isFetching ? (
            <Spinner />
          ) : !payday && !tempPayDay ? (
            "Выбирите дату получения зарплаты"
          ) : !tempPayDay ? (
            <div className="pickle__counter">
              <span>{msToDays(Date.parse(payday) - Date.now())}</span>
              <span>Дней до зарплаты</span>
            </div>
          ) : (
            <div>
              Дата получения зарплаты
              <br />
              <b>{tempPayDay.toLocaleDateString()}</b>
              <div className="pickle__control-btns" onClick={handleNewPayDay}>
                <button data-btn-type="ok">ok</button>
                {"    "}
                <button data-btn-type="chanel">cancel</button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
export { Calendar };
