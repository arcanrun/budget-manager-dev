//@flow

import React from "react";
import { Button } from "@vkontakte/vkui";

import style from "./WholeBudget.module.css";
import { RoundButton, ShortenNumber } from "../index";

type PROPS = {
  onClickToggleModal: Function,
  typeModal: string,
  wholeBudget: ?number,
  daysToPayday: ?string,
  isFetching: boolean
};
const WholeBudget = ({
  wholeBudget,
  onClickToggleModal,
  typeModal,
  daysToPayday,
  isFetching
}: PROPS) => {
  const footer = daysToPayday ? (
    <div className={style.footer}>
      <RoundButton
        text="plus"
        onClick={() => onClickToggleModal(`${typeModal}_plus`)}
      />
      <RoundButton
        text="minus"
        onClick={() => onClickToggleModal(`${typeModal}_minus`)}
      />
    </div>
  ) : (
    ""
  );
  const mainBlck = (
    <div className={style.budgetBlock}>
      {wholeBudget ? (
        <>
          <div className={[style.budget, "first-step"].join(" ")}>
            <ShortenNumber easterEggSize={"max"}>{wholeBudget}</ShortenNumber>
          </div>
          {footer}
        </>
      ) : (
        <div className={style.enter}>
          <div className={style.enterItem}>
            Для начала введите бюджет, которым обладаете на данный момент.
          </div>

          <Button
            size="xl"
            level="secondary"
            onClick={() => onClickToggleModal(typeModal)}
          >
            Введите ваш текущий бюджет
          </Button>
        </div>
      )}
    </div>
  );
  return <>{!isFetching ? mainBlck : ""}</>;
};

export { WholeBudget };
