//@flow
import React from "react";
import { Redirect } from "react-router-dom";
import Swiper from "react-id-swiper";
import {
  Input,
  Button,
  View,
  Panel,
  SelectMimicry,
  ModalPage,
  ModalRoot,
  ModalPageHeader,
  HeaderButton,
  FormLayout,
  FormLayoutGroup,
  Radio,
  List,
  Root,
  PanelHeader,
  PanelHeaderButton,
  PanelHeaderClose,
  IOS,
  platform
} from "@vkontakte/vkui";
import { CSSTransition } from "react-transition-group";
import { IS_PLATFORM_IOS, IS_PLATFORM_ANDROID } from "@vkontakte/vkui";
import Icon24Cancel from "@vkontakte/icons/dist/24/cancel";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Done from "@vkontakte/icons/dist/24/done";
import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss";
import Icon24BrowserBack from "@vkontakte/icons/dist/24/browser_back";
import DayPicker from "react-day-picker";
import { MainView } from "./SubComponents/MainView/index";
import { CalendarView } from "./SubComponents/CalendarView/index";
import { CurrencyView } from "./SubComponents/CurrencyView/index";
// import "swiper/dist/css/swiper.css";
import style from "./Entrance.module.css";

import { EntranceItem, Spinner } from "../index";
import {
  stringToDate,
  dateToString,
  addSuffix
} from "../Calendar/calendarHelper";

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
  payDay: string,
  sendEnterData: Function
};

type STATE = {
  screenHeight: ?number,
  screenWidth: ?number,
  isVkId: boolean,
  selectedPayDay: ?string,
  selectedCurrency: ?string,
  beautifyPayDay: ?string,
  modal: ?string,
  errorExplain: ?string,
  isErrorInput: boolean,
  inputValue: ?string,
  activeView: string
};
const osname = platform();
class Entrance extends React.Component<PROPS, STATE> {
  state = {
    screenHeight: window.innerHeight,
    screenWidth: window.innerWidth,
    isVkId: false,
    selectedPayDay: undefined,
    selectedCurrency: undefined,
    inputValue: undefined,
    beautifyPayDay: undefined,
    modal: null,
    errorExplain: undefined,
    isErrorInput: false,
    activeView: "mainView"
  };

