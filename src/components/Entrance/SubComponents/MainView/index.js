//@flow

import * as React from "react";
import { useState, useEffect } from "react";
import { View, Panel } from "@vkontakte/vkui";

import Swiper from "react-id-swiper";
import { CSSTransition } from "react-transition-group";
import { EntranceItem } from "../../../index";
import style from "./MainView.module.css";
import "./costumizedSwiper.css";
import {
  SWIPER_PARAMS,
  FIRST_SCREEN_TEXT,
  SECOND_SCREEN_TEXT,
  THIRD_SCREEN_TEXT,
  FOURTH_SCREEN_TEXT,
  FIVTH_SCREEN_TEXT
} from "./helpers";

type PROPS = {
  isVkId: boolean,
  enterData: React.Element<"div">,
  signUp: () => void,
  btnLogin: React.Node,
  error: boolean,
  isFetching: boolean
};

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
    <>
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
          <Swiper {...SWIPER_PARAMS}>
            <div className={style.item}>
              <EntranceItem
                isMinWidth={isMinWidth}
                isMinHeight={isMinHeight}
                image={"budget-logo"}
                title={"50/30/20"}
                text={FIRST_SCREEN_TEXT}
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
                text={SECOND_SCREEN_TEXT}
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
                text={THIRD_SCREEN_TEXT}
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
                text={FOURTH_SCREEN_TEXT}
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
                text={FIVTH_SCREEN_TEXT}
                imgHeight="140px"
                imgWidth="140px"
                btnLogin={btnLogin}
              />
            </div>
          </Swiper>
        </CSSTransition>
      </div>
    </>
  );
};
