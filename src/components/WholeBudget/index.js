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
  isFetching: boolean,
  isEnterBudget?: boolean
};
const WholeBudget = ({
  wholeBudget,
  onClickToggleModal,
  typeModal,
  daysToPayday,
  isFetching,
  isEnterBudget
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
  const loadingBlck = (
    <>
      <div className={style.budgetLoadingBlock}>
        <div className={[style.budget, "first-step"].join(" ")}>....</div>
      </div>
      {footer}
    </>
  );
  const mainBlck = (
    <div className={style.budgetBlock}>
      <div className={[style.budget, "first-step"].join(" ")}>
        <ShortenNumber easterEggSize={"max"} size={22}>
          {wholeBudget}
        </ShortenNumber>
      </div>
      {footer}
    </div>
  );
  const enterBlock = (
    <div className={style.budgetBlock}>
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
    </div>
  );
  if (isEnterBudget) {
    return <>{enterBlock}</>;
  }

  return <>{!isFetching ? mainBlck : loadingBlck}</>;
};

export { WholeBudget };
