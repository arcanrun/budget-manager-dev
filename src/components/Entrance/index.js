//@flow
import React from "react";
import { Redirect } from "react-router-dom";
import Swiper from "react-id-swiper";
import { Input, Button } from "@vkontakte/vkui";
import { CSSTransition } from "react-transition-group";

// import "swiper/dist/css/swiper.css";
import style from "./Entrance.module.css";
import "./costumizedSwiper.css";
import { EntranceItem } from "../index";

type PROPS = {
  signUp: Function,
  vk_id: ?number,
  isFetching: boolean,
  error: boolean,
  params: string,
  history: Array<any>,
  isVkTheme: boolean,
  isCostomDarkTheme: boolean,
  themeVkClient: string,
  isVkTheme: boolean,
  isCostomDarkTheme: boolean,
  themeVkClient: string,
  budget: string,
  addWholeBudget: Function,
  payDay: string
};

type STATE = {
  screenHeight: ?number,
  screenWidth: ?number,
  isBudgetValue: ?boolean,
  isBudgetShown: ?boolean,
  isCalendarShown: ?boolean
};

class Entrance extends React.Component<PROPS, STATE> {
  state = {
    screenHeight: window.innerHeight,
    screenWidth: window.innerWidth,
    isBudgetValue: false,
    isBudgetShown: true,
    isCalendarShown: false
  };

  componentDidMount() {
    window.addEventListener("resize", this.setSize);
  }
  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    const body = document.getElementsByTagName("body")[0];
    if (this.props.isVkTheme) {
      body.setAttribute("scheme", this.props.themeVkClient);
    }
    if (this.props.isCostomDarkTheme && !this.props.isVkTheme) {
      body.setAttribute("scheme", "client_dark");
    }
    if (!this.props.isCostomDarkTheme && !this.props.isVkTheme) {
      body.setAttribute("scheme", "client_light");
    }
    return true;
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.setSize);
  }

  setSize = (e: Object) => {
    const screenHeight = e.target.innerHeight;
    const screenWidth = e.target.innerWidth;
    this.setState({
      screenHeight,
      screenWidth
    });
  };

  step = () => {
    console.log(this.state);
    this.setState({ isBudgetShown: false, isCalendarShown: true });
    // this.props.addWholeBudget("1000", "add");
  };

  onChangeBudget = (e: Object) => {
    const { value } = e.currentTarget;
    this.setState({ isBudgetValue: true });
  };
  render() {
    const { screenHeight, screenWidth } = this.state;
    const { isFetching, error, budget, payDay } = this.props;
    const isMinWidth = screenWidth <= 250 ? true : false;
    const isMinHeight = screenHeight < 480 ? true : false;

    const firstScreenText =
      "Правило 50/30/20 позволит Вам копить деньги и не отказывать себе в удовольствиях. ";

    const secondScreenText =
      "50% ежемесячного заработка должны уходить на все необходимые траты: аренду или ипотеку, транспорт, продукты, коммунальные услуги и прочие вещи, без которых никуда.";
    const thirdScreenText =
      "30% — на развлечения: шоппинг, рестораны, уход за собой и другое. ";
    const fourthScreenText =
      "20% должны уходить на накопления, выплату долгов, инвестиции.";
    const fivthScreen =
      "50/30/20 поможет распланировать личные денежные средства максимально рационально.";
    const params = {
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        modifierClass: "customized-swiper-pagination",
        bulletClass: "customized-swiper-pagination-bullet",
        bulletActiveClass: "customized-swiper-pagination-bullet-active"
      },
      containerClass: "customized-swiper-container"
    };
    const btnLogin = (
      <button
        onClick={() => this.props.signUp(this.props.params)}
        className={style.btn}
      >
        войти
      </button>
    );
    const enterCurrency = <div>currency</div>;
    console.log("--___---___--___>", budget);
    const enterBudget = (
      <div className={style.enterContainer}>
        <div className={style.enterTitle}>Введите Ваш текущий бюджет</div>
        <div className={style.inputBudget}>
          <Input
            inputMode="numeric"
            // placeholder={placeholder}
            type="text"
            onChange={this.onChangeBudget}
            // status={isErrorInput ? "error" : "default"}
            // bottom={bottomWarning}
          />
        </div>
        <div className={style.enterBudgetFooter}>
          <Button level={"commerce"} size={"xl"} onClick={this.step}>
            Далее
          </Button>
        </div>
      </div>
    );
    console.log("+++++++++++", budget, !payDay);
    const enterPayDay = <div className={style.enterContainer}>Payday</div>;
    return this.props.vk_id ? (
      <div className={style.entrance}>
        <CSSTransition
          in={this.state.isBudgetShown}
          timeout={300}
          classNames={"page"}
          unmountOnExit
        >
          {enterBudget}
        </CSSTransition>
        <CSSTransition
          in={this.state.isCalendarShown}
          timeout={300}
          classNames={"page"}
          unmountOnExit
        >
          {enterPayDay}
        </CSSTransition>
      </div>
    ) : (
      <div className={style.entrance}>
        <Swiper {...params}>
          <div className={style.item}>
            <EntranceItem
              isMinWidth={isMinWidth}
              isMinHeight={isMinHeight}
              image={"budget-logo"}
              title={"50/30/20"}
              text={firstScreenText}
              imgHeight="140px"
              imgWidth="140px"
            />
          </div>
          <div className={style.item}>
            <EntranceItem
              isMinWidth={isMinWidth}
              isMinHeight={isMinHeight}
              image={"payment-logo"}
              title={"ОБЯЗАТЕЛЬНЫЕ НУЖДЫ"}
              text={secondScreenText}
              bgText="50"
              imgHeight="170px"
              imgWidth="170px"
            />
          </div>
          <div className={style.item}>
            <EntranceItem
              isMinWidth={isMinWidth}
              isMinHeight={isMinHeight}
              image={"fun-logo"}
              title={"ЖЕЛАНИЯ"}
              text={thirdScreenText}
              bgText="30"
              imgHeight="190px"
              imgWidth="190px"
            />
          </div>
          <div className={style.item}>
            <EntranceItem
              isMinWidth={isMinWidth}
              isMinHeight={isMinHeight}
              image={"invest-logo"}
              title={"БУДУЩЕЕ"}
              text={fourthScreenText}
              bgText="20"
              imgHeight="190px"
              imgWidth="190px"
            />
          </div>
          <div className={style.item}>
            <EntranceItem
              error={error}
              isFetching={isFetching}
              isMinWidth={isMinWidth}
              isMinHeight={isMinHeight}
              image={"protect-logo"}
              title={""}
              text={fivthScreen}
              imgHeight="140px"
              imgWidth="140px"
              btnLogin={btnLogin}
            />
          </div>
        </Swiper>
      </div>
    );
  }
}

export { Entrance };
