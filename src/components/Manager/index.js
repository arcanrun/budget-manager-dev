//@flow
import React from "react";
import { CSSTransition } from "react-transition-group";
import Joyride from "react-joyride";

import { Card, Overlay } from "../index";
import { ModalOverlay, WholeBudget, Calendar, PartBudget } from "../index";
import style from "./Manager.module.css";
import { msToDays } from "../Calendar/calendarHelper";
import "./animations.css";
import { stopGuide } from "../../actions";

type PROPS = {
  tutorialChangeState: Function,
  getWholeBudget: Function,
  onClickToggleModal: Function,
  addWholeBudget: Function,
  addPayDay: Function,
  getPayDay: Function,
  calcTempCosts: Function,
  getAllCosts: Function,
  logIn: Function,
  calcBudget: Function,
  stopGuide: Function,
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
  is_first_time: boolean,
  is_tutorial_done: boolean
};

type STATE = {
  tempPayDay: ?string,
  in: boolean,
  steps: Array<any>
};

class Manager extends React.Component<PROPS, STATE> {
  constructor(props: Object) {
    super(props);
    this.state = {
      tempPayDay: undefined,
      in: false,
      steps: [
        {
          target: ".first-step",
          title: "Общий бюджет",
          content: "Здесь отображаются все Ваши накопления.",
          disableBeacon: true,
          placement: "auto",
          isFixed: true
        },
        {
          target: ".pencil",
          title: "Общий бюджет",
          content: "Здесь вы можете изменить сумму Вашего бюджета.",
          disableBeacon: true,
          placement: "auto",
          isFixed: true
        },
        {
          target: ".third-step",
          title: "Общий бюджет",
          content:
            "Управляйте сбережениями в зависимости от доходов или расходов.",
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
            "Приложение разделяет весь Ваш бюджет на 50%(общие расходы), 30%(развлечения), 20%(инвестиции). Диаграмма показывает остаток средств по той или иной категории, а также желательную сумму средств, доступную на сегодняшний день.",
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
  }

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

  handleDayClick = (day: any) => {
    let toDay = new Date();
    toDay = Date.parse(toDay.toDateString());
    const selectedDay = Date.parse(day.toDateString());
    if (selectedDay >= toDay) {
      this.setState({
        tempPayDay: day
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
  handleTour = (data: any) => {
    const { stopGuide, tutorialChangeState, vk_id } = this.props;
    const { action } = data;
    if (action === "reset") {
      stopGuide();
      tutorialChangeState(vk_id, true);
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
      calcBudget,
      is_first_time,
      is_tutorial_done
    } = this.props;
    const { tempPayDay, steps } = this.state;
    const enterBudgetCard = (
      <Card
        headerTitle={"общий бюджет"}
        icon={"money-bag"}
        rightIcon={budget ? "pencil" : ""}
        onClick={() => onClickToggleModal("budget")}
      >
        <WholeBudget
          onClickToggleModal={onClickToggleModal}
          typeModal={"budget"}
          wholeBudget={budget}
          daysToPayday={daysToPayday}
          isFetching={isFetching_calc}
          isEnterBudget
        />
      </Card>
    );
    const wholeBudgetCard = (
      <Card
        headerTitle={"общий бюджет"}
        icon={"money-bag"}
        rightIcon={budget ? "pencil" : ""}
        onClick={() => onClickToggleModal("budget")}
      >
        <WholeBudget
          onClickToggleModal={onClickToggleModal}
          typeModal={"budget"}
          wholeBudget={budget}
          daysToPayday={daysToPayday}
          isFetching={isFetching_calc}
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
        callback={this.handleTour}
        steps={steps}
        continuous
        disableOverlayClose
        locale={{
          back: "Назад",
          close: "Закрыть",
          last: "Конец",
          next: "Далее",
          skip: "Пропустить"
        }}
        showProgress
        showSkipButton
        scrollToFirstStep
        styles={{
          options: {
            userSelect: "none",
            primaryColor: "#5281b9",
            zIndex: 1,
            outline: "none",
            border: "10px solid red",
            arrowColor: "#47a3ff"
          },
          buttonNext: {
            userSelect: "none",
            outline: "none",
            color: "#fff",
            backgroundColor: "#f72d6b"
          },
          buttonSkip: {
            userSelect: "none",
            color: "#5281b9",
            outline: "none",
            backgroundColor: "transparent",
            fontSzie: "13px"
          },
          buttonClose: {
            outline: "none",
            userSelect: "none",
            color: "#fff"
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0)",
            mixBlendMode: "hard-light",
            overflow: "hidden",
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 1
          },
          spotlight: {
            backgroundColor: "rgba(0,0,0,0.1)"
          },
          tooltip: {
            userSelect: "none",
            backgroundColor: "#47a3ff",
            color: "#fff"
          }
        }}
      />
    );

    return (
      <>
        <Overlay isTransparent={true} isFetching={isFetching_calc} />

        <CSSTransition
          in={this.state.in}
          timeout={500}
          classNames={"page"}
          unmountOnExit
        >
          <div className={style.manager}>
            {is_first_time ? enterBudgetCard : ""}
            {budget ? wholeBudgetCard : ""}
            {budget ? calendarCard : ""}
            {budget && payday ? budgetCardCommon : ""}
            {budget && payday ? budgetCardFun : ""}
            {budget && payday ? budgetCardInvest : ""}
            {/*!modalIsVisible || modalOverlay*/}
            {!is_tutorial_done ? (budget && payday ? guide : "") : ""}
          </div>
        </CSSTransition>
      </>
    );
  }
}
export { Manager };