  componentDidMount() {
    window.addEventListener("resize", this.setSize);
    const { vk_id, budget } = this.props;
    // if (this.props.budget) {
    //   this.setState({ isBudgetShown: false, isCalendarShown: true });
    // }

    if (vk_id) {
      this.setState({ isVkId: true });
    }
  }
  componentDidUpdate(prevProps: Object) {
    // if (this.props.budget !== prevProps.budget) {
    //   this.setState({ isBudgetShown: false, isCalendarShown: true });
    // }
    if (prevProps.vk_id !== this.props.vk_id) {
      this.setState({ isVkId: true });
    }
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
  onCloseModal = () => {
    this.setState({ modal: null });
  };
  handleToDayBtn = () => {
    const toDay = new Date();
    this.setState({
      selectedPayDay: toDay,
      modal: null,
      beautifyPayDay: dateToString(toDay),
      activeView: "mainView"
    });
  };
  handleDayClick = (day: any) => {
    let toDay = new Date();
    toDay = Date.parse(toDay.toDateString());
    const selectedDay = Date.parse(day.toDateString());

    if (selectedDay >= toDay) {
      this.setState({
        selectedPayDay: day,
        modal: null,
        beautifyPayDay: dateToString(day),
        activeView: "mainView"
      });
    }
  };

  handleCurrencyClick = (e: Object) => {
    const { value } = e.target;
    this.setState({ selectedCurrency: value, activeView: "mainView" });
  };
  onChange = (e: Object) => {
    const { value } = e.currentTarget;
    this.isVaild(value);
  };
  isVaild = (value: ?string) => {
    const valToNumber = +value;
    const valToStr = "" + value;
    if (valToNumber <= 0) {
      this.setState({
        isErrorInput: true,
        inputValue: valToStr,
        errorExplain: "Недопустимый символ"
      });
      return false;
    } else if (isNaN(value)) {
      this.setState({
        isErrorInput: true,
        inputValue: valToStr,
        errorExplain: "Недопустимый символ"
      });
      return false;
    } else if (valToNumber === undefined) {
      this.setState({
        isErrorInput: true,
        inputValue: valToStr,
        errorExplain: "Недопустимый символ"
      });
      return false;
    } else if (valToStr.includes("e")) {
      this.setState({
        isErrorInput: true,
        inputValue: valToStr,
        errorExplain: "Недопустимый символ"
      });
      return false;
    } else if (valToNumber >= 999e9) {
      this.setState({
        isErrorInput: true,
        inputValue: valToStr,
        errorExplain: "Слишком большое число"
      });
      return false;
    } else if (value[0] === ".") {
      this.setState({
        isErrorInput: true,
        inputValue: valToStr,
        errorExplain: "Недопустимый символ"
      });
      return false;
    } else if (valToNumber < 0.01) {
      this.setState({
        isErrorInput: true,
        inputValue: valToStr,
        errorExplain: "Слишком маленькое число"
      });
      return false;
    }
    this.setState({
      isErrorInput: false,
      errorExplain: undefined,
      inputValue: valToStr
    });
    return true;
  };
  render() {
    const {
      screenHeight,
      screenWidth,
      isVkId,
      errorExplain,
      isErrorInput,
      selectedPayDay,
      selectedCurrency,
      inputValue
    } = this.state;
    const { isFetching, error, budget, payDay, sendEnterData } = this.props;

    let bottomWarning = errorExplain
      ? errorExplain
      : "Введите число, которое больше нуля";

    const btnLogin = (
      <button
        onClick={() => this.props.signUp(this.props.params)}
        className={style.btn}
      >
        войти
      </button>
    );
    const enterData = (
      <div className={style.enterContainer}>
        <div className={style.enterTitle}>
          Чтобы продолжить, введите необходимые данные
        </div>
        <div className={style.enterCard}>
          <div className={style.enterDataItem}>
            <FormLayout>
              <SelectMimicry
                top="Выберите валюту"
                placeholder="Не выбрана"
                onClick={() => this.setState({ activeView: "currencyView" })}
              >
                {this.state.selectedCurrency}
              </SelectMimicry>
            </FormLayout>
          </div>
          <div className={style.enterDataItem}>
            <FormLayout>
              <Input
                top="Введите Ваш текущий бюджет"
                inputMode="numeric"
                placeholder="0000.0"
                type="text"
                onChange={this.onChange}
                status={isErrorInput ? "error" : "default"}
                bottom={bottomWarning}
              />
            </FormLayout>
          </div>
          <div className={style.enterDataItem}>
            <FormLayout>
              <SelectMimicry
                top="Выберите дату получения зарплаты"
                placeholder="Не выбрана"
                onClick={() => this.setState({ activeView: "calendarView" })}
              >
                {this.state.beautifyPayDay}
              </SelectMimicry>
            </FormLayout>
          </div>
          <CSSTransition
            in={
              !isErrorInput &&
              !!selectedPayDay &&
              !!selectedCurrency &&
              !!inputValue &&
              !isFetching
            }
            timeout={300}
            classNames={"zooming"}
            unmountOnExit
          >
            <div className={style.enterFooter}>
              <FormLayout>
                <Button
                  level={"destructive"}
                  size={"xl"}
                  onClick={() =>
                    sendEnterData(selectedCurrency, inputValue, selectedPayDay)
                  }
                >
                  Далее
                </Button>
              </FormLayout>
            </div>
          </CSSTransition>
          <CSSTransition
            in={isFetching}
            timeout={300}
            classNames={"zooming"}
            unmountOnExit
          >
            <div className={style.enterFooter}>
              <Spinner size={"m"} />
            </div>
          </CSSTransition>
        </div>
      </div>
    );

    const currencyView = (
      <View activePanel="mainPanel" id="currencyView">
        <Panel id="mainPanel">
          <CurrencyView
            goBack={() => this.setState({ activeView: "mainView" })}
            handleCurrencyClick={this.handleCurrencyClick}
            selectedCurrency={this.state.selectedCurrency}
          />
        </Panel>
      </View>
    );

    const mainView = (
      <View activePanel="main_panel" id="mainView">
        <Panel id="main_panel">
          <MainView
            signUp={this.props.signUp}
            enterData={enterData}
            isVkId={isVkId}
            btnLogin={btnLogin}
            error={error}
            isFetching={isFetching}
          />
        </Panel>
      </View>
    );
    const calendarView = (
      <View activePanel="mainPanel" id="calendarView">
        <Panel
          id="mainPanel"
          left={
            <PanelHeaderClose
              onClick={() => this.setState({ activeView: "mainView" })}
            />
          }
        >
          <CalendarView
            onTodayButtonClick={this.handleToDayBtn}
            onDayClick={this.handleDayClick}
            goBack={() => this.setState({ activeView: "mainView" })}
            selectedPayDay={this.state.selectedPayDay}
          />
        </Panel>
      </View>
    );

    return (
      <Root activeView={this.state.activeView}>
        {mainView}
        {calendarView}
        {currencyView}
      </Root>
    );
  }
}

export { Entrance };
