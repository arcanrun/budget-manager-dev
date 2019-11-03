//@flow
import React from "react";
import {
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  HeaderButton
} from "@vkontakte/vkui";
import { IS_PLATFORM_IOS, IS_PLATFORM_ANDROID } from "@vkontakte/vkui";
import Icon24Cancel from "@vkontakte/icons/dist/24/cancel";
import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss";

import style from "./ModalHistory.module.css";

type PROPS = {
  typeModal: string,
  payload: string,
  hideModal: Function
};

export const ModalHistory = ({ typeModal, payload, hideModal }: PROPS) => {
  const header = (
    <ModalPageHeader
      left={
        IS_PLATFORM_ANDROID && (
          <HeaderButton onClick={() => hideModal()}>
            <Icon24Cancel />
          </HeaderButton>
        )
      }
      right={
        IS_PLATFORM_IOS && (
          <HeaderButton onClick={() => hideModal()}>
            <Icon24Dismiss />
          </HeaderButton>
        )
      }
    >
      Комментарий
    </ModalPageHeader>
  );
  return (
    <ModalRoot activeModal={typeModal}>
      <ModalPage
        id={"history_comment"}
        header={header}
        onClose={() => hideModal()}
      >
        <div className={style.commentBody}>{payload}</div>
      </ModalPage>
    </ModalRoot>
  );
};
