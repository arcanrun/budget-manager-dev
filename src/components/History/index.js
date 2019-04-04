//@flow
import React from "react";
import { type } from "os";

type PROPS = {
  vk_id: number,
  getHistory: Function
};
class History extends React.Component<PROPS, {}> {
  componentDidMount() {
    const { vk_id } = this.props;
    this.props.getHistory(vk_id);
  }
  render() {
    const { vk_id, getHistory } = this.props;
    return <div>HISTORY: {vk_id}</div>;
  }
}

export { History };
