//@flow
import React from "react";
import { CSSTransition } from "react-transition-group";
import Joyride from "react-joyride";

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
  calcBudget: Function,
  typeModal: string,
  budget: number,
  payday: string,
  isFetching_calc: boolean,
  payday_isFetching: boolean,
  modalIsVisible: boolean,
  daysToPayday: string,
  vk_id: number,
  calc: Object,
  common: Object,
  steps: Array<any>
};

type STATE = {
  tempPayDay: ?string,
  in: boolean
};

class Manager extends React.Component<PROPS, STATE> {
  state = {
    tempPayDay: undefined,
    in: false,
    steps: [
      {
        target: ".first-step",
        title: "Общий бюджет",
        content: "Здесь отображаются все ваши накопления",
        disableBeacon: true,
        placement: "auto",
        isFixed: true
      },
      {
        target: ".pencil",
        title: "Общий бюджет",
        content: "Здесь вы можете изменить сумму вашего бюджета.",
        disableBeacon: true,
        placement: "auto",
        isFixed: true
      },
      {
        target: ".third-step",
        title: "Общий бюджет",
        content:
          "Управляйте сбережениями в зависимотси от доходов или расходов.",
        disableBeacon: true,
        placement: "auto",
        isFixed: true
      },
      {
        target: ".DayPicker",
        title: "Календарь",
        content:
          "Календарь отображает количество дней до зарплаты. Нажмите на день, чтобы изменить дату получения зарплаты.",
        disableBeacon: true,
        placement: "auto",
        isFixed: true
      },
      {
        target: ".fifth-step",
        title: "50/30/20",
        content:
          "Приложение разделяет весь ваш бюджет на 50%(общие расходы), 30%(развлечения), 20%(инвестиции). Диаграмма показывает остаток средств по то или иной категории, а также желаемую сумму средств доступную на сегодняшний день.",
        disableBeacon: true,
        placement: "auto",
        isFixed: true
      },
      {
        target: ".vector",
        title: "50/30/20",
        content:
          "Вы также можете переводить средства из одной категории в другую.",
        disableBeacon: true,
        placement: "auto",
        isFixed: true
      }
    ]
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
    const toDayDate = toDay.toLocaleDateString();
    const toDayTempPayDayDate = day.toLocaleDateString();
    toDay = Date.parse(toDay);
    const toDayMs = Date.parse(toDay);
    const tempPayDay = Date.parse(day);
    const tempPayDayMs = Date.parse(tempPayDay);
    console.log(
      "%c DayClick:  ",
      "background: aqua; color: white",
      tempPayDay,
      toDay,
      tempPayDay > toDay
    );
    if (tempPayDay > toDay && toDayDate !== toDayTempPayDayDate) {
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
      calc,
      calcBudget
    } = this.props;
    const { tempPayDay, steps } = this.state;

    const wholeBudgetCard = daysToPayday ? (
      <Card
        headerTitle={"общий бюджет"}
        icon={"money-bag"}
        rightIcon={"pencil"}
        onClick={() => onClickToggleModal("budget")}
      >
        <WholeBudget
          onClickToggleModal={onClickToggleModal}
          typeModal={"budget"}
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
          onClickToggleModal={onClickToggleModal}
          typeModal={"budget"}
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
        calcBudget={calcBudget}
        makeProfileOperation={""}
        calc={calc}
        {...this.props}
      />
    );
    const budgetCardCommon = (
      <Card
        icon="50%"
        headerTitle="Общие расходы"
        rightIcon={"vector"}
        onClick={() => onClickToggleModal("common_transfer")}
      >
        <PartBudget
          onClickToggleModal={onClickToggleModal}
          typeModal={"common"}
          costs={calc}
          budget={budget}
        />
      </Card>
    );
    const budgetCardFun = (
      <Card
        icon="30%"
        headerTitle="Расходы на развлечения"
        rightIcon={"vector"}
        onClick={() => onClickToggleModal("fun_transfer")}
      >
        <PartBudget
          onClickToggleModal={onClickToggleModal}
          typeModal={"fun"}
          costs={calc}
          budget={budget}
        />
      </Card>
    );
    const budgetCardInvest = (
      <Card
        icon="20%"
        headerTitle="Инвестиции"
        rightIcon={"vector"}
        onClick={() => onClickToggleModal("invest_transfer")}
      >
        <PartBudget
          onClickToggleModal={onClickToggleModal}
          typeModal={"invest"}
          costs={calc}
          budget={budget}
        />
      </Card>
    );
    const guide = (
      <Joyride
        steps={steps}
        continuous
        disableOverlayClose
        locale={{
          back: "Назад",
          close: "Закрыть",
          last: "Конец",
          next: "Далее",
          skip: "Я все знаю!"
        }}
        showProgress
        showSkipButton
        scrollToFirstStep
        styles={{
          options: {
            primaryColor: "#5281b9"
          }
        }}
      />
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
          {guide}
        </div>
      </CSSTransition>
    );
  }
}
export { Manager };
