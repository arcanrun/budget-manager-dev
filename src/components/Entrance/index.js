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

// import "swiper/dist/css/swiper.css";
import style from "./Entrance.module.css";
import "./costumizedSwiper.css";
import { EntranceItem, Spinner } from "../index";
import {
  stringToDate,
  dateToString,
  addSuffix
} from "../Calendar/calendarHelper";

const WEEKDAYS_SHORT = {
  ru: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
};
const MONTHS = {
  ru: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
  ]
};

const WEEKDAYS_LONG = {
  ru: [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота"
  ]
};

const FIRST_DAY_OF_WEEK = {
  ru: 1
};
// Translate aria-labels
const LABELS = {
  ru: { nextMonth: "следующий месяц", previousMonth: "предыдущий месяц" }
};

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
    const currencies = [
      "AED",
      "AFN",
      "ALL",
      "AMD",
      "ANG",
      "AOA",
      "ARS",
      "AUD",
      "AWG",
      "AZN",
      "BAM",
      "BBD",
      "BDT",
      "BGN",
      "BHD",
      "BIF",
      "BMD",
      "BND",
      "BOB",
      "BRL",
      "BSD",
      "BTC",
      "BTN",
      "BWP",
      "BYR",
      "BYN",
      "BZD",
      "CAD",
      "CDF",
      "CHF",
      "CLP",
      "CNY",
      "COP",
      "CRC",
      "CUC",
      "CUP",
      "CVE",
      "CZK",
      "DJF",
      "DKK",
      "DOP",
      "DZD",
      "EEK",
      "EGP",
      "ERN",
      "ETB",
      "ETH",
      "EUR",
      "FJD",
      "FKP",
      "GBP",
      "GEL",
      "GGP",
      "GHC",
      "GHS",
      "GIP",
      "GMD",
      "GNF",
      "GTQ",
      "GYD",
      "HKD",
      "HNL",
      "HRK",
      "HTG",
      "HUF",
      "IDR",
      "ILS",
      "IMP",
      "INR",
      "IQD",
      "IRR",
      "ISK",
      "JEP",
      "JMD",
      "JOD",
      "JPY",
      "KES",
      "KGS",
      "KHR",
      "KMF",
      "KPW",
      "KRW",
      "KWD",
      "KYD",
      "KZT",
      "LAK",
      "LBP",
      "LKR",
      "LRD",
      "LSL",
      "LTC",
      "LTL",
      "LVL",
      "LYD",
      "MAD",
      "MDL",
      "MGA",
      "MKD",
      "MMK",
      "MNT",
      "MOP",
      "MRO",
      "MRU",
      "MUR",
      "MVR",
      "MWK",
      "MXN",
      "MYR",
      "MZN",
      "NAD",
      "NGN",
      "NIO",
      "NOK",
      "NPR",
      "NZD",
      "OMR",
      "PAB",
      "PEN",
      "PGK",
      "PHP",
      "PKR",
      "PLN",
      "PYG",
      "QAR",
      "RMB",
      "RON",
      "RSD",
      "RUB",
      "RWF",
      "SAR",
      "SBD",
      "SCR",
      "SDG",
      "SEK",
      "SGD",
      "SHP",
      "SLL",
      "SOS",
      "SRD",
      "SSP",
      "STD",
      "STN",
      "SVC",
      "SYP",
      "SZL",
      "THB",
      "TJS",
      "TMT",
      "TND",
      "TOP",
      "TRL",
      "TRY",
      "TTD",
      "TVD",
      "TWD",
      "TZS",
      "UAH",
      "UGX",
      "USD",
      "UYU",
      "UZS",
      "VEF",
      "VND",
      "VUV",
      "WST",
      "XAF",
      "XBT",
      "XCD",
      "XOF",
      "XPF",
      "YER",
      "ZAR",
      "ZWD"
    ];
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
    const isMinWidth = screenWidth <= 250 ? true : false;
    const isMinHeight = screenHeight < 480 ? true : false;

    let bottomWarning = errorExplain
      ? errorExplain
      : "Введите число, которое больше нуля";

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
    const modal = (
      <ModalRoot activeModal={this.state.modal}>
        <ModalPage
          id="calendar"
          onClose={this.onCloseModal}
          header={
            <ModalPageHeader
              left={
                IS_PLATFORM_ANDROID && (
                  <HeaderButton onClick={this.onCloseModal}>
                    <Icon24Cancel />
                  </HeaderButton>
                )
              }
              right={
                IS_PLATFORM_IOS && (
                  <HeaderButton onClick={this.onCloseModal}>
                    <Icon24Dismiss />
                  </HeaderButton>
                )
              }
            >
              Дата получения зарплаты
            </ModalPageHeader>
          }
        >
          <DayPicker
            locale={"ru"}
            months={MONTHS["ru"]}
            weekdaysLong={WEEKDAYS_LONG["ru"]}
            weekdaysShort={WEEKDAYS_SHORT["ru"]}
            firstDayOfWeek={FIRST_DAY_OF_WEEK["ru"]}
            labels={LABELS["ru"]}
            todayButton={"сегодня"}
            onTodayButtonClick={this.handleToDayBtn}
            onDayClick={this.handleDayClick}
            selectedDays={[stringToDate(this.state.selectedPayDay)]}
            disabledDays={[{ before: new Date() }]}
          />
        </ModalPage>
        <ModalPage
          id="currency"
          onClose={this.onCloseModal}
          header={
            <ModalPageHeader
              left={
                IS_PLATFORM_ANDROID && (
                  <HeaderButton onClick={this.onCloseModal}>
                    <Icon24Cancel />
                  </HeaderButton>
                )
              }
              right={
                IS_PLATFORM_IOS && (
                  <HeaderButton onClick={this.onCloseModal}>
                    <Icon24Dismiss />
                  </HeaderButton>
                )
              }
            >
              Валюта
            </ModalPageHeader>
          }
        >
          <FormLayout>
            <FormLayoutGroup onClick={this.handleCurrencyClick}>
              <List>
                {currencies.map((e, i) => {
                  return (
                    <Radio
                      key={i}
                      name="currency"
                      value={e}
                      defaultChecked={
                        this.state.selectedCurrency === e ? true : false
                      }
                    >
                      {e}
                    </Radio>
                  );
                })}
              </List>
            </FormLayoutGroup>
          </FormLayout>
        </ModalPage>
      </ModalRoot>
    );
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

    const mainView = (
      <View activePanel={"main_panel"} modal={modal} id="mainView">
        <Panel id="main_panel">
          <div className={style.entrance}>
            <CSSTransition
              in={isVkId}
              timeout={300}
              classNames={"zooming"}
              unmountOnExit
            >
              {enterData}
            </CSSTransition>

            <CSSTransition
              in={!isVkId}
              timeout={300}
              classNames={"zooming"}
              unmountOnExit
            >
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
            </CSSTransition>
          </div>
        </Panel>
      </View>
    );
    const calendarView = (
      <View activePanel={"mainPanel"} id="calendarView">
        <Panel
          id="mainPanel"
          left={
            <PanelHeaderClose
              onClick={() => this.setState({ activeView: "mainView" })}
            />
          }
        >
          <PanelHeader
            addon={
              <HeaderButton
                onClick={() => this.setState({ activeView: "mainView" })}
              >
                Назад
              </HeaderButton>
            }
            left={
              <HeaderButton
                onClick={() => this.setState({ activeView: "mainView" })}
              >
                {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
              </HeaderButton>
            }
          >
            Календарь
          </PanelHeader>
          <DayPicker
            locale={"ru"}
            months={MONTHS["ru"]}
            weekdaysLong={WEEKDAYS_LONG["ru"]}
            weekdaysShort={WEEKDAYS_SHORT["ru"]}
            firstDayOfWeek={FIRST_DAY_OF_WEEK["ru"]}
            labels={LABELS["ru"]}
            todayButton={"сегодня"}
            onTodayButtonClick={this.handleToDayBtn}
            onDayClick={this.handleDayClick}
            selectedDays={[stringToDate(this.state.selectedPayDay)]}
            disabledDays={[{ before: new Date() }]}
          />
        </Panel>
      </View>
    );
    const currencyView = (
      <View activePanel="mainPanel" id="currencyView">
        <Panel id="mainPanel">
          <PanelHeader
            addon={
              <HeaderButton
                onClick={() => this.setState({ activeView: "mainView" })}
              >
                Назад
              </HeaderButton>
            }
            left={
              <HeaderButton
                onClick={() => this.setState({ activeView: "mainView" })}
              >
                {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
              </HeaderButton>
            }
          >
            Валюта
          </PanelHeader>

          <FormLayoutGroup onClick={this.handleCurrencyClick}>
            <List>
              {currencies.map((e, i) => {
                return (
                  <Radio
                    key={i}
                    name="currency"
                    value={e}
                    defaultChecked={
                      this.state.selectedCurrency === e ? true : false
                    }
                  >
                    {e}
                  </Radio>
                );
              })}
            </List>
          </FormLayoutGroup>
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
