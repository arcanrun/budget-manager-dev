//@flow
import React from "react";
import { CSSTransition } from "react-transition-group";
import Joyride from "react-joyride";

import { Card, Overlay } from "../index";
import { WholeBudget, Calendar, PartBudget } from "../index";
import style from "./Manager.module.css";
import { msToDays } from "../Calendar/calendarHelper";
import "./animations.css";
import { stopGuide } from "../../actions";
import { type } from "os";

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
          placement: "bottom",
          isFixed: true
        },
        {
          target: ".pencil",
          title: "Общий бюджет",
          content: "Здесь вы можете изменить сумму Вашего бюджета.",
          disableBeacon: true,
          placement: "bottom",
          isFixed: true
        },
        {
          target: ".third-step",
          title: "Общий бюджет",
          content:
            "Управляйте сбережениями в зависимости от доходов или расходов.",
          disableBeacon: true,
          placement: "bottom",
          isFixed: true
        },
        {
          target: ".DayPicker",
          title: "Календарь",
          content:
            "Календарь отображает количество дней до зарплаты. Нажмите на день, чтобы изменить дату получения зарплаты.",
          disableBeacon: true,
          placement: "top",
          isFixed: true
        },
        {
          target: ".fifth-step",
          title: "50/30/20",
          content:
            "Приложение разделяет весь Ваш бюджет на 50%(общие расходы), 30%(развлечения), 20%(инвестиции). Диаграмма показывает остаток средств по той или иной категории, а также желательную сумму средств, доступную на сегодняшний день.",
          disableBeacon: true,
          placement: "top",
          isFixed: true
        },
        {
          target: ".vector",
          title: "50/30/20",
          content:
            "Вы также можете переводить средства из одной категории в другую.",
          disableBeacon: true,
          placement: "top",
          isFixed: true
        }
      ]
    };
  }

  componentDidMount() {
    const daysToPayday = this.props.daysToPayday;

    const toDay = new Date();
    const toDayFormated = toDay.toLocaleString().split(",")[0];

    this.props.getAllCosts(daysToPayday, toDay, toDayFormated);
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

    const { budget, payday, is_tutorial_done } = this.props;

    if (prevProps.modalIsVisible !== modalIsVisible) {
      modalIsVisible
        ? (body.style.overflow = "hidden")
        : (body.style.overflow = "auto");
    }
    if (!!budget && !!payday === false) {
      window.scrollTo({ top: 1000, behavior: "smooth" });
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
    const calendarFooter = document.body.querySelector(".calendarFooter");
    const calendarFooterYCoordinate =
      calendarFooter.getBoundingClientRect().y +
      window.pageYOffset -
      calendarFooter.getBoundingClientRect().height;

    window.scrollTo({
      top: calendarFooterYCoordinate,
      behavior: "smooth"
    });
  };
  handleNewPayDay = (e: any) => {
    const toDay = new Date();
    const btnType = e.target.dataset.btnType;
    const { tempPayDay } = this.state;
    switch (btnType) {
      case "ok":
        const initial_daysToPayday = msToDays(
          Date.parse(tempPayDay || "") - Date.now()
        );

        this.props.addPayDay(toDay, tempPayDay);
        this.setState({ tempPayDay: undefined });
        break;
      case "chanel":
        this.setState({ tempPayDay: undefined });
        break;
      default:
        console.warn("btnType hmm...");
    }
  };
  handleTour = (data: any) => {
    const { stopGuide, tutorialChangeState } = this.props;
    const { action } = data;
    if (action === "reset") {
      stopGuide();
      tutorialChangeState(true);
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
    const enterBudgetCard = isFetching_calc ? (
      ""
    ) : (
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
        scrollOffset={90}
        floaterProps={{
          disableFlip: true
        }}
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
            backgroundColor: "#f72d6b",
            fontSize: 14
          },
          buttonBack: {
            color: "#fff",
            userSelect: "none",
            outline: "none",
            backgroundColor: "rgb(82, 129, 185)",
            borderRadius: "4px",
            fontSize: 14
          },
          buttonSkip: {
            userSelect: "none",
            color: "#fff",
            outline: "none",
            backgroundColor: "rgb(82, 129, 185)",
            borderRadius: "4px",
            fontSize: 14
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
            color: "#fff",
            transition: "opacity 0.3s ease 0s, transform 0.2s ease 0s"
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
            {budget ? "" : enterBudgetCard}
            {budget ? wholeBudgetCard : ""}
            {budget ? calendarCard : ""}
            {budget && payday ? budgetCardCommon : ""}
            {budget && payday ? budgetCardFun : ""}
            {budget && payday ? budgetCardInvest : ""}
            {!is_tutorial_done ? (budget && payday ? guide : "") : ""}
          </div>
        </CSSTransition>
      </>
    );
  }
}
export { Manager };
