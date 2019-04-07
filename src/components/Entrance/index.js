//@flow
import React from "react";
import { Redirect } from "react-router-dom";
import Swiper from "react-id-swiper/lib/ReactIdSwiper.full";

import "swiper/dist/css/swiper.css";
import style from "./Entrance.module.css";
import "./costumizedSwiper.css";
import { EntranceItem } from "../index";

type PROPS = {
  signUp: Function,
  vk_id: ?number
};

class Entrance extends React.Component<PROPS, {}> {
  render() {
    const firstScreenText =
      "Проверьте свой бюджет по умной пропорциональный системе учета финансов. Правило 50/30/20 позволит вам копить деньги и не отказывать себе в удовольствиях. ";

    const secondScreenText =
      "50 % вашего ежемесячного заработка должны уходить на все необходимые траты: аренду или ипотеку, транспорт, продукты, коммунальные услуги и прочие вещи, без которых никуда";
    const thirdScreenText =
      "30 % — на развлечения: шоппинг, рестораны, уход за собой и другое. ";
    const fourthScreenText =
      "20 % должны уходить на накопления, выплату долгов, инвестиции";
    const fivthScreen =
      "50/30/20 поможет распланировать личные денежные средства максимально рационально";
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
      <button onClick={this.props.signUp} className={style.btn}>
        войти
      </button>
    );
    return this.props.vk_id ? (
      <Redirect to="/budget-manager" />
    ) : (
      <div className={style.entrance}>
        <Swiper {...params}>
          <div className={style.item}>
            <EntranceItem
              image={"budget-logo"}
              title={"50/30/20"}
              text={firstScreenText}
              imgHeight="140px"
              imgWidth="140px"
            />
          </div>
          <div className={style.item}>
            <EntranceItem
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
              image={"protect-logo"}
              title={""}
              text={fivthScreen}
              imgHeight="140px"
              imgWidth="140px"
            />
            {btnLogin}
          </div>
        </Swiper>
      </div>
    );
  }
}

export { Entrance };
