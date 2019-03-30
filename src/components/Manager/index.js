//@flow
import React from "react";

import { Card, Overlay } from "../index";
import { ModalOverlay, WholeBudget, Calendar } from "../index";
import style from "./Manager.module.css";

type PROPS = {
  getWholeBudget: Function,
  onClickToggleModal: Function,
  addWholeBudget: Function,
  addPayDay: Function,
  getPayDay: Function,
  typeModal: string,
  wholeBudget: number,
  payday: string,
  wholeBudget_isFetching: boolean,
  payday_isFetching: boolean,
  modalIsVisible: boolean,
  daysToPayday: string,
  common: number
};

type STATE = {
  tempPayDay: ?string
};

class Manager extends React.Component<PROPS, STATE> {
  state = {
    tempPayDay: undefined
  };
  componentDidMount() {
    if (!this.props.wholeBudget) this.props.getWholeBudget();
    if (!this.props.payday) this.props.getPayDay();

    this.calculation();
  }
  handleDayClick = (day: string, { selected }: { selected: boolean }) => {
    this.setState({
      tempPayDay: selected ? undefined : day
    });
  };
  handleNewPayDay = (e: any) => {
    const btnType = e.target.dataset.btnType;
    const { tempPayDay } = this.state;
    switch (btnType) {
      case "ok":
        this.props.addPayDay(tempPayDay);
        this.setState({ tempPayDay: undefined });
        break;
      case "chanel":
        this.setState({ tempPayDay: undefined });
        break;
      default:
        console.log("btnType hmm...");
    }
  };
  calculation = () => {
    const budget = parseFloat(this.props.wholeBudget);
    const common = budget * 0.5;
    const fun = +budget * 0.3;
    const invest = +budget * 0.2;
    console.log(common, fun, invest);
  };
  render() {
    const {
      modalIsVisible,
      onClickToggleModal,
      typeModal,
      wholeBudget,
      payday,
      wholeBudget_isFetching,
      payday_isFetching,
      daysToPayday,
      common
    } = this.props;
    const { tempPayDay } = this.state;
    const overlay = <Overlay />;
    const wholeBudgetCard = (
      <Card
        headerTitle={"общий бюджет"}
        icon={"money-bag"}
        rightIcon={"pencil"}
        onClick={() => onClickToggleModal("budget")}
      >
        {wholeBudget_isFetching ? overlay : ""}
        <WholeBudget
          onClick={() => onClickToggleModal("budget")}
          wholeBudget={wholeBudget}
        />
      </Card>
    );
    const calendarCard = (
      <Card headerTitle={"календарь"} icon={"calendar"}>
        {payday_isFetching ? overlay : ""}
        <Calendar
          handleDayClick={this.handleDayClick}
          handleNewPayDay={this.handleNewPayDay}
          tempPayDay={tempPayDay}
          payday={payday}
          daysToPayday={daysToPayday}
        />
      </Card>
    );
    const modalOverlay = (
      <ModalOverlay
        onClick={onClickToggleModal}
        typeModal={typeModal}
        {...this.props}
      />
    );
    const dailyCommon = (common / +daysToPayday).toFixed(2);
    const budgetCard50 = (
      <Card>
        <h1>50</h1>
        <div>
          <div>{common}</div>
          <div>
            {" "}
            на сегодня: {dailyCommon} / <b>{dailyCommon}</b>
          </div>
          <div>
            <button onClick={() => onClickToggleModal("plus")}>+</button>
            <button onClick={() => onClickToggleModal("minus")}>-</button>
          </div>
        </div>
      </Card>
    );
    return (
      <>
        {wholeBudgetCard}
        {calendarCard}
        {!modalIsVisible || modalOverlay}
        {budgetCard50}
      </>
    );
  }
}
export { Manager };
