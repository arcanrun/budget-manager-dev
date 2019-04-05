//@flow
import React from "react";
import { Redirect } from "react-router-dom";
import Swiper from "react-id-swiper/lib/ReactIdSwiper.full";

import "swiper/dist/css/swiper.css";
import style from "./Entrance.module.css";
import "./costumizedSwiper.css";

type PROPS = {
  logIn: Function,
  vk_id: ?number
};

class Entrance extends React.Component<PROPS, {}> {
  render() {
    console.log(this.props);
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
    return this.props.vk_id ? (
      <Redirect to="/" />
    ) : (
      <div className={style.entrance}>
        <Swiper {...params}>
          <div className={style.test}>1</div>
          <div className={style.test}>2</div>
          <div className={style.test}>3</div>
          <div className={style.test}>4</div>
          <div className={style.test}>5</div>
          <div className={style.test}>
            <button onClick={() => this.props.logIn(123456)}>войти</button>
          </div>
        </Swiper>
      </div>
    );
  }
}

export { Entrance };
