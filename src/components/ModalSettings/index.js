//@flow
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  HeaderButton,
  Button,
  Div
} from "@vkontakte/vkui";
import { IS_PLATFORM_IOS, IS_PLATFORM_ANDROID } from "@vkontakte/vkui";
import Icon24Cancel from "@vkontakte/icons/dist/24/cancel";
import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss";
import DatePicker from "rmc-date-picker";
import "./style.css";

import style from "./ModalSettings.module.css";
import { hideModal } from "../../actions";

export const ModalSettings = () => {
  const dispatch = useDispatch();
  const typeModal = useSelector(state => state.modal.typeModal);
  const payload = useSelector(state => state.modal.payload);
  const onScrollChange = (values, index) => {
    console.log("onScrollChange", values, index);
  };
  const header = (
    <ModalPageHeader
      left={
        IS_PLATFORM_ANDROID && (
          <HeaderButton onClick={() => dispatch(hideModal())}>
            <Icon24Cancel />
          </HeaderButton>
        )
      }
      right={
        IS_PLATFORM_IOS && (
          <HeaderButton onClick={() => dispatch(hideModal())}>
            <Icon24Dismiss />
          </HeaderButton>
        )
      }
    >
      Месяц
    </ModalPageHeader>
  );
  return (
    <ModalRoot activeModal={typeModal}>
      <ModalPage
        id={"month_picker"}
        header={header}
        onClose={() => dispatch(hideModal())}
      >
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
        <Div>
          <Button
            level="commerce"
            size="xl"
            onClick={() => console.log("unreazlied")}
          >
            Готово
          </Button>
        </Div>
      </ModalPage>
    </ModalRoot>
  );
};
