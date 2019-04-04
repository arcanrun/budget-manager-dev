//@flow
import React from "react";
import { type } from "os";

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
      <div>
        HISTORY:{" "}
        {history.map((item, i) => {
          const key = Object.keys(item)[0];

          return (
            <div key={i} className="oneDay">
              <div className="date">{key}</div>{" "}
              {item[key].map((elem, j) => (
                <div key={j} style={{ border: "1px solid red" }}>
                  <div>{elem.type_cost}</div>
                  <div>{elem.operation}</div>
                  <div>{elem.value}</div>
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
