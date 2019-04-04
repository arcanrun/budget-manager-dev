//@flow
import React from "react";
import style from "./History.module.css";

import {
  OperationSign,
  OperationType,
  OperationValue,
  Overlay
} from "../index";

import { compareDate } from "../Calendar/calendarHelper";

type PROPS = {
  vk_id: number,
  getHistory: Function,
  history: Array<Object>,
  isFetching: boolean
};

class History extends React.Component<PROPS, {}> {
  componentDidMount() {
    const { vk_id } = this.props;
    this.props.getHistory(vk_id);
  }
  render() {
    const { history, isFetching } = this.props;
    const overlay = <Overlay />;
    const verticalLine = <div className={style.verticalLine} />;
    history.sort(compareDate);

    return isFetching ? (
      overlay
    ) : (
      <div className={style.container}>
        {history.map((item, i) => {
          const day = Object.keys(item)[0];

          return (
            <div key={i} className={style.oneDay}>
              <div className={style.day}>{day}</div>
              {verticalLine}

              {item[day].map((elem, j) => (
                <div key={j} className={style.operation}>
                  <OperationType>{elem.type_cost}</OperationType>
                  <OperationSign>{elem.operation}</OperationSign>
                  <OperationValue sign={elem.operation}>
                    {elem.value}
                  </OperationValue>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}

export { History };
