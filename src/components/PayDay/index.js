//@flow
import React from "react";

import "./style.css";

type PROPS = {
  payDay?: string,
  onClick: Function
};

const PayDay = ({ payDay, onClick }: PROPS) => (
  <div className="pay-day">
    {payDay || (
      <span className="pay-day__enter" onClick={onClick}>
        Введите дату получения зарплаты
      </span>
    )}
  </div>
);

export { PayDay };
