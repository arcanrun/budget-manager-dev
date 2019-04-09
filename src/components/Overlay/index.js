//@flow
import React from "react";
import { CSSTransition } from "react-transition-group";

import "./animations.css";

import { Spinner } from "../index";
import style from "./Overlay.module.css";

type PROPS = {
  isTransparent?: boolean,
  isFetching: boolean
};
type STATE = {
  in: boolean
};

class Overlay extends React.Component<PROPS, STATE> {
  state = {
    in: false
  };

  componentDidMount() {
    this.toggleAnimation();
  }
  componentWillUnmount() {
    this.toggleAnimation();
  }

  toggleAnimation = () => {
    this.setState({ in: this.state.in });
  };
  render() {
    const { isTransparent } = this.props;
    return isTransparent ? (
      <CSSTransition
        in={this.props.isFetching}
        timeout={2000}
        classNames={"overlay"}
        mountOnEnter
        unmountOnExit
      >
        <div className={style.overlay}>
          <Spinner />
        </div>
      </CSSTransition>
    ) : (
      <CSSTransition
        in={this.props.isFetching}
        timeout={2000}
        classNames={"overlay"}
        mountOnEnter
        unmountOnExit
      >
        <div className={style.overlay} style={{ backgroundColor: "#EAEFF2" }}>
          <Spinner />
        </div>
      </CSSTransition>
    );
  }
}

export { Overlay };
