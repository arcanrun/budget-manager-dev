//@flow
import React from "react";
import { Redirect } from "react-router-dom";

import style from "./Profile.module.css";
import { Card, Button, ModalOverlay } from "../index";

type PROPS = {
  makeProfileOperation: Function,
  toggleModal: Function,
  modalIsVisible: boolean,
  typeModal: string,
  vk_id: number,
  name: string,
  sure_name: string,
  avatar: string
};

const Profile = ({
  makeProfileOperation,
  toggleModal,
  vk_id,
  name,
  sure_name,
  avatar,
  modalIsVisible,
  typeModal
}: PROPS) => {
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
            c <b>12.12.2019</b> управляет своим бюджетом
          </div>
        </div>
      </div>
    </Card>
  );

  const statisticCard = (
    <Card icon={""} headerTitle={"статистика"}>
      <div>статистика</div>
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
          {commonSettingsCard}
          {statisticCard}
          {settingsCard}
          {!modalIsVisible || modalOverlay}
        </div>
      )}
    </>
  );
};

export { Profile };
