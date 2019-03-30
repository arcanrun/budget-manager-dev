//@flow

import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import "./style.css";
import style from "./Calendar.module.css";
import {
  stringToDate,
  dateToString,
  msToDays,
  addSuffix
} from "./calendarHelper";
import { Spinner, Icon } from "../index";

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
    const daysToPayday = Date.parse(payday) - Date.now();

    const paydayEmptyTitle = <div>Выбирите дату получения зарплаты</div>;
    const counterBlock = (
      <div className={style.counterBlock}>
        <div className={style.counter}>{msToDays(daysToPayday)}</div>
        <div className={style.counterBlockFooter}>
          <div className={style.highlight}>
            {addSuffix(msToDays(daysToPayday))}
          </div>
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
          >
            <Icon icon={"check"} color={"#ffffff"} />
          </button>
          {"    "}
          <button
            data-btn-type="chanel"
            className={[style.btn, style.btnChanel].join(" ")}
          >
            <Icon icon={"cross"} color={"#ffffff"} />
          </button>
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
