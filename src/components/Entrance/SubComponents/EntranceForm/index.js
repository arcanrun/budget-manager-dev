//@flow

import * as React from "react";
import {useState} from "react";
import {FormLayout, SelectMimicry, Input, Button} from "@vkontakte/vkui";

import {CSSTransition} from "react-transition-group";
import style from "./EntranceForm.module.css";
import {Spinner} from "../../../index";

type PROPS = {
    isVkId: boolean,
    selectedPayDay: ?string,
    selectedCurrency: ?string,
    isFetching: boolean,
    sendEnterData: ()=>void,
    goTo: ()=>void,
    beautifyPayDay: ?string,

};

export const EntranceForm = ({isVkId, selectedPayDay, selectedCurrency, isFetching, sendEnterData, goTo, beautifyPayDay}: PROPS) => {
    const [isErrorInput, setIsErrorInput] = useState(false);
    const [inputValue, setInputValue] = useState(undefined);
    const [errorExplain, setErrorExplain] = useState(undefined);
    let bottomWarning = errorExplain
        ? errorExplain
        : "Введите число, которое больше нуля";
    const onChange = (e: Object) => {
        const {value} = e.currentTarget;
        isValid(value);
    };
    const isValid = (value: ?string) => {
        const valToNumber = +value;
        const valToStr = "" + value;
        if (valToNumber <= 0 || isNaN(value) || valToNumber === undefined || valToStr.includes("e") || value[0] === ".") {
            setIsErrorInput(true);
            setInputValue(valToStr);
            setErrorExplain("Недопустимый символ");
            return false;
        } else if (valToNumber >= 999e9) {
            setIsErrorInput(true);
            setInputValue(valToStr);
            setErrorExplain("Слишком большое число");
            return false;
        } else if (valToNumber < 0.01) {
            setIsErrorInput(true);
            setInputValue(valToStr);
            setErrorExplain("Слишком маленькое число");
            return false;
        }
        setIsErrorInput(false);
        setErrorExplain(undefined);
        setInputValue(valToStr);
        return true;
    };

    return (
        <>
            <CSSTransition
                in={isVkId}
                timeout={300}
                classNames={"zooming"}
                unmountOnExit
            >
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
                                    onClick={() => goTo("currencyView")}
                                >
                                    {selectedCurrency}
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
                                    onChange={onChange}
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
                                    onClick={() => goTo("calendarView")}
                                >
                                    {beautifyPayDay}
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
                                            sendEnterData(
                                                selectedCurrency,
                                                inputValue,
                                                selectedPayDay
                                            )
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
                                <Spinner size={"m"}/>
                            </div>
                        </CSSTransition>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
};
