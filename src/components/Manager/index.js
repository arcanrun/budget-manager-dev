//@flow
import React from "react";
import { CSSTransition } from "react-transition-group";

import { Card, Overlay } from "../index";
import { ModalOverlay, WholeBudget, Calendar, PartBudget } from "../index";
import style from "./Manager.module.css";
import { msToDays } from "../Calendar/calendarHelper";
import "./animations.css";

type PROPS = {
  getWholeBudget: Function,
  onClickToggleModal: Function,
  addWholeBudget: Function,
  addPayDay: Function,
  getPayDay: Function,
  calcTempCosts: Function,
  getAllCosts: Function,
  logIn: Function,
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
  tempPayDay: ?string,
  in: boolean
};

class Manager extends React.Component<PROPS, STATE> {
  state = {
    tempPayDay: undefined,
    in: false
  };

  componentDidMount() {
    const budget = this.props.budget;
    const vk_id = this.props.vk_id;
    const daysToPayday = this.props.daysToPayday;

    const toDay = new Date();
    const toDayFormated = toDay.toLocaleString().split(",")[0];

    // this.props.logIn();

    this.props.getAllCosts(vk_id, daysToPayday, budget, toDay, toDayFormated);
    this.toggleAnimation();
  }
  toggleAnimation = () => {
    this.setState({ in: !this.state.in });
  };

  componentWillUnmount() {
    this.toggleAnimation();
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

  handleDayClick = (day: any, { selected }: { selected: boolean }) => {
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
    const overlay = (
      <Overlay isTransparent={true} isFetching={isFetching_calc} />
    );
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
        makeProfileOperation={""}
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
      <CSSTransition
        in={this.state.in}
        timeout={500}
        classNames={"page"}
        unmountOnExit
      >
        <div className={style.manager}>
          <Overlay isTransparent={true} isFetching={isFetching_calc} />
          {wholeBudgetCard}

          {budget ? calendarCard : ""}
          {budget && payday ? budgetCardCommon : ""}
          {budget && payday ? budgetCardFun : ""}
          {budget && payday ? budgetCardInvest : ""}
          {!modalIsVisible || modalOverlay}
        </div>
      </CSSTransition>
    );
  }
}
export { Manager };
