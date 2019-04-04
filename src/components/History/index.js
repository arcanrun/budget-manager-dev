//@flow
import React from "react";

import style from "./History.module.css";
import { OperationSign, OperationType } from "../index";

type PROPS = {
  vk_id: number,
  getHistory: Function,
  history: Array<Object>
};
class History extends React.Component<PROPS, {}> {
  componentDidMount() {
    const { vk_id } = this.props;
    this.props.getHistory(vk_id);
  }
  render() {
    const { vk_id, history } = this.props;
    console.log(history);
    return (
      <div className={style.container}>
        <div className={style.verticalLine} />
        <div className={style.content}>
          {history.map((item, i) => {
            const key = Object.keys(item)[0];

            return (
              <div key={i} className={style.day}>
                <div className={style.date}>{key}</div>{" "}
                {item[key].map((elem, j) => (
                  <div key={j} className={style.operation}>
                    <OperationType>{elem.type_cost}</OperationType>
                    <OperationSign>{elem.operation}</OperationSign>
                    <div>{elem.value}</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export { History };
