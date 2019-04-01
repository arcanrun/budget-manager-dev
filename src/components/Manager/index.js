//@flow
import React from "react";

import { Card, Overlay } from "../index";
import { ModalOverlay, WholeBudget, Calendar, PartBudget } from "../index";
import style from "./Manager.module.css";
import { getAllCosts } from "../../actions";

type PROPS = {
  getWholeBudget: Function,
  onClickToggleModal: Function,
  addWholeBudget: Function,
  addPayDay: Function,
  getPayDay: Function,
  calcToDayCosts: Function,
  getAllCosts: Function,
  typeModal: string,
  wholeBudget: number,
  payday: string,
  wholeBudget_isFetching: boolean,
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
    const budget = this.props.wholeBudget;
    const payday = this.props.payday;
    const vk_id = this.props.vk_id;
    const daysToPayday = this.props.daysToPayday;

    if (!budget) this.props.getWholeBudget();
    if (!payday) this.props.getPayDay();
    if (budget && payday && vk_id) this.props.getAllCosts(vk_id, daysToPayday);
  }

  componentDidUpdate(prevProps: Object, prevState: Object) {
    const budget = this.props.wholeBudget;
    const payday = this.props.payday;
    const vk_id = this.props.vk_id;
    const daysToPayday = this.props.daysToPayday;

    if (prevProps.wholeBudget !== budget || prevProps.payday !== payday) {
      if (budget && payday && vk_id)
        this.props.getAllCosts(vk_id, daysToPayday, budget);
    }
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
      calcToDayCosts,
      vk_id,
      costs
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
    const budgetCardCommon = (
      <Card>
        <PartBudget
          onClickToggleModal={onClickToggleModal}
          typeModal={"common"}
          costs={costs}
          budget={wholeBudget}
        />
      </Card>
    );
    const budgetCardFun = (
      <Card>
        <PartBudget
          onClickToggleModal={onClickToggleModal}
          typeModal={"fun"}
          costs={costs}
          budget={wholeBudget}
        />
      </Card>
    );
    const budgetCardInvest = (
      <Card>
        <PartBudget
          onClickToggleModal={onClickToggleModal}
          typeModal={"invest"}
          costs={costs}
          budget={wholeBudget}
        />
      </Card>
    );

    return (
      <>
        {payday ? wholeBudgetCard : ""}
        {calendarCard}
        {wholeBudget && payday ? budgetCardCommon : ""}
        {wholeBudget && payday ? budgetCardFun : ""}
        {wholeBudget && payday ? budgetCardInvest : ""}
        {!modalIsVisible || modalOverlay}
      </>
    );
  }
}
export { Manager };
