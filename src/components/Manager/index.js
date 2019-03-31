//@flow
import React from "react";

import { Card, Overlay } from "../index";
import { ModalOverlay, WholeBudget, Calendar, PartBudget } from "../index";
import style from "./Manager.module.css";
import { minusToDayCOMMON, plusToDayCOMMON } from "../../actions";

type PROPS = {
  getWholeBudget: Function,
  onClickToggleModal: Function,
  addWholeBudget: Function,
  addPayDay: Function,
  getPayDay: Function,
  caclcToDayCOMMON: Function,
  minusToDayCOMMON: Function,
  plusToDayCOMMON: Function,
  typeModal: string,
  wholeBudget: number,
  payday: string,
  wholeBudget_isFetching: boolean,
  payday_isFetching: boolean,
  modalIsVisible: boolean,
  daysToPayday: string,
  common: number,
  M50: Object,
  vk_id: number
};

type STATE = {
  tempPayDay: ?string
};

class Manager extends React.Component<PROPS, STATE> {
  state = {
    tempPayDay: undefined
  };

  componentDidMount() {
    const wholeBudget = this.props.wholeBudget;
    const payday = this.props.payday;

    if (!wholeBudget) this.props.getWholeBudget();
    if (!payday) this.props.getPayDay();
    // this.calculation();
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
    const wholeBudget = this.props.wholeBudget;
    const payday = this.props.payday;

    if (wholeBudget && payday) {
      const commonForToday = this.props.common / +this.props.daysToPayday;

      console.log(commonForToday);
      this.props.caclcToDayCOMMON(commonForToday);
    } else {
      console.log("NOPE!");
    }
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
      common,
      caclcToDayCOMMON,
      M50,
      vk_id
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
    const budgetCard50 = (
      <Card>
        <PartBudget
          caclcToDay={caclcToDayCOMMON}
          onClickToggleModal={onClickToggleModal}
          common={common}
          daysToPayday={daysToPayday}
          typeModal={"common"}
          todaysCosts={M50}
          wholeBudget={wholeBudget}
          vk_id={vk_id}
        />
      </Card>
    );
    return (
      <>
        {wholeBudgetCard}
        {calendarCard}
        {wholeBudget && payday ? budgetCard50 : ""}
        {!modalIsVisible || modalOverlay}
      </>
    );
  }
}
export { Manager };
