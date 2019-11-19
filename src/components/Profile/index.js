//@flow
import React from "react";
import { Redirect } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Button, Avatar, Cell, Group } from "@vkontakte/vkui";

import style from "./Profile.module.css";
import { Card, ModalOverlay, Overlay, Tab } from "../index";
import "./animations.css";
import { stringToDate } from "../../helpers/datetime";

type PROPS = {
  makeProfileOperation: Function,
  toggleModal: Function,
  getStatistics: Function,
  getHistoryShort: Function,
  history: Array<any>,
  toDayFormated: string,
  modalIsVisible: boolean,
  typeModal: string,
  isFetching: boolean,
  name: string,
  sure_name: string,
  avatar: string,
  vk_id: number,
  registerDate: number,
  costs: Object,
  income: Object,
  calc: Object,
  params: string
};

type STATE = {
  in: boolean
};

class Profile extends React.Component<PROPS, STATE> {
  state = {
    in: false
  };
  componentDidMount() {
    const { params } = this.props;

    this.props.getStatistics(params);
    this.props.getHistoryShort(params);
    this.toggleAnimation();
  }

  toggleAnimation = () => {
    this.setState({ in: !this.state.in });
  };
  render() {
    const {
      toggleModal,
      vk_id,
      name,
      sure_name,
      avatar,
      isFetching,
      costs,
      income,
      registerDate,
      history
    } = this.props;
    // const overlay = <Overlay isTransparent={true} />;
    // const showPreloader = isFetching ? overlay : "";
    const commonSettingsCard = (
      <Card icon={"profile"} headerTitle="Общая информация">
        <div className={style.user}>
          <div className={style.avatarContainer}>
            <Avatar src={avatar} size={80} />
          </div>
          <div className={style.footerUser}>
            <div className={style.fullName}>
              <span>{name} </span>
              <span> {sure_name}</span>
            </div>
            <div className={style.subFooter}>
              c <b>{stringToDate(registerDate)}</b> управляет своим бюджетом
            </div>
          </div>
        </div>
      </Card>
    );

    const statisticCard = (
      <Card icon={"pie-chart-logo"} headerTitle={"статистика за текущий месяц"}>
        <div>
          <Tab costs={costs} income={income} history={history} />
        </div>
      </Card>
    );

    return (
      <>
        {!vk_id ? (
          <Redirect to="/" />
        ) : (
          <>
            <Overlay isTransparent={true} isFetching={isFetching} />

            <CSSTransition in={this.state.in} timeout={300} classNames={"page"}>
              <div className={style.profile}>
                {commonSettingsCard}
                {statisticCard}
              </div>
            </CSSTransition>
          </>
        )}
      </>
    );
  }
}

export { Profile };
