//@flow
import React from "react";
import styleHistory from "./History.module.css";
import Sticky from "react-sticky-el";
import { Redirect } from "react-router-dom";

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
    const { history, isFetching, vk_id } = this.props;
    const overlay = <Overlay />;
    const verticalLine = <div className={styleHistory.verticalLine} />;

    history.sort(compareDate);

    return isFetching ? (
      overlay
    ) : vk_id ? (
      <div className={styleHistory.container}>
        {history.map((item, i) => {
          const day = Object.keys(item)[0];

          return (
            <div key={i} className={styleHistory.oneDay}>
              <Sticky
                boundaryElement={styleHistory.oneDay}
                topOffset={-60}
                stickyStyle={{
                  marginTop: "60px"
                }}
              >
                <div className={styleHistory.day}>{day}</div>
              </Sticky>
              {verticalLine}

              {item[day].map((elem, j) => (
                <div key={j} className={styleHistory.operation}>
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
    ) : (
      <Redirect to="/entrance" />
    );
  }
}

export { History };
