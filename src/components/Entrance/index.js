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
      <Carousel swiping>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <button onClick={this.changeState}>login</button>
      </Carousel>
    );
  }
}

export { Entrance };
