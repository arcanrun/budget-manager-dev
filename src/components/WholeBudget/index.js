//@flow

import React from "react";

import style from "./WholeBudget.module.css";
import { Button, RoundButton, ShortenNumber } from "../index";

type PROPS = {
  onClickToggleModal: Function,
  typeModal: string,
  wholeBudget: ?number,
  daysToPayday: ?string
};
const WholeBudget = ({
  wholeBudget,
  onClickToggleModal,
  typeModal,
  daysToPayday
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
  return (
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
            btnColor="red"
            onClick={() => onClickToggleModal(typeModal)}
            text="Введите ваш текущий бюджет"
          />
        </div>
      )}
    </div>
  );
};

export { WholeBudget };
