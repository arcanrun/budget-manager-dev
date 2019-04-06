//@flow
import React from "react";

import { Card, Overlay } from "../index";
import { ModalOverlay, WholeBudget, Calendar, PartBudget } from "../index";
import style from "./Manager.module.css";
import { msToDays } from "../Calendar/calendarHelper";

type PROPS = {
  getWholeBudget: Function,
  onClickToggleModal: Function,
  addWholeBudget: Function,
  addPayDay: Function,
  getPayDay: Function,
  calcTempCosts: Function,
  getAllCosts: Function,
  typeModal: string,
  budget: number,
  payday: string,
  isFetching_calc: boolean,
  payday_isFetching: boolean,
  modalIsVisible: boolean,
  daysToPayday: string,
  vk_id: number,
  calc: Object,
  common: Object
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
    const vk_id = this.props.vk_id;
    const daysToPayday = this.props.daysToPayday;

    const toDay = new Date();
    const toDayFormated = toDay.toLocaleString().split(",")[0];

    fetch("http://127.0.0.1:8000/log-in/", {
      method: "POST",
      body: JSON.stringify({ vk_id })
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));

    this.props.getAllCosts(vk_id, daysToPayday, budget, toDay, toDayFormated);
  }

  componentDidUpdate(prevProps: Object, prevState: Object) {
    const modalIsVisible = this.props.modalIsVisible;
    const body = document.getElementsByTagName("body")[0];

    if (prevProps.modalIsVisible !== modalIsVisible) {
      modalIsVisible
        ? (body.style.overflow = "hidden")
        : (body.style.overflow = "auto");
    }
  }

  handleDayClick = (day: string, { selected }: { selected: boolean }) => {
    let toDay = new Date();
    toDay = toDay.toLocaleDateString();
    const toDayMs = Date.parse(toDay);
    const tempPayDay = day.toLocaleDateString();
    const tempPayDayMs = Date.parse(tempPayDay);

    if (tempPayDay > toDay) {
      this.setState({
        tempPayDay: selected ? undefined : day
      });
    }
  };
  handleNewPayDay = (e: any) => {
    const { vk_id } = this.props;
    const btnType = e.target.dataset.btnType;
    const { tempPayDay } = this.state;
    switch (btnType) {
      case "ok":
        const initial_daysToPayday = msToDays(
          Date.parse(tempPayDay || "") - Date.now()
        );

        this.props.addPayDay(vk_id, tempPayDay, initial_daysToPayday);
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
      daysToPayday,
      calc
    } = this.props;
    const { tempPayDay } = this.state;
    const overlay = <Overlay />;
    const showPreloader = isFetching_calc ? overlay : "";
    const wholeBudgetCard = daysToPayday ? (
      <Card
        headerTitle={"общий бюджет"}
        icon={"money-bag"}
        rightIcon={"pencil"}
        onClick={() => onClickToggleModal("budget")}
      >
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
        <WholeBudget
          onClick={() => onClickToggleModal("budget")}
          wholeBudget={budget}
        />
      </Card>
    );
    const calendarCard = (
      <Card headerTitle={"календарь"} icon={"calendar-number"}>
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
      <Card icon="50%" headerTitle="Общие расходы">
        <PartBudget
          onClickToggleModal={onClickToggleModal}
          typeModal={"common"}
          costs={calc}
          budget={budget}
        />
      </Card>
    );
    const budgetCardFun = (
      <Card icon="30%" headerTitle="Расходы на развлечения">
        <PartBudget
          onClickToggleModal={onClickToggleModal}
          typeModal={"fun"}
          costs={calc}
          budget={budget}
        />
      </Card>
    );
    const budgetCardInvest = (
      <Card icon="20%" headerTitle="Инвестиции">
        <PartBudget
          onClickToggleModal={onClickToggleModal}
          typeModal={"invest"}
          costs={calc}
          budget={budget}
        />
      </Card>
    );

    return (
      <div className={style.manager}>
        {showPreloader}
        {wholeBudgetCard}
        {budget ? calendarCard : ""}

        {budget && payday ? budgetCardCommon : ""}
        {budget && payday ? budgetCardFun : ""}
        {budget && payday ? budgetCardInvest : ""}

        {!modalIsVisible || modalOverlay}
      </div>
    );
  }
}
export { Manager };
