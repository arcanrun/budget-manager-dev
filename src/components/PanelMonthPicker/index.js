//@flow
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  PanelHeader,
  HeaderButton,
  Button,
  Div,
  platform,
  IOS
} from "@vkontakte/vkui";
import { IS_PLATFORM_IOS, IS_PLATFORM_ANDROID } from "@vkontakte/vkui";
import Icon24Cancel from "@vkontakte/icons/dist/24/cancel";
import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import DatePicker from "rmc-date-picker";

import "./style.css";
import style from "./ModalSettings.module.css";
import { Card } from "../index";

type PROPS = {
  goTo: Function,
  openAlert: Function
};

export const PanelMonthPicker = ({ goTo, openAlert }: PROPS) => {
  const [pickedDate, setPickedDate] = useState(new Date());
  const dispatch = useDispatch();
  const typeModal = useSelector(state => state.modal.typeModal);
  const payload = useSelector(state => state.modal.payload);
  const osname = platform();

  const onScrollChange = (values, index) => {
    setPickedDate(values);
  };

  const header = (
    <PanelHeader
      addon={
        <HeaderButton onClick={() => goTo("main_panel")}>Назад</HeaderButton>
      }
      left={
        <HeaderButton onClick={() => goTo("main_panel")}>
          {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
        </HeaderButton>
      }
    >
      Дата
    </PanelHeader>
  );
  const datePicker = (
    <DatePicker
      rootNativeProps={{ "data-xx": "yy" }}
      mode={"month"}
      defaultDate={pickedDate}
      maxDate={new Date(2030, 1, 1, 23, 59, 59)}
      minDate={new Date(2000, 1, 1, 0, 0, 0)}
      // onDateChange={this.onDateChange}
      // onValueChange={this.onValueChange}
      onScrollChange={onScrollChange}
    />
  );

  const submit = (
    <Button
      size="xl"
      level={"destructive"}
      onClick={() => openAlert("history_delete_month", pickedDate)}
    >
      Очистить историю
    </Button>
  );
  return (
    <div className={style.container}>
      <Card>
        {header}
        {datePicker}
        <div className={style.footer}>{submit}</div>
      </Card>
    </div>
  );
};
