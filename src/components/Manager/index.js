//@flow
import React from "react";

import { Card, Overlay } from "../index";
import { ModalOverlay, WholeBudget, Calendar, PartBudget } from "../index";
import style from "./Manager.module.css";
import { getAllCosts } from "../../actions";
import { msToDays } from "../Calendar/calendarHelper";

type PROPS = {
  getWholeBudget: Function,
  onClickToggleModal: Function,
  addWholeBudget: Function,
  addPayDay: Function,
  getPayDay: Function,
  calcToDayCosts: Function,
  getAllCosts: Function,
  typeModal: string,
  budget: number,
  payday: string,
  isFetching_calc: boolean,
  payday_isFetching: boolean,
  modalIsVisible: boolean,
  daysToPayday: string,
  vk_id: number,
  costs: Object
};

type STATE = {
  tempPayDay: ?string
};

class Manager extends React.Component<PROPS, STATE> {
  state = {
    tempPayDay: undefined
  };

  componentDidMount() {
    const budget = this.props.budget;
    const payday = this.props.payday;
    const vk_id = this.props.vk_id;
    const daysToPayday = this.props.daysToPayday;
    fetch("http://127.0.0.1:8000/log-in/", {
      method: "POST",
      body: JSON.stringify({ vk_id: "123456" })
    });

    this.props.getAllCosts(vk_id, daysToPayday, budget);
  }

  // componentDidUpdate(prevProps: Object, prevState: Object) {
  //   const budget = this.props.wholeBudget;
  //   const payday = this.props.payday;
  //   const vk_id = this.props.vk_id;
  //   const daysToPayday = this.props.daysToPayday;

  //   if (
  //     prevProps.wholeBudget !== budget ||
  //     prevProps.daysToPayday !== daysToPayday
  //   ) {
  //     if (budget && payday && vk_id)
  //       this.props.getAllCosts(vk_id, daysToPayday, budget);
  //   }
  // }

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
        const initial_daysToPayday = msToDays(
          Date.parse(tempPayDay) - Date.now()
        );
        this.props.addPayDay(tempPayDay, initial_daysToPayday);
        this.setState({ tempPayDay: undefined });
        break;
      case "chanel":
        this.setState({ tempPayDay: undefined });
        break;
      default:
        console.log("btnType hmm...");
    }
  };

  render() {
    const {
      modalIsVisible,
      onClickToggleModal,
      typeModal,
      budget,
      payday,
      isFetching_calc,
      payday_isFetching,
      daysToPayday,

      costs
    } = this.props;
    const { tempPayDay } = this.state;
    const overlay = <Overlay />;
    const wholeBudgetCard = daysToPayday ? (
      <Card
        headerTitle={"общий бюджет"}
        icon={"money-bag"}
        rightIcon={"pencil"}
        onClick={() => onClickToggleModal("budget")}
      >
        {/* {isFetching_calc ? overlay : ""} */}
        <WholeBudget
          onClick={() => onClickToggleModal("budget")}
          wholeBudget={budget}
        />
      </Card>
    ) : (
      <Card
        headerTitle={"общий бюджет"}
        icon={"money-bag"}
        onClick={() => onClickToggleModal("budget")}
      >
        {/* {isFetching_calc ? overlay : ""} */}
        <WholeBudget
          onClick={() => onClickToggleModal("budget")}
          wholeBudget={budget}
        />
      </Card>
    );
    const calendarCard = (
      <Card headerTitle={"календарь"} icon={"calendar"}>
        {/* {isFetching_calc ? overlay : ""} */}
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
    const budgetCardCommon = (
      <Card>
        <PartBudget
          onClickToggleModal={onClickToggleModal}
          typeModal={"common"}
          costs={costs}
          budget={budget}
        />
      </Card>
    );
    const budgetCardFun = (
      <Card>
        <PartBudget
          onClickToggleModal={onClickToggleModal}
          typeModal={"fun"}
          costs={costs}
          budget={budget}
        />
      </Card>
    );
    const budgetCardInvest = (
      <Card>
        <PartBudget
          onClickToggleModal={onClickToggleModal}
          typeModal={"invest"}
          costs={costs}
          budget={budget}
        />
      </Card>
    );

    return (
      <>
        {isFetching_calc ? overlay : ""}
        {wholeBudgetCard}
        {budget ? calendarCard : ""}
        {budget && payday ? budgetCardCommon : ""}
        {budget && payday ? budgetCardFun : ""}
        {budget && payday ? budgetCardInvest : ""}
        {!modalIsVisible || modalOverlay}
      </>
    );
  }
}
export { Manager };
