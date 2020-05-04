//@flow
import React from "react";

import {
    View,
    Panel,
    Root,
    PanelHeaderClose,
} from "@vkontakte/vkui";
import {EntranceForm} from "./SubComponents/EntranceForm/index";
import {CalendarView} from "./SubComponents/CalendarView/index";
import {CurrencyView} from "./SubComponents/CurrencyView/index";
import {EntranceSwiper} from "./SubComponents/EntranceSwiper/index";

import style from "./Entrance.module.css";


import {
    dateToString,
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
    errorExplain: ?string,
    isErrorInput: boolean,
    inputValue: ?string,
    activeView: string
};


class Entrance extends React.Component<PROPS, STATE> {
    state = {
        screenHeight: window.innerHeight,
        screenWidth: window.innerWidth,
        isVkId: false,
        selectedPayDay: undefined,
        selectedCurrency: undefined,
        inputValue: undefined,
        beautifyPayDay: undefined,
        errorExplain: undefined,
        isErrorInput: false,
        activeView: "mainView"
    };

    componentDidMount() {
        window.addEventListener("resize", this.setSize);
        const {vk_id, budget} = this.props;
        // if (this.props.budget) {
        //   this.setState({ isBudgetShown: false, isCalendarShown: true });
        // }

        if (vk_id) {
            this.setState({isVkId: true});
        }
    }

    componentDidUpdate(prevProps: Object) {
        // if (this.props.budget !== prevProps.budget) {
        //   this.setState({ isBudgetShown: false, isCalendarShown: true });
        // }
        if (prevProps.vk_id !== this.props.vk_id) {
            this.setState({isVkId: true});
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

    goTo = (dest: string) => {
        this.setState({activeView: dest})
    }
    handleToDayBtn = () => {
        const toDay = new Date();
        this.setState({
            selectedPayDay: toDay,
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

                beautifyPayDay: dateToString(day),
                activeView: "mainView"
            });
        }
    };

    handleCurrencyClick = (e: Object) => {
        const {value} = e.target;
        this.setState({selectedCurrency: value, activeView: "mainView"});
    };


    render() {
        const {
            isVkId,
            selectedPayDay,
            selectedCurrency,
            beautifyPayDay
        } = this.state;
        const {isFetching, error,  sendEnterData} = this.props;


        const btnLogin = (
            <button
                onClick={() => this.props.signUp(this.props.params)}
                className={style.btn}
            >
                войти
            </button>
        );

        const currencyView = (
            <View activePanel="mainPanel" id="currencyView">
                <Panel id="mainPanel">
                    <CurrencyView
                        goBack={() => this.setState({activeView: "mainView"})}
                        handleCurrencyClick={this.handleCurrencyClick}
                        selectedCurrency={selectedCurrency}
                    />
                </Panel>
            </View>
        );

        const mainView = (
            <View activePanel="main_panel" id="mainView">
                <Panel id="main_panel">
                    <div className={style.entrance}>
                        <EntranceForm
                            isVkId={isVkId}
                            selectedPayDay={selectedPayDay}
                            selectedCurrency={selectedCurrency} isFetching={isFetching} sendEnterData={sendEnterData}
                            beautifyPayDay={beautifyPayDay} goTo={this.goTo}/>

                        <EntranceSwiper
                            btnLogin={btnLogin}
                            error={error}
                            isFetching={isFetching}
                            isVkId={isVkId}
                        />
                    </div>
                </Panel>
            </View>
        );
        const calendarView = (
            <View activePanel="mainPanel" id="calendarView">
                <Panel
                    id="mainPanel"
                    left={
                        <PanelHeaderClose
                            onClick={() => this.setState({activeView: "mainView"})}
                        />
                    }
                >
                    <CalendarView
                        onTodayButtonClick={this.handleToDayBtn}
                        onDayClick={this.handleDayClick}
                        goBack={() => this.setState({activeView: "mainView"})}
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

export {Entrance};
