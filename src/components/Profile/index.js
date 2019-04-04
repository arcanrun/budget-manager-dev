//@flow
import React from "react";

import style from "./Profile.module.css";
import { Card } from "../index";

type PROPS = {
  vk_id: number,
  name: string,
  sure_name: string,
  avatar: string
};

const Profile = ({ vk_id, name, sure_name, avatar }: PROPS) => {
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
  const settingsCard = (
    <Card icon={"settings"} headerTitle="настройки">
      <div />
    </Card>
  );
  return (
    <div className={style.profile}>
      {commonSettingsCard}
      {settingsCard}
    </div>
  );
};

export { Profile };
