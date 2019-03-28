//@flow
import React from "react";

import style from "./PayDay.module.css";
import { Spinner } from "../index";

type PROPS = {
  payday: ?string,
  onClick: Function,
  isFetching: boolean
};

const PayDay = ({ payday, onClick, isFetching }: PROPS) => (
  <div className={style.payday}>
    {isFetching ? (
      <Spinner />
    ) : (
      payday || (
        <span className={style.enter} onClick={onClick}>
          Введите дату получения зарплаты
        </span>
      )
    )}
  </div>
);

export { PayDay };
