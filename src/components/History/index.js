//@flow
import React from "react";
import styleHistory from "./History.module.css";
import Sticky from "react-sticky-el";
import { Redirect } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import {
  OperationSign,
  OperationType,
  OperationValue,
  Overlay,
  Icon
} from "../index";

import { compareDate } from "../Calendar/calendarHelper";
import "./animations.css";

type PROPS = {
  vk_id: number,
  getHistory: Function,
  history: Array<Object>,
  isFetching: boolean
};

type STATE = {
  in: boolean
};

class History extends React.Component<PROPS, STATE> {
  state = {
    in: false
  };

  componentDidMount() {
    const { vk_id } = this.props;
    this.props.getHistory(vk_id);
    this.toggleAnimation();
  }

  componentWillUnmount() {
    this.toggleAnimation();
  }

  toggleAnimation = () => {
    this.setState({ in: !this.state.in });
  };

  render() {
    const { history, isFetching, vk_id } = this.props;
    const overlay = <Overlay isTransparent={true} />;
    const verticalLine = <div className={styleHistory.verticalLine} />;

    history.sort(compareDate);

    return isFetching ? (
      overlay
    ) : vk_id ? (
      history.length === 0 ? (
        <div className={styleHistory.empty}>
          <div className={styleHistory.emptyTitle}>
            В истории пока ничего нет
          </div>
          <Icon icon="hieroglyph" />
        </div>
      ) : (
        <CSSTransition in={this.state.in} classNames={"page"} timeout={500}>
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
        </CSSTransition>
      )
    ) : (
      <Redirect to="/entrance" />
    );
  }
}

export { History };
