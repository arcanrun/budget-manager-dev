//@flow
import * as React from "react";
import { useState, useEffect } from "react";

import {
  SWIPER_PARAMS,
  FIRST_SCREEN_TEXT,
  SECOND_SCREEN_TEXT,
  THIRD_SCREEN_TEXT,
  FOURTH_SCREEN_TEXT,
  FIVTH_SCREEN_TEXT
} from "./helpers";
import "./costumizedSwiper.css";
import { EntranceItem } from "../../../index";
import Swiper from "react-id-swiper";
import style from "./EntranceSwiper.module.css";
import { CSSTransition } from "react-transition-group";

type PROPS = {
  btnLogin: React.Node,
  error: boolean,
  isFetching: boolean,
  isVkId: boolean
};

export const EntranceSwiper = ({
  btnLogin,
  error,
  isFetching,
  isVkId
}: PROPS) => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [isMinHeight, setIsMinHeight] = useState(false);
  const [isMinWidth, setIsMinWidth] = useState(false);

  const setSize = (e: Object) => {
    const screenHeight = e.target.innerHeight;
    const screenWidth = e.target.innerWidth;
    setScreenHeight(screenHeight);
    setScreenWidth(screenWidth);

    setIsMinWidth(screenWidth <= 250);
    setIsMinHeight(screenHeight < 480);
  };

  useEffect(() => {
    window.addEventListener("resize", setSize);
  });

  return (
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
  );
};
