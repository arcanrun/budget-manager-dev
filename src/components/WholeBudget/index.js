//@flow

import React from "react";
import { Button, Placeholder } from "@vkontakte/vkui";

import style from "./WholeBudget.module.css";
import { RoundButton, ShortenNumber } from "../index";
import { toPrettyNumber } from "../../helpers/prettyNumbers";
import Icon56WriteOutline from "@vkontakte/icons/dist/56/write_outline";

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
        {toPrettyNumber(
          wholeBudget,
          true,
          1000000000,
          true,
          1e18,
          "max",
          "0.00a",
          "0.00",
          "25px"
        )}
      </div>
      {footer}
    </div>
  );
  const enterBlock = (
    <div className={style.budgetBlock}>
      <div className={style.enter}>
        <Placeholder
          icon={<Icon56WriteOutline />}
          streched
          title={"Введите ваш текущий бюджет"}
          action={
            <Button size="xl" onClick={() => onClickToggleModal(typeModal)}>
              Ввести данные
            </Button>
          }
        >
          Для начала введите бюджет, которым обладаете на данный момент.
        </Placeholder>
      </div>
    </div>
  );
  if (isEnterBudget) {
    return <>{enterBlock}</>;
  }

  return <>{!isFetching ? mainBlck : loadingBlck}</>;
};

export { WholeBudget };
