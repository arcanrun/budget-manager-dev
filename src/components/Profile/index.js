//@flow
import React from "react";
import { Redirect } from "react-router-dom";

import style from "./Profile.module.css";
import { Card, Button, ModalOverlay, Overlay, Tab } from "../index";

type PROPS = {
  makeProfileOperation: Function,
  toggleModal: Function,
  getStatistics: Function,
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
  income: Object
};

class Profile extends React.Component<PROPS, {}> {
  componentDidMount() {
    const { vk_id, toDayFormated } = this.props;

    this.props.getStatistics(vk_id, toDayFormated);
  }
  render() {
    const {
      makeProfileOperation,
      toggleModal,
      vk_id,
      name,
      sure_name,
      avatar,
      modalIsVisible,
      typeModal,
      isFetching,
      costs,
      income,
      registerDate
    } = this.props;
    const overlay = <Overlay isTransparent={true} />;
    const showPreloader = isFetching ? overlay : "";
    const commonSettingsCard = (
      <Card icon={"profile"} headerTitle="Общая информация">
        <div className={style.user}>
          <div className={style.avatarContainer}>
            <img className={style.avatar} src={avatar} alt="avatar" />
          </div>
          <div className={style.footerUser}>
            <div className={style.fullName}>
              <span>{name} </span>
              <span> {sure_name}</span>
            </div>
            <div className={style.subFooter}>
              c <b>{registerDate}</b> управляет своим бюджетом
            </div>
          </div>
        </div>
      </Card>
    );

    const statisticCard = (
      <Card icon={"pie-chart-logo"} headerTitle={"статистика за текущий месяц"}>
        <div>
          <Tab costs={costs} income={income} />
        </div>
      </Card>
    );
    const settingsCard = (
      <Card icon={"settings"} headerTitle="настройки">
        <Button
          text={"удалить профиль"}
          btnColor={"#F72D6B"}
          size={"L"}
          onClick={() => toggleModal("profile_delete")}
        />
      </Card>
    );
    const modalOverlay = (
      <ModalOverlay
        onClick={toggleModal}
        typeModal={typeModal}
        vk_id={vk_id}
        budget={0}
        makeProfileOperation={makeProfileOperation}
        calcTempCosts={""}
        addPayDay={""}
        addWholeBudget={""}
        daysToPayday={""}
      />
    );
    return (
      <>
        {!vk_id ? (
          <Redirect to="/" />
        ) : (
          <div className={style.profile}>
            {showPreloader}
            {commonSettingsCard}
            {statisticCard}
            {settingsCard}
            {!modalIsVisible || modalOverlay}
          </div>
        )}
      </>
    );
  }
}

export { Profile };
