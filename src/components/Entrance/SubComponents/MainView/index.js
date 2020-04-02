//@flow

import * as React from "react";
import { useState, useEffect } from "react";
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
  List
} from "@vkontakte/vkui";
import Swiper from "react-id-swiper";
import { CSSTransition } from "react-transition-group";
import { EntranceItem, Spinner } from "../../../index";
import style from "./MainView.module.css";

type PROPS = {
  isVkId: boolean,
  enterData: React.Node,
  signUp: Funciton,
  btnLogin: React.Node,
  error: boolean,
  isFetching: boolean
};
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

export const MainView = ({
  isVkId,
  modal,
  enterData,
  btnLogin,
  error,
  isFetching
}: PROPS) => {
  const [screenHeight, setScreenHieght] = useState(window.innerHeight);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [isMinHeight, setIsMinHeight] = useState(false);
  const [isMinWidth, setIsMinWidth] = useState(false);

  const setSize = (e: Object) => {
    const screenHeight = e.target.innerHeight;
    const screenWidth = e.target.innerWidth;
    setScreenHieght(screenHeight);
    setScreenWidth(screenWidth);

    setIsMinWidth(screenWidth <= 250 ? true : false);
    setIsMinHeight(screenHeight < 480 ? true : false);
  };

  useEffect(() => {
    window.addEventListener("resize", setSize);
  });

  return (
    <View activePanel={"main_panel"} id="mainView">
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
};
