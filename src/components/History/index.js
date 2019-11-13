//@flow
import React from "react";
import styleHistory from "./History.module.css";
import Sticky from "react-sticky-el";
import { Redirect } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Route } from "react-router-dom";

import {
  OperationSign,
  OperationType,
  OperationValue,
  Overlay,
  Icon
} from "../index";

import { compareDate } from "../Calendar/calendarHelper";
import "./animations.css";
import {
  stringToDate,
  compareDateWithMomentPlugin
} from "../../helpers/datetime";

type PROPS = {
  vk_id: number,
  history: Array<Object>,
  isFetching: boolean,
  params: string,
  getHistory: Function,
  toggleModal: Function
};

type STATE = {
  in: boolean
};

class History extends React.Component<PROPS, STATE> {
  state = {
    in: false
  };

  componentDidMount() {
    const ins = this.state.in;
    this.props.getHistory(this.props.params);
    this.toggleAnimation();
  }

  toggleAnimation = () => {
    const ins = this.state.in;
    this.setState({ in: !this.state.in });
  };

  render() {
    const { history, isFetching, vk_id, toggleModal } = this.props;

    // const overlay = <Overlay isTransparent={true} />;
    const verticalLine = <div className={styleHistory.verticalLine} />;
    const exclamation = <div className={styleHistory.isComment}>!</div>;
    history.sort(compareDate);

    return vk_id ? (
      history.length === 0 ? (
        <>
          <Overlay isTransparent={true} isFetching={isFetching} />
          <CSSTransition in={this.state.in} timeout={500} classNames={"page"}>
            <div className={styleHistory.empty}>
              <Icon icon="clock" color="#909090" />

              <div className={styleHistory.emptyTitle}>
                В истории пока ничего нет
              </div>
            </div>
          </CSSTransition>
        </>
      ) : (
        <>
          <div className={styleHistory.background} />

          <Overlay isTransparent={true} isFetching={isFetching} />
          <CSSTransition in={this.state.in} classNames={"page"} timeout={500}>
            <div className={[styleHistory.container, "scrollArea"].join(" ")}>
              {history.map((item, i) => {
                const day = Object.keys(item)[0];
                return (
                  <div
                    key={i}
                    className={[styleHistory.oneDay, "boundry"].join(" ")}
                  >
                    <Sticky
                      boundaryElement={".boundry"}
                      topOffset={-57}
                      stickyStyle={{
                        marginTop: "57px",
                        zIndex: 4,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "272px"
                      }}
                    >
                      <div className={styleHistory.day}>
                        {stringToDate(day)}
                      </div>
                    </Sticky>
                    <div className={styleHistory.dayOffset}></div>
                    {verticalLine}

                    {item[day].map((elem, j) => (
                      <div key={j} className={styleHistory.operation}>
                        <OperationType>{elem.type_cost}</OperationType>
                        {elem.comment ? (
                          <div
                            onClick={() =>
                              toggleModal("history_comment", elem.comment)
                            }
                          >
                            <OperationSign>{elem.operation}</OperationSign>
                            {elem.comment ? exclamation : ""}
                          </div>
                        ) : (
                          <OperationSign>{elem.operation}</OperationSign>
                        )}

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
        </>
      )
    ) : (
      <Redirect to="/entrance" />
    );
  }
}

export { History };
