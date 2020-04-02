//@flow

import * as React from 'react';
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

import { CSSTransition } from "react-transition-group";

type PROPS = {
    modal: React.Node,
    isVkId: boolean,
    enterData: 

}

export const MainView = () => {
  <View activePanel={"main_panel"} modal={modal} id="mainPanel">
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
  </View>;
};
