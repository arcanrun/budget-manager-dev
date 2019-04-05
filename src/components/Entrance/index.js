//@flow
import React from "react";
import Carousel from "nuka-carousel";
import { Redirect } from "react-router-dom";

import style from "./Entrance.module.css";

class Entrance extends React.Component<{}, {}> {
  state = { id: undefined };
  changeState = () => {
    this.setState({ id: 1 }, () => console.log(this.state));
  };
  render() {
    return this.state.id ? (
      <Redirect to="/" />
    ) : (
      <Carousel renderCenterLeftControls={({ previousSlide }) => null}>
        <div
          style={{
            border: "1px solid red",
            width: "100%",
            height: "100px",
            margin: "50px"
          }}
        >
          1
        </div>
        <div
          style={{ border: "1px solid red", width: "100%", height: "100px" }}
        >
          2
        </div>
        <div
          style={{ border: "1px solid red", width: "100px", height: "100px" }}
        >
          3
        </div>
        <div
          style={{ border: "1px solid red", width: "100px", height: "100px" }}
        >
          4
        </div>
        <div
          style={{ border: "1px solid red", width: "100px", height: "100px" }}
        >
          5
        </div>
        <div
          style={{ border: "1px solid red", width: "100px", height: "100px" }}
        >
          6<button onClick={this.changeState}>login</button>
        </div>
      </Carousel>
    );
  }
}

export { Entrance };
