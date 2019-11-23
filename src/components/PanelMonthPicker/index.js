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
import { hideModal } from "../../actions";

type PROPS = {
  goTo: Function
};

export const PanelMonthPicker = ({ goTo }: PROPS) => {
  const dispatch = useDispatch();
  const typeModal = useSelector(state => state.modal.typeModal);
  const payload = useSelector(state => state.modal.payload);
  const onScrollChange = (values, index) => {
    console.log("onScrollChange", values, index);
  };
  const osname = platform();
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
      // locale={props.locale}
      maxDate={new Date(2030, 1, 1, 23, 59, 59)}
      minDate={new Date(2000, 1, 1, 0, 0, 0)}
      // onDateChange={this.onDateChange}
      // onValueChange={this.onValueChange}
      onScrollChange={onScrollChange}
    />
  );

  const submit = (
    <Button size="xl" level={"destructive"}>
      Очистить историю!
    </Button>
  );
  return (
    <>
      {header}
      {datePicker}
      {submit}
    </>
  );
};
